<?php

if (! defined('ABSPATH')) {
    exit;
}

require_once plugin_dir_path(__FILE__) . 'utility/utility.php';
require_once plugin_dir_path(__FILE__) . 'utility/cswpca.php';

class CookieScriptWithoutPlan extends CSWP_CookieScript_Utility
{

    public $cookies;
    public $secret;
    public $policyUrl;
    public $timestamp;
    public $bannerAddedWithoutAccount;

    public function __construct()
    {
        $this->cookies                  = get_option('cookie_script_without_plan_cookies');
        $this->secret                   = (string) get_option('cookie_script_secret', '');
        $this->policyUrl                = (string) get_option('cookie_script_without_plan_privacy_policy_url', '');
        $this->timestamp                = (string) get_option('cookie_script_with_plan_timestamp', '');
        $this->bannerAddedWithoutAccount = (bool) get_option('cookie_script_without_plan_script_added', false);

        add_action(
            'admin_enqueue_scripts',
            function ($hook_suffix) {
                $allowed_hooks = array(
                    'tools_page_cookie-script-com',
                    'admin_page_cookie-script-without-account',
                    'admin_page_cookie-script-with-account',
                    'admin_page_cookie-script-home',
                    'admin_page_cookie-script',
                );

                if (in_array($hook_suffix, $allowed_hooks, true)) {
                    $this->cookie_script_add_javascript();
                    $this->cookie_script_enqueue_thickbox_assets();
                    $this->cookie_script_admin_page_css_js();
                    $this->cookie_script_enqueue_select2_assets();
                }
            }
        );

        add_action('wp_head', array($this, 'cookie_script_generate_script_url'), 1);
        add_action('admin_init', array($this, 'cookie_script_register_settings'));

        add_action('wp_ajax_cookie_script_check_scan_status_callback', array($this, 'cookie_script_check_scan_status_callback'));
        add_action('wp_ajax_cookie_script_save_options', array($this, 'cookie_script_save_options'));
        add_action('wp_ajax_cookie_script_start_scan', array($this, 'cookie_script_start_scan'));
        add_action('wp_ajax_cookie_script_get_scanner_status', array($this, 'cookie_script_get_scanner_status'));
        add_action('wp_ajax_cookie_script_get_update_script', array($this, 'cookie_script_get_update_script'));
    }

    public function cookie_script_admin_page_css_js()
    {
        wp_enqueue_style(
            'cookie_script_admin',
            plugin_dir_url(__FILE__) . 'assets/css/cookie_script_admin.css',
            array(),
            '1.4.1'
        );
    }

    public function cookie_script_add_javascript()
    {
        wp_enqueue_script('jquery');

        if (is_admin()) {

            wp_enqueue_script(
                'helpers',
                plugins_url('assets/js/helpers.js', __FILE__),
                array(),
                '1.4.1',
                true
            );

            wp_enqueue_script(
                'cookie_script_admin',
                plugin_dir_url(__FILE__) . 'assets/js/cookie_script_admin.js',
                array('helpers'),
                '1.4.1',
                true
            );

            wp_localize_script(
                'cookie_script_admin',
                'cookieScriptAjaxRequest',
                array(
                    'ajax_url' => admin_url('admin-ajax.php'),
                    'nonce'    => wp_create_nonce('cookie_script_nonce'),
                )
            );

            wp_localize_script(
                'cookie_script_admin',
                'cookieScriptFlags',
                array('assetsPath' => plugin_dir_url(__FILE__) . 'assets/')
            );

            wp_localize_script(
                'cookie_script_admin',
                'cookieScriptLang',
                array('bannerLanguage' => get_option('cookie_script_without_banner_language'))
            );
        }
    }

    public function cookie_script_enqueue_thickbox_assets()
    {
        wp_enqueue_script('thickbox');
        wp_enqueue_style('thickbox');
    }

    public function cookie_script_enqueue_select2_assets()
    {
        wp_enqueue_style('select2-css', plugin_dir_url(__FILE__) . 'assets/css/select2.min.css', array(), '4.1.0-rc.0');
        wp_enqueue_script('select2-js', plugin_dir_url(__FILE__) . 'assets/js/select2.min.js', array('jquery'), '4.1.0-rc.0', true);
    }

