<?php
// Block direct access
if (! defined('ABSPATH')) {
    exit;
}

require_once plugin_dir_path(__FILE__) . 'utility/utility.php';
require_once plugin_dir_path(__FILE__) . 'utility/cswpca.php';
require_once plugin_dir_path(__FILE__) . 'index.php';

class CookieScriptWithPlan extends CSWP_CookieScript_Utility
{

    public $src;
    public $script_location;
    public $script_location_in_element;
    public $bannerWithAccountAdded;

    public function __construct()
    {
        $this->src                       = (string) get_option('cookie_script_item_src', '');
        $this->script_location           = (string) get_option('cookie_script_location', '');
        $this->script_location_in_element = (string) get_option('cookie_script_location_in_element', '');
        $this->bannerWithAccountAdded    = (bool) get_option('cookie_script_with_plan_script_added', false);

        add_action(
            'admin_enqueue_scripts',
            function ($hook_suffix) {
                $allowed_hooks = array(
                    'tools_page_cookie-script-com',
                );

                if (in_array($hook_suffix, $allowed_hooks, true)) {
                    $this->cookie_script_admin_page_css_js();
                }
            }
        );

        add_action('admin_init', array($this, 'cookie_script_register_settings'));
        add_action(
            $this->cookie_script_location(),
            array($this, 'cookie_script_insert'),
            (int) $this->cookie_script_location_in_element()
        );

        add_action(
            'plugin_action_links_' . plugin_basename(__FILE__),
            array($this, 'cookie_script_settings_link')
        );
    }

    public function cookie_script_insert()
    {
        $consentModeEnabled  = (bool) get_option('cookie_script_google_consent_mode_enabled', false);
        $consentModeSettings = json_decode((string) get_option('cookie_script_google_consent_mode_settings', '{}'), true);

        if ($this->bannerWithAccountAdded) {
            if ($consentModeEnabled && ! empty($consentModeSettings) && ! is_null($consentModeSettings)) {
                echo $this->display_google_consent_script_front($consentModeSettings);
            }

            if (! $this->is_preview()) {
                // phpcs:disable WordPress.WP.EnqueuedResources.NonEnqueuedScript
                printf(
                    '<script type="text/javascript" charset="UTF-8" data-cs-platform="wordpress" src="%s" id="cookie_script-js-with"></script>',
                    esc_url($this->src)
                );
                // phpcs:enable WordPress.WP.EnqueuedResources.NonEnqueuedScript
            }
        }
    }

    public function cookie_script_location()
    {
        $location          = (string) $this->script_location;
        $locationInElement = (string) $this->script_location_in_element;

        if ('wp_footer' === $location && '1' === $locationInElement) {
            $location = 'wp_body_open';
        }

        if ('' === $location) {
            $location = 'wp_head';
        }

        return $location;
    }

    public function cookie_script_admin_page_css_js()
    {
        wp_enqueue_style(
            'cookie_script_admin',
            plugin_dir_url(__FILE__) . 'assets/css/cookie_script_admin.css',
            array(),
            '1.4.2'
        );
    }

    public function cookie_script_location_in_element()
    {
        $locationInElement = (string) $this->script_location_in_element;

        if ('' === $locationInElement) {
            $locationInElement = '1';
        }

        return $locationInElement;
    }

