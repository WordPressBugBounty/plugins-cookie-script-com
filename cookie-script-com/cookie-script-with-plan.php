<?php

// Block direct access
if (!defined('ABSPATH')) {
    exit;
}

require_once plugin_dir_path(__FILE__) . "utility/utility.php";
require_once plugin_dir_path(__FILE__) . "index.php";

class CookieScriptWithPlan extends Utility
{
    public $src;
    public $script_location;
    public $script_location_in_element;
    public $bannerWithAccountAdded;

    public function __construct()
    {
        $this->src = esc_attr(get_option("cookie_script_item_src"));
        $this->script_location = esc_attr(get_option("cookie_script_location"));
        $this->script_location_in_element = esc_attr(get_option("cookie_script_location_in_element"));
        $this->bannerWithAccountAdded = (bool) get_option("cookie_script_with_plan_script_added");

        add_action("admin_enqueue_scripts", function() {
            if (isset($_GET['page']) && in_array($_GET['page'], ["cookie-script-with-account", "cookie-script", "cookie-script-home","cookie-script-without-account"])) {
                $this->cookie_script_admin_page_css_js();
            }
        });
        add_action("admin_init", array($this, "cookie_script_register_settings"));
        add_action($this->cookie_script_location(), array($this, "cookie_script_insert"), $this->cookie_script_location_in_element());
        add_action("plugin_action_links_" . plugin_basename(__FILE__), array($this, "cookie_script_settings_link"));
        load_plugin_textdomain("CookieScriptWithPlan", false, dirname(plugin_basename(__FILE__)) . "/languages");
    }

    public function cookie_script_insert()
    {
        $consentModeEnabled = get_option("cookie_script_google_consent_mode_enabled", false);
        $consentModeSettings = json_decode(get_option("cookie_script_google_consent_mode_settings", '{}'), true);

        if ($this->bannerWithAccountAdded) {
            if ($consentModeEnabled && !empty($consentModeSettings) && !is_null($consentModeSettings)) {
                $this->display_google_consent_script_front($consentModeSettings);
            }

            echo "<script type='text/javascript' charset='UTF-8' data-cs-platform='wordpress' src='" . $this->src . "' id='cookie_script-js-with'></script>";
        }
    }

    public function cookie_script_location()
    {
        $location = $this->script_location;
        $locationInElement = $this->script_location_in_element;

        if ($location === "wp_footer" && $locationInElement === "1") {
            $location = "wp_body_open";
        }

        if ($location === "") {
            $location = "wp_head";
        }

        return $location;
    }

    public function cookie_script_admin_page_css_js()
    {
        wp_enqueue_style(
            "cookie_script_admin",
            plugin_dir_url(__FILE__) . "assets/css/cookie_script_admin.css"
        );
    }

    public function cookie_script_location_in_element()
    {
        $locationInElement = $this->script_location_in_element;

        if ($locationInElement === "") {
            $locationInElement = 1;
        }

        return $locationInElement;
    }

    public function cookie_script_register_settings()
    {
        register_setting(
            "cookie_script_options_group",
            "cookie_script_item_src",
            array(
                "type" => "string",
                "sanitize_callback" => "sanitize_text_field",
                "default" => null
            )
        );

        register_setting(
            "cookie_script_options_group",
            "cookie_script_location",
            array(
                "type" => "string",
                "sanitize_callback" => "sanitize_text_field",
                "default" => "wp_head"
            )
        );

        register_setting(
            "cookie_script_options_group",
            "cookie_script_location_in_element",
            array(
                "type" => "string",
                "sanitize_callback" => "sanitize_text_field",
                "default" => "1"
            )
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
            "cookie_script_redirect_location"
        );

        register_setting(
            "cookie_script_options_group",
            "cookie_script_google_consent_mode_enabled"
        );
    }