    public function cookie_script_check_scan_status_callback()
    {
        if (! current_user_can('manage_options')) {
            wp_send_json_error(esc_html__('Unauthorized', 'cookie-script-com'), 401);
        }

        check_ajax_referer('cookie_script_nonce', 'nonce');

        update_option('cookie_script_redirect_location', 'location-without-plan', true);

        ob_start();

        $data = $this->cookie_script_initiate_scan(true);
        $url  = is_array($data) && isset($data['script_url']) ? $data['script_url'] : '';

        if (is_array($data) && isset($data['status']) && 'progress' === $data['status']) {
            setcookie('isScanning', 'scanning');
        }

        if (is_array($data) && isset($data['status']) && 'finish' === $data['status']) {
            setcookie('isScanning', '');

            if (isset($data['grouped_cookies'])) {
                update_option('cookie_script_without_plan_cookies', $data['grouped_cookies'], true);
            }

            if (!empty($url)) {
                $response = wp_remote_get($url);

                if (! is_wp_error($response)) {
                    $body = wp_remote_retrieve_body($response);

                    if (! empty($body)) {
                        $this->cookie_script_save_script_to_db($body);
                    }

                    wp_send_json('finish');
                }
            }
        }

        $output = ob_get_clean();

        if (is_array($data) && isset($data['status'])) {
            wp_send_json($data['status']);
        }

        $errorMessage = ! empty($output) ? trim($output) : esc_html__('Something went wrong.', 'cookie-script-com');
        if (is_array($data) && !empty($data['error'])) {
            $errorMessage = $data['error']; // Use API error if available
        }

        wp_send_json_error($errorMessage);
    }

    public function cookie_script_options_page()
    {
        $newSecretKey = md5(time() . uniqid() . get_site_url());
        $is_post = (isset($_SERVER['REQUEST_METHOD']) && 'POST' === $_SERVER['REQUEST_METHOD']);

        if ($is_post && isset($_POST['cs_without_plan_setting-insert'])) {
            $nonce = isset($_POST['cs_without_plan_insert_nonce'])
                ? sanitize_text_field(wp_unslash($_POST['cs_without_plan_insert_nonce']))
                : '';

            if (empty($nonce) || ! wp_verify_nonce($nonce, 'cs_without_plan_insert_action')) {
                wp_die(
                    esc_html__('Security check failed', 'cookie-script-com'),
                    esc_html__('Error', 'cookie-script-com'),
                    array('response' => 403)
                );
            }

            if (! current_user_can('manage_options')) {
                wp_die(
                    esc_html__('Unauthorized access', 'cookie-script-com'),
                    esc_html__('Error', 'cookie-script-com'),
                    array('response' => 403)
                );
            }

            update_option('cookie_script_without_plan_script_added', true, true);
            update_option('cookie_script_with_plan_script_added', 0, true);
            update_option('cookie_script_redirect_location', 'location-without-plan', true);

            $this->flashMessage(esc_html__('Banner has been added!', 'cookie-script-com'));
        }

        if ($is_post && isset($_POST['cs_without_plan_setting-remove'])) {
            $nonce = isset($_POST['cs_without_plan_remove_nonce'])
                ? sanitize_text_field(wp_unslash($_POST['cs_without_plan_remove_nonce']))
                : '';

            if (empty($nonce) || ! wp_verify_nonce($nonce, 'cs_without_plan_remove_action')) {
                wp_die(
                    esc_html__('Security check failed', 'cookie-script-com'),
                    esc_html__('Error', 'cookie-script-com'),
                    array('response' => 403)
                );
            }

            if (! current_user_can('manage_options')) {
                wp_die(
                    esc_html__('Unauthorized access', 'cookie-script-com'),
                    esc_html__('Error', 'cookie-script-com'),
                    array('response' => 403)
                );
            }

            update_option('cookie_script_without_plan_script_added', 0, true);
            update_option('cookie_script_redirect_location', 'location-without-plan', true);

            $this->flashMessage(esc_html__('Banner has been removed!', 'cookie-script-com'));
        }

        if ('' === $this->secret || false === $this->secret) {
            update_option('cookie_script_secret', $newSecretKey, true);
            $this->secret = (string) get_option('cookie_script_secret', '');
        }

        if (! get_option('cookie_script_google_consent_mode_enabled', null)) {
            add_option('cookie_script_google_consent_mode_enabled', false);
        }

        if ($is_post && ! empty($_POST['cs_without_plan_setting_save'])) {
            $this->cookie_script_save_options();
        }

        $this->create_content_with_out_account();
    }