    public function cookie_script_register_settings()
    {
        register_setting(
            'cookie_script_options_group',
            'cookie_script_item_src',
            array(
                'type'              => 'string',
                'sanitize_callback' => 'sanitize_text_field',
                'default'           => null,
            )
        );

        register_setting(
            'cookie_script_options_group',
            'cookie_script_location',
            array(
                'type'              => 'string',
                'sanitize_callback' => 'sanitize_text_field',
                'default'           => 'wp_head',
            )
        );

        register_setting(
            'cookie_script_options_group',
            'cookie_script_location_in_element',
            array(
                'type'              => 'string',
                'sanitize_callback' => 'sanitize_text_field',
                'default'           => '1',
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

    public function cookie_script_settings_link($links)
    {
        $settings_link = sprintf(
            '<a href="%s">%s</a>',
            esc_url(admin_url('admin.php?page=cookie-script-with-account')),
            esc_html__('Settings', 'cookie-script-com')
        );

        $links[] = $settings_link;

        return $links;
    }

    public function cookie_script_options_page()
    {
        if (! get_option('cookie_script_google_consent_mode_enabled', null)) {
            add_option('cookie_script_google_consent_mode_enabled', false);
        }
        if (! get_option('cookie_script_location', null)) {
            add_option('cookie_script_location', 'wp_head');
        }
        if (! get_option('cookie_script_location_in_element', null)) {
            add_option('cookie_script_location_in_element', '1');
        }

        $this->cookie_script_save_options();
        $this->create_content_with_account();
    }

    private function cookie_script_save_options()
    {
        if (! isset($_SERVER['REQUEST_METHOD'])) {
            return;
        }

        if ('POST' !== $_SERVER['REQUEST_METHOD']) {
            return;
        }

        if (! isset($_POST['cs_with_plan_setting-insert'])) {
            return;
        }

        $nonce = isset($_POST['cs_with_plan_nonce']) ? sanitize_text_field(wp_unslash($_POST['cs_with_plan_nonce'])) : '';
        if (empty($nonce) || ! wp_verify_nonce($nonce, 'cs_with_plan_setting_action')) {
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

        $enable_google_consent_mode = isset($_POST['enable_google_consent_mode'])
            ? absint(wp_unslash($_POST['enable_google_consent_mode']))
            : 0;

        $cookie_script_item_src = isset($_POST['cookie_script_item_src'])
            ? sanitize_text_field(wp_unslash($_POST['cookie_script_item_src']))
            : '';

        $cookie_script_location = isset($_POST['cookie_script_location'])
            ? sanitize_text_field(wp_unslash($_POST['cookie_script_location']))
            : 'wp_head';

        $cookie_script_location_in_element = isset($_POST['cookie_script_location_in_element'])
            ? sanitize_text_field(wp_unslash($_POST['cookie_script_location_in_element']))
            : '1';

        // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
        $consent_settings = isset($_POST['consent_settings']) ? map_deep(wp_unslash($_POST['consent_settings']), 'sanitize_text_field') : array();

        $wpc = new CookieScriptWpca();
        $wpc->cookie_script_save_wpc();

        $regional_settings = array();
        if (isset($consent_settings['regional']) && is_array($consent_settings['regional'])) {
            $regional_settings = $consent_settings['regional'];

            $langRegexPattern = '/(?i)^\s*([a-z]{2}(-[a-z0-9]{1,3})?\s*)(,\s*[a-z]{2}(-[a-z0-9]{1,3})?\s*)*$/i';

            foreach ($regional_settings as $lang) {
                if (! is_array($lang)) {
                    continue;
                }

                $region_code     = isset($lang['region_code']) ? sanitize_text_field($lang['region_code']) : '';
                $wait_for_update = isset($lang['wait_for_update']) ? sanitize_text_field($lang['wait_for_update']) : '';

                if ('' !== $region_code && ! $this->validate_positive_integer($wait_for_update)) {
                    $safe_wait = esc_html($wait_for_update);
                    $this->flashMessage(
                        esc_html(sprintf(
                            /* translators: %s: invalid integer value */
                            __('Invalid integer detected: %s, it must be positive or a whole number. No changes were saved.', 'cookie-script-com'),
                            $safe_wait
                        )),
                        'error',
                        'flash-message__error'
                    );
                    return;
                }

                if ('' !== $region_code && ! $this->string_validation($region_code, $langRegexPattern)) {
                    $safe_region = esc_html($region_code);
                    $this->flashMessage(
                        esc_html(sprintf(
                            /* translators: %s: invalid region/language code */
                            __('Invalid language code detected: %s. No changes were saved.', 'cookie-script-com'),
                            $safe_region
                        )),
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
                esc_html(sprintf(
                    /* translators: %s: invalid integer value */
                    __('Invalid integer detected: %s, it must be positive or a whole number. No changes were saved.', 'cookie-script-com'),
                    $safe_wait
                )),
                'error',
                'flash-message__error'
            );
            return;
        }

        $scriptRegexPattern = '/^https:\/\/(cdn|eu|ca|ca-eu|geo)\.cookie-script\.com\/s\/[0-9a-f]{32}\.js([\?\&](region|country|state)=[a-z\-]*)*$/i';

        if ('' !== $cookie_script_item_src && ! $this->string_validation($cookie_script_item_src, $scriptRegexPattern)) {
            $safe_src = esc_html($cookie_script_item_src);
            $this->flashMessage(
                esc_html(sprintf(
                    /* translators: %s: invalid script URL */
                    __('Invalid script detected: %s. No changes were saved.', 'cookie-script-com'),
                    $safe_src
                )),
                'error',
                'flash-message__error'
            );
            return;
        }

        update_option('cookie_script_without_plan_script_added', 0, true);
        update_option('cookie_script_with_plan_script_added', true, true);
        update_option('cookie_script_item_src', $cookie_script_item_src, true);
        update_option('cookie_script_location', $cookie_script_location, true);
        update_option('cookie_script_location_in_element', $cookie_script_location_in_element, true);
        update_option('cookie_script_redirect_location', 'location-with-plan', true);
        update_option('cookie_script_google_consent_mode_enabled', $enable_google_consent_mode, true);

        $global_settings = array();
        if (isset($consent_settings['global']) && is_array($consent_settings['global'])) {
            $global_settings = $consent_settings['global'];
        }

        $regional_settings_to_save = null;
        if (! empty($regional_settings) && is_array($regional_settings)) {
            $regional_settings_to_save = array_values($regional_settings);
        }

        // phpcs:ignore WordPress.WP.AlternativeFunctions.json_encode_json_encode
        update_option(
            'cookie_script_google_consent_mode_settings',
            wp_json_encode(
                array(
                    'global'   => $global_settings,
                    'regional' => $regional_settings_to_save,
                )
            ),
            true
        );

        $this->src = (string) get_option('cookie_script_item_src', '');

        $this->flashMessage(esc_html__('Banner has been added!', 'cookie-script-com'));
    }
}

new CookieScriptWithPlan();
