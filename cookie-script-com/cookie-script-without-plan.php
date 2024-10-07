<?php

require_once plugin_dir_path(__FILE__) . "utility/utility.php";

class CookieScriptWithoutPlan extends Utility
{
    public function __construct()
    {
        add_action("admin_enqueue_scripts", function() {
            if (isset($_GET['page']) && in_array($_GET['page'], ["cookie-script-with-account", "cookie-script", "cookie-script-home", "cookie-script-without-account"])) {
                $this->cookie_script_add_javascript();
            }
        });
        add_action("admin_enqueue_scripts", function() {
            if (isset($_GET['page']) && in_array($_GET['page'], ["cookie-script-with-account", "cookie-script", "cookie-script-home", "cookie-script-without-account"])) {
                $this->cookie_script_enqueue_thickbox_assets();
            }
        });
        add_action("admin_enqueue_scripts", function() {
            if (isset($_GET['page']) && in_array($_GET['page'], ["cookie-script-with-account", "cookie-script", "cookie-script-home", "cookie-script-without-account"])) {
                $this->cookie_script_admin_page_css_js();
            }
        });
        add_action("wp_enqueue_scripts", function() {
            if (isset($_GET['page']) && in_array($_GET['page'], ["cookie-script-with-account", "cookie-script", "cookie-script-home", "cookie-script-without-account"])) {
                $this->cookie_script_add_javascript();
            }
        });
        add_action("admin_enqueue_scripts", function() {
            if (isset($_GET['page']) && in_array($_GET['page'], ["cookie-script-with-account", "cookie-script", "cookie-script-home", "cookie-script-without-account"])) {
                $this->cookie_script_enqueue_select2_assets();
            }
        });
        add_action("wp_head", array($this, "cookie_script_generate_script_url"), 1);
        add_action("admin_init", array($this, "cookie_script_register_settings"));
        add_action("wp_ajax_cookie_script_check_scan_status_callback", array($this, "cookie_script_check_scan_status_callback"));
        add_action("wp_ajax_nopriv_cookie_script_check_scan_status_callback", array($this, "cookie_script_check_scan_status_callback"));
        add_action("wp_ajax_cookie_script_save_options", array($this, "cookie_script_save_options"));
        add_action("wp_ajax_nopriv_cookie_script_save_options", array($this, "cookie_script_save_options"));
        add_action("wp_ajax_cookie_script_start_scan", array($this, "cookie_script_start_scan"));
        add_action("wp_ajax_nopriv_cookie_script_start_scan", array($this, "cookie_script_start_scan"));
        add_action("wp_ajax_cookie_script_get_scanner_status", array($this, "cookie_script_get_scanner_status"));
        add_action("wp_ajax_nopriv_cookie_script_get_scanner_status", array($this, "cookie_script_get_scanner_status"));
        add_action("admin_notices", array($this, "cookie_script_show_flash_message"));
        $this->isGoogleConsentModeActivated = (bool) get_option("cookie_script_google_consent_mode_enabled", 0);

        $this->cookies = get_option("cookie_script_without_plan_cookies");
        $this->secret = esc_attr(get_option("cookie_script_secret"));
        $this->policyUrl = esc_attr(get_option("cookie_script_without_plan_privacy_policy_url"));
        $this->timestamp = esc_attr(get_option("cookie_script_with_plan_timestamp"));
        $this->bannerAddedWithoutAccount = (bool) esc_attr(get_option("cookie_script_without_plan_script_added"));
    }

    public function cookie_script_admin_page_css_js()
    {
        wp_enqueue_style(
            "cookie_script_admin",
            plugin_dir_url(__FILE__) . "assets/css/cookie_script_admin.css"
        );
    }


    public function cookie_script_add_javascript()
    {
        wp_enqueue_script("jquery");

        if (is_admin()) {

            wp_enqueue_script(
                "cookie_script_admin",
                plugin_dir_url(__FILE__) . "assets/js/cookie_script_admin.js"
            );

            wp_localize_script(
                "cookie_script_admin",
                "ajaxRequest",
                array(
                    "ajax_url" => admin_url("admin-ajax.php"),
                    "nonce" => wp_create_nonce("cookie_script_nonce")
                )
            );

            wp_localize_script(
                "cookie_script_admin",
                "flags",
                array("assetsPath" => plugin_dir_url(__FILE__) . 'assets/')
            );

            wp_localize_script(
                "cookie_script_admin",
                "lang",
                array("bannerLanguage" => get_option("cookie_script_without_banner_language"))
            );
        }
    }


    function cookie_script_enqueue_thickbox_assets()
    {
        wp_enqueue_script("thickbox");
        wp_enqueue_style("thickbox");
    }