    public function cookie_script_get_scanner_status()
    {
        if (! current_user_can('manage_options')) {
            wp_send_json_error(esc_html__('Unauthorized', 'cookie-script-com'), 401);
        }

        check_ajax_referer('cookie_script_nonce', 'nonce');

        $secretKey = (string) get_option('cookie_script_secret', '');
        $response  = wp_remote_get('https://cookie-script.com/api/wp-scan/check?wp_id=' . rawurlencode($secretKey));

        if (is_wp_error($response)) {
            $errorMessage = $response->get_error_message();

            echo esc_html(
                sprintf(
                    /* translators: %s: error message */
                    __('Something went wrong: %s', 'cookie-script-com'),
                    $errorMessage
                )
            );
            return null;
        }

        $body = wp_remote_retrieve_body($response);
        wp_send_json($body);
        return null;
    }

    public function cookie_script_initiate_scan($suppressFlash = false)
    {
        $secretKey = (string) get_option('cookie_script_secret', '');
        $response  = wp_remote_get('https://cookie-script.com/api/wp-scan/info?wp_id=' . rawurlencode($secretKey));

        if (is_wp_error($response)) {
            $errorMessage = $response->get_error_message();

            echo esc_html(
                sprintf(
                    /* translators: %s: error message */
                    __('Something went wrong: %s', 'cookie-script-com'),
                    $errorMessage
                )
            );
            return null;
        }

        $body = wp_remote_retrieve_body($response);
        $data = json_decode($body, true);

        if (is_array($data) && ! empty($data['error'])) {
            setcookie('isScanning', '');
            if (!$suppressFlash) {
                $this->flashMessage(sanitize_text_field($data['error']), 'error', 'flash-message__error');
            }
        }

        return ! empty($data) ? $data : null;
    }

    public function cookie_script_get_update_script()
    {
        if (! current_user_can('manage_options')) {
            wp_send_json_error(esc_html__('Unauthorized', 'cookie-script-com'), 401);
        }

        check_ajax_referer('cookie_script_nonce', 'nonce');

        $secretKey = (string) get_option('cookie_script_secret', '');
        $response  = wp_remote_get('https://cookie-script.com/api/wp-scan/info?wp_id=' . rawurlencode($secretKey));

        if (is_wp_error($response)) {
            $errorMessage = $response->get_error_message();

            echo esc_html(
                sprintf(
                    /* translators: %s: error message */
                    __('Something went wrong: %s', 'cookie-script-com'),
                    $errorMessage
                )
            );
            wp_die();
        }

        $body = wp_remote_retrieve_body($response);
        $data = json_decode($body, true);

        if (is_array($data) && ! empty($data['error'])) {
            wp_send_json($response['response']);
        }

        if (is_array($data) && ! empty($data['script_url'])) {
            $response = wp_remote_get($data['script_url']);

            if (! is_wp_error($response)) {
                $body = wp_remote_retrieve_body($response);
                if (! empty($body)) {
                    $this->cookie_script_save_script_to_db($body);
                }
            }

            wp_send_json($response['response']);
        }

        wp_send_json_error(esc_html__('Something went wrong', 'cookie-script-com'), 500);
    }

    public function cookie_script_start_scan()
    {
        if (! current_user_can('manage_options')) {
            wp_send_json_error(esc_html__('Unauthorized', 'cookie-script-com'), 401);
        }

        check_ajax_referer('cookie_script_nonce', 'nonce');

        $cookieScriptPolicyUrl = isset($_POST['url'])
            ? sanitize_text_field(wp_unslash($_POST['url']))
            : '';

        $cookieScriptSelectedLanguage = isset($_POST['language'])
            ? sanitize_text_field(wp_unslash($_POST['language']))
            : '';

        if ('' !== $cookieScriptPolicyUrl) {
            update_option('cookie_script_without_plan_privacy_policy_url', $cookieScriptPolicyUrl, true);
        }

        if ('' !== $cookieScriptSelectedLanguage) {
            update_option('cookie_script_without_banner_language', $cookieScriptSelectedLanguage, true);
        }

        update_option('cookie_script_with_plan_timestamp', time(), true);

        $body = array(
            'wp_id'              => $this->secret,
            'url'                => get_site_url(),
            'privacy_policy_url' => ('' !== $cookieScriptPolicyUrl) ? $cookieScriptPolicyUrl : null,
            'lang'               => ('' !== $cookieScriptSelectedLanguage) ? $cookieScriptSelectedLanguage : null,
        );

        $args = array(
            'method'      => 'POST',
            'headers'     => array('Content-Type' => 'application/json; charset=utf-8'),
            'body'        => wp_json_encode($body),
            'timeout'     => 45,
            'redirection' => 5,
            'blocking'    => false,
            'httpversion' => '1.0',
            'sslverify'   => true,
            'data_format' => 'body',
        );

        $response     = wp_remote_post('https://cookie-script.com/api/wp-scan/start', $args);
        $errorMessage = '';

        if (is_wp_error($response)) {
            $errorMessage = $response->get_error_message();

            echo esc_html(
                sprintf(
                    /* translators: %s: error message */
                    __('Something went wrong: %s', 'cookie-script-com'),
                    $errorMessage
                )
            );
        } else {
            wp_send_json(json_decode($response['body'], true));
        }

        wp_die(
            esc_html(
                sprintf(
                    /* translators: %s: error message */
                    __('Something went wrong: %s', 'cookie-script-com'),
                    $errorMessage
                )
            )
        );
    }