    public function cookie_script_settings_link($links)
    {
        $settings_link = "<a href='admin.php?page=cookie-script-with-account'>" . esc_html__("Settings", "CookieScriptWithPlan") . "</a>";

        $links[] = $settings_link;

        return $links;

    }

    public function cookie_script_options_page()
    {
        if (!get_option('cookie_script_google_consent_mode_enabled')) {
            add_option('cookie_script_google_consent_mode_enabled', false);
        }

        if (!get_option('cookie_script_location')) {
            add_option('cookie_script_location', "wp_head");
        }

        if (!get_option('cookie_script_location_in_element')) {
            add_option('cookie_script_location_in_element', "1");
        }

        $this->cookie_script_save_options();

        $this->create_content_with_account();
    }

    private function cookie_script_save_options() {
        if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["cs_with_plan_setting-insert"])) {
            $googleConsentModeEnabled = $_POST["enable_google_consent_mode"];

            if (isset($_POST["consent_settings"]["regional"]) && is_array($_POST["consent_settings"]["regional"])) {
                $langRegexPattern = '/(?i)^\s*([a-z]{2}(-[a-z0-9]{1,3})?\s*)(,\s*[a-z]{2}(-[a-z0-9]{1,3})?\s*)*$/i';

                foreach ($_POST["consent_settings"]["regional"] as $lang) {
	                if (isset($lang["region_code"]) && !$this->validate_positive_integer($lang["wait_for_update"])) {
		                $this->flashMessage("Invalid integer detected: {$lang["wait_for_update"]}, it must be positive or full number. No changes were saved.", "error", "flash-message__error");
		                return;
	                }

                    if (isset($lang["region_code"]) && !$this->string_validation($lang["region_code"], $langRegexPattern)) {
                        $this->flashMessage("Invalid language code detected: {$lang["region_code"]}. No changes were saved.", "error", "flash-message__error");
                        return;
                    }
                }
            }

	        $scriptRegexPattern = '/^https:\/\/(cdn|eu|ca|ca-eu|geo)\.cookie-script\.com\/s\/[0-9a-f]{32}\.js([\?&](region|country|state)=[a-z\-]*)*$/i';
	        $waitForUpdateGlobalSetting = $_POST["consent_settings"]["global"]["wait_for_update"];

	        if (!$this->validate_positive_integer($waitForUpdateGlobalSetting)) {
		        $this->flashMessage("Invalid integer detected: {$waitForUpdateGlobalSetting}, it must be positive or full number. No changes were saved.", "error", "flash-message__error");
		        return;
	        }

            if (isset($_POST["cookie_script_item_src"]) && !$this->string_validation($_POST["cookie_script_item_src"], $scriptRegexPattern)) {
                $this->flashMessage("Invalid script detected: {$_POST["cookie_script_item_src"]}. No changes were saved.", "error", "flash-message__error");
                return;
            }

            update_option("cookie_script_without_plan_script_added", 0, true);
            update_option("cookie_script_with_plan_script_added", true, true);
            update_option("cookie_script_item_src", $_POST["cookie_script_item_src"], true);
            update_option("cookie_script_location", $_POST["cookie_script_location"], true);
            update_option("cookie_script_location_in_element", $_POST["cookie_script_location_in_element"], true);
            update_option("cookie_script_redirect_location", "location-with-plan", true);
            update_option("cookie_script_google_consent_mode_enabled", $_POST["enable_google_consent_mode"], true);

            if ($googleConsentModeEnabled) {
                $globalSettings = $_POST["consent_settings"]["global"];
                $regionalSettings = !empty($_POST["consent_settings"]["regional"]) ? array_values($_POST["consent_settings"]["regional"]) : null;

                update_option("cookie_script_google_consent_mode_settings", json_encode([
                    'global' => $globalSettings,
                    'regional' => $regionalSettings
                ]), true);
            }

            $this->src = esc_attr(get_option("cookie_script_item_src"));
            $this->flashMessage("Banner has been added!");
        }
    }
}

new CookieScriptWithPlan();