    function cookie_script_enqueue_select2_assets()
    {
        wp_enqueue_style('select2-css', 'https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css', array(), '4.1.0-rc.0');
        wp_enqueue_script('select2-js', 'https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js', array('jquery'), '4.1.0-rc.0', true);
        wp_enqueue_script("select2-init", plugin_dir_url(__FILE__) . "assets/js/cookie_script_admin.js", array("jquery", "select2-js"), null, true);
    }

    public function cookie_script_show_flash_message()
    {
        if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["cs_without_plan_setting-insert"])) {
            $this->flashMessage("Banner has been added!");
        }

        if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["cs_without_plan_setting-remove"])) {
            $this->flashMessage("Banner has been removed!");
        }
    }

    public function cookie_script_check_scan_status_callback()
    {
        update_option("cookie_script_redirect_location", "location-without-plan", true);

        ob_start();

        if(!isset($_POST["nonce"]) || !wp_verify_nonce($_POST["nonce"], "cookie_script_nonce")) {
            wp_send_json_error("Nonce verification failed!", 403);
            exit;
        }

        $data = $this->cookie_script_initiate_scan();
        $url = $data["script_url"];

        if($data["status"] === "progress") {
            setcookie("isScanning", "scanning");
        }

        if($data["status"] === "finish") {
            $this->cookie_script_options_page();

            setcookie("isScanning", "");

            update_option("cookie_script_without_plan_cookies", $data["grouped_cookies"], true);
            $this->cookie_script_save_script_to_file(file_get_contents($url), "cookie-script");
        }

        ob_clean();
        wp_send_json($data["status"]);

        wp_send_json_success(["message" => "Data processed successfully!"]);
    }

    public function cookie_script_options_page()
    {
        $newSecretKey = md5(time() . uniqid() . get_site_url());

        if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["cs_without_plan_setting-insert"])) {
            update_option("cookie_script_without_plan_script_added", true, true);
            update_option("cookie_script_with_plan_script_added", 0, true);
            update_option("cookie_script_redirect_location", "location-without-plan", true);
        }

        if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["cs_without_plan_setting-remove"])) {
            update_option("cookie_script_without_plan_script_added", 0, true);
            update_option("cookie_script_redirect_location", "location-without-plan", true);
        }

        if($this->secret === ""  || $this->secret === false) {
            update_option("cookie_script_secret", $newSecretKey, true);

            $this->secret = get_option("cookie_script_secret");
        }

        if (!get_option('cookie_script_google_consent_mode_enabled')) {
            add_option('cookie_script_google_consent_mode_enabled', false);
        }

        $this->cookie_script_save_options();

        $this->create_content_with_out_account();
    }

    public function cookie_script_get_scanner_status()
    {
        $secretKey = get_option("cookie_script_secret");
        $response = wp_remote_get("https://cookie-script.com/api/wp-scan/check?wp_id=" . $secretKey);

        if (is_wp_error($response)) {
            $errorMessage = $response->get_error_message();

            echo "Something went wrong: $errorMessage";
        } else {
            $body = wp_remote_retrieve_body($response);

            wp_send_json($body);
        }

        return null;
    }

    public function cookie_script_initiate_scan()
    {
        $secretKey = get_option("cookie_script_secret");
        $response = wp_remote_get("https://cookie-script.com/api/wp-scan/info?wp_id=" . $secretKey);

        if (is_wp_error($response)) {
            $errorMessage = $response->get_error_message();

            echo "Something went wrong: $errorMessage";
        } else {
            $body = wp_remote_retrieve_body($response);
            $data = json_decode($body, true);

            if(!empty($data["error"])) {
                setcookie("isScanning", "");

                $this->flashMessage($data["error"], "error", "flash-message__error");
            }

            if (!is_null($data)) {
                return $data;
            }
        }

        return null;
    }

    /**
     * @throws ErrorException
     */
    public function cookie_script_start_scan()
    {
        $url = "https://cookie-script.com/api/wp-scan/start";
        $cookieScriptPolicyUrl = sanitize_text_field($_POST["url"]);
        $cookieScriptSelectedLanguage = sanitize_text_field($_POST["language"]);

        if (!is_null($cookieScriptPolicyUrl)) {
            update_option("cookie_script_without_plan_privacy_policy_url", $cookieScriptPolicyUrl, true);
        }

        if (!is_null($cookieScriptSelectedLanguage)) {
            update_option("cookie_script_without_banner_language", $cookieScriptSelectedLanguage, true);
        }

        update_option("cookie_script_with_plan_timestamp", time(), true);

        $body = [
            "wp_id" => $this->secret,
            "url" => get_site_url(),
            "privacy_policy_url" => $cookieScriptPolicyUrl ?: null,
            "lang" => $cookieScriptSelectedLanguage ?: null,
        ];

        $json_data = json_encode($body);

        $args = [
            "method" => "POST",
            "headers" => [
                "Content-Type" => "application/json",
            ],
            "body" => $json_data,
            "timeout" => 15,
            "redirection" => 5,
            "blocking" => true,
            "httpversion" => "1.0",
            "sslverify" => false,
            "data_format" => "body",
        ];

        $response = wp_remote_post($url, $args);
        $errorMessage = "";

        if (is_wp_error($response)) {
            $errorMessage = $response->get_error_message();
            echo "Something went wrong: $errorMessage";
        } else {
            wp_send_json(json_decode($response["body"], true));
        }

        throw new ErrorException("No incoming data from server: " . $errorMessage);
    }

    public function cookie_script_save_script_to_file($text, $fileName)
    {
        global $wp_filesystem;

        if (empty($wp_filesystem)) {
            require_once( ABSPATH . "/wp-admin/includes/file.php" );
            WP_Filesystem();
        }

        $pluginDirPath = plugin_dir_path( __FILE__ );
        $scriptsDirPath = $pluginDirPath . "scripts/";

        if (!file_exists($scriptsDirPath)) {
            wp_mkdir_p($scriptsDirPath);
        }

        $filePath = $scriptsDirPath . $fileName;

        if (pathinfo($filePath, PATHINFO_EXTENSION)!== "js") {
            $filePath .= ".js";
        }

        if($wp_filesystem->put_contents($filePath, $text, FS_CHMOD_FILE)) {
            return true;
        } else {
            return false;
        }
    }

    public function cookie_script_register_settings()
    {
        register_setting(
            "cookie_script_without_plan_options",
            "cookie_script_without_plan_cookies"
        );

        register_setting(
            "cookie_script_without_plan_options",
            "cookie_script_secret"
        );

        register_setting(
            "cookie_script_without_plan_options",
            "cookie_script_without_plan_privacy_policy_url"
        );

        register_setting(
            "cookie_script_without_plan_options",
            "cookie_script_without_banner_language"
        );

        register_setting(
            "cookie_script_options_group",
            "cookie_script_without_plan_script_added"
        );

        register_setting(
            "cookie_script_options_group",
            "cookie_script_with_plan_script_added"
        );

        register_setting(
            "cookie_script_options_group",
            "cookie_script_with_plan_timestamp"
        );

        register_setting(
            "cookie_script_options_group",
            "cookie_script_redirect_location"
        );

        register_setting(
            "cookie_script_options_group",
            "cookie_script_google_consent_mode_enabled"
        );
    }

    public function cookie_script_generate_script_url() {
        $consentModeEnabled = get_option("cookie_script_google_consent_mode_enabled", false);
        $consentModeSettings = json_decode(get_option("cookie_script_google_consent_mode_settings", '{}'), true);

        if ($this->bannerAddedWithoutAccount) {
            $script = plugins_url("scripts/cookie-script.js", __FILE__);

            if ($consentModeEnabled && !empty($consentModeSettings) && !is_null($consentModeSettings)) {
                $this->display_google_consent_script_front($consentModeSettings);
            }

            echo "<script type='text/javascript' charset='UTF-8' data-cs-platform='wordpress' src='" . $script . '?' . $this->timestamp . "' id='cookie_script-js-without'></script>";
        }
    }

    public function cookie_script_save_options() {
        if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["cs_without_plan_setting_save"])) {

            if (isset($_POST["consent_settings"]["regional"]) && is_array($_POST["consent_settings"]["regional"])) {
                $langRegexPattern = '/(?i)^\s*([a-z]{2}(-[a-z0-9]{1,3})?\s*)(,\s*[a-z]{2}(-[a-z0-9]{1,3})?\s*)*$/i';

                foreach ($_POST["consent_settings"]["regional"] as $lang) {
                    if (isset($lang["region_code"]) && !$this->string_validation($lang["region_code"], $langRegexPattern)) {
                        $this->flashMessage("Invalid language code detected: {$lang["region_code"]}. No changes were saved.", "error", "flash-message__error");
                        return;
                    }
                }
            }

            update_option("cookie_script_google_consent_mode_enabled", $_POST["enable_google_consent_mode"], true);

            if ($_POST["enable_google_consent_mode"]) {
                $globalSettings = $_POST["consent_settings"]["global"];
                $regionalSettings = !empty($_POST["consent_settings"]["regional"]) ? array_values($_POST["consent_settings"]["regional"]) : null;

                update_option("cookie_script_google_consent_mode_settings", json_encode([
                    'global' => $globalSettings,
                    'regional' => $regionalSettings
                ]), true);
            }

            $this->flashMessage("Google Consent mode settings saved!");
        }
    }
}

new CookieScriptWithoutPlan();