    public function cookie_script_save_script_to_db($text)
    {
        update_option(
            'cookie_script_without_plan_script_content',
            $text,
            true
        );
    }

    public function sanitize_array($input)
    {
        return is_array($input) ? map_deep($input, 'sanitize_text_field') : array();
    }

    public function cookie_script_register_settings()
    {
        register_setting(
            'cookie_script_without_plan_options',
            'cookie_script_without_plan_cookies',
            array(
                'type'              => 'array',
                'sanitize_callback' => array($this, 'sanitize_array'),
            )
        );

        register_setting(
            'cookie_script_without_plan_options',
            'cookie_script_secret',
            array(
                'type'              => 'string',
                'sanitize_callback' => 'sanitize_text_field',
            )
        );

        register_setting(
            'cookie_script_without_plan_options',
            'cookie_script_without_plan_privacy_policy_url',
            array(
                'type'              => 'string',
                'sanitize_callback' => 'esc_url_raw',
            )
        );

        register_setting(
            'cookie_script_without_plan_options',
            'cookie_script_without_banner_language',
            array(
                'type'              => 'string',
                'sanitize_callback' => 'sanitize_text_field',
            )
        );

        register_setting(
            'cookie_script_options_group',
            'cookie_script_without_plan_script_added',
            array(
                'type'              => 'boolean',
                'sanitize_callback' => 'absint',
            )
        );

        register_setting(
            'cookie_script_options_group',
            'cookie_script_with_plan_script_added',
            array(
                'type'              => 'boolean',
                'sanitize_callback' => 'absint',
            )
        );

        register_setting(
            'cookie_script_options_group',
            'cookie_script_with_plan_timestamp',
            array(
                'type'              => 'string',
                'sanitize_callback' => 'sanitize_text_field',
            )
        );

        register_setting(
            'cookie_script_options_group',
            'cookie_script_redirect_location',
            array(
                'type'              => 'string',
                'sanitize_callback' => 'sanitize_text_field',
            )
        );

        register_setting(
            'cookie_script_options_group',
            'cookie_script_google_consent_mode_enabled',
            array(
                'type'              => 'boolean',
                'sanitize_callback' => 'absint',
            )
        );
    }

    public function cookie_script_generate_script_url()
    {
        $consentModeEnabled  = (bool) get_option('cookie_script_google_consent_mode_enabled', false);
        $consentModeSettings = json_decode((string) get_option('cookie_script_google_consent_mode_settings', '{}'), true);

        if ($this->bannerAddedWithoutAccount) {
            $script = get_option('cookie_script_without_plan_script_content', '');

            if ($consentModeEnabled && ! empty($consentModeSettings) && ! is_null($consentModeSettings)) {
                echo $this->display_google_consent_script_front($consentModeSettings);
            }

            if (! $this->is_preview() && ! empty($script)) {
                echo sprintf(
                    '<script id="%1$s" type="text/javascript" data-cs-platform="%2$s">%3$s</script>',
                    esc_attr('cookie_script-js-without'),
                    esc_attr('wordpress'),
                    $script
                );
            }
        }
    }

    public function cookie_script_save_options()
    {
        $is_ajax = wp_doing_ajax();

        if (! current_user_can('manage_options')) {
            if ($is_ajax) {
                wp_send_json_error(
                    array('message' => esc_html__('Unauthorized', 'cookie-script-com')),
                    401
                );
            }
            return;
        }

        if ($is_ajax) {
            check_ajax_referer('cookie_script_nonce', 'nonce');
        }

        if (! isset($_SERVER['REQUEST_METHOD']) || 'POST' !== $_SERVER['REQUEST_METHOD']) {
            if ($is_ajax) {
                wp_send_json_error(
                    array('message' => esc_html__('Invalid request', 'cookie-script-com')),
                    400
                );
            }
            return;
        }

        if (isset($_POST['cs_without_plan_setting_save'])) {
            $nonce = isset($_POST['cs_without_plan_save_nonce'])
                ? sanitize_text_field(wp_unslash($_POST['cs_without_plan_save_nonce']))
                : '';

            if (empty($nonce) || ! wp_verify_nonce($nonce, 'cs_without_plan_save_action')) {
                wp_die(
                    esc_html__('Security check failed', 'cookie-script-com'),
                    esc_html__('Error', 'cookie-script-com'),
                    array('response' => 403)
                );
            }

            $wpc = new CookieScriptWpca();
            $wpc->cookie_script_save_wpc();

            // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized -- individual fields sanitized below.
            $consent_settings = isset($_POST['consent_settings']) ? map_deep(wp_unslash($_POST['consent_settings']), 'sanitize_text_field') : array();

            if (isset($consent_settings['regional']) && is_array($consent_settings['regional'])) {
                $langRegexPattern = '/(?i)^\s*([a-z]{2}(-[a-z0-9]{1,3})?\s*)(,\s*[a-z]{2}(-[a-z0-9]{1,3})?\s*)*$/i';

                foreach ($consent_settings['regional'] as $region) {
                    if (! is_array($region)) {
                        continue;
                    }

                    $region_code     = isset($region['region_code']) ? sanitize_text_field($region['region_code']) : '';
                    $wait_for_update = isset($region['wait_for_update']) ? sanitize_text_field($region['wait_for_update']) : '';

                    if ('' !== $region_code && ! $this->validate_positive_integer($wait_for_update)) {
                        $safe_wait = esc_html($wait_for_update);

                        $this->flashMessage(
                            esc_html(
                                sprintf(
                                    /* translators: %s: invalid integer value */
                                    __('Invalid integer detected: %s, it must be positive or a whole number. No changes were saved.', 'cookie-script-com'),
                                    $safe_wait
                                )
                            ),
                            'error',
                            'flash-message__error'
                        );
                        return;
                    }

                    if ('' !== $region_code && ! $this->string_validation($region_code, $langRegexPattern)) {
                        $safe_region = esc_html($region_code);

                        $this->flashMessage(
                            esc_html(
                                sprintf(
                                    /* translators: %s: invalid region/language code */
                                    __('Invalid language code detected: %s. No changes were saved.', 'cookie-script-com'),
                                    $safe_region
                                )
                            ),
                            'error',
                            'flash-message__error'
                        );
                        return;
                    }
                }
            }

            $waitForUpdateGlobalSetting = '';
            if (
                isset($consent_settings['global']) &&
                is_array($consent_settings['global']) &&
                isset($consent_settings['global']['wait_for_update'])
            ) {
                $waitForUpdateGlobalSetting = sanitize_text_field($consent_settings['global']['wait_for_update']);
            }

            if ('' === $waitForUpdateGlobalSetting || ! $this->validate_positive_integer($waitForUpdateGlobalSetting)) {
                $safe_wait = esc_html($waitForUpdateGlobalSetting);

                $this->flashMessage(
                    esc_html(
                        sprintf(
                            /* translators: %s: invalid integer value */
                            __('Invalid integer detected: %s, it must be positive or a whole number. No changes were saved.', 'cookie-script-com'),
                            $safe_wait
                        )
                    ),
                    'error',
                    'flash-message__error'
                );
                return;
            }

            $enable_google_consent_mode = isset($_POST['enable_google_consent_mode'])
                ? absint(wp_unslash($_POST['enable_google_consent_mode']))
                : 0;

            update_option('cookie_script_google_consent_mode_enabled', $enable_google_consent_mode, true);

            $globalSettings   = (isset($consent_settings['global']) && is_array($consent_settings['global'])) ? $consent_settings['global'] : array();
            $regionalSettings = (isset($consent_settings['regional']) && is_array($consent_settings['regional']) && ! empty($consent_settings['regional']))
                ? array_values($consent_settings['regional'])
                : null;

            update_option(
                'cookie_script_google_consent_mode_settings',
                wp_json_encode(
                    array(
                        'global'   => $globalSettings,
                        'regional' => $regionalSettings,
                    )
                ),
                true
            );

            $this->flashMessage(esc_html__('Google Consent mode settings saved!', 'cookie-script-com'));
        }

        if ($is_ajax) {
            wp_send_json_success(array('message' => esc_html__('Saved', 'cookie-script-com')));
        }
    }
}

new CookieScriptWithoutPlan();
