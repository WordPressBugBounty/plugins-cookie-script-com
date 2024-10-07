<?php
# 🍪

# Plugin Name:       Cookie-Script.com
# Description:       Cookie-Script.com WordPress plugin.
# Version:           1.1.4
# Author:            Cookie-Script.com
# Author URI:        https://cookie-script.com/
# Text Domain:       CookieScript
# License:           MIT License (Expat)
# Requires at least: 5.6
# Cookie vector by:  https://www.freepik.com/free-vector/friendship-day-background-with-cute-cartoons_2410968.htm

// Block direct access
require_once plugin_dir_path(__FILE__) . "cookie-script-with-plan.php";
require_once plugin_dir_path(__FILE__) . "cookie-script-without-plan.php";
require_once plugin_dir_path(__FILE__) . "utility/utility.php";

if (!class_exists("CookieScriptIndex")) {
    class CookieScriptIndex extends Utility
    {
        private $redirectLocation;

        public function __construct()
        {
            add_filter("plugin_action_links_" . plugin_basename(__FILE__), array($this, "add_settings_link"));
            add_action("admin_menu", array($this, "cookie_script_home"));
            add_action("admin_menu", array($this, "cookie_script_handle_redirection"));
            add_action("admin_init", array($this, "cookie_script_handle_redirection"));
            add_action("admin_enqueue_scripts", function() {
                if (isset($_GET['page']) && in_array($_GET['page'], ["cookie-script-with-account", "cookie-script", "cookie-script-home", "cookie-script-without-account"])) {
                    $this->cookie_script_admin_page_css_js();
                }
            });

            $this->redirectLocation = esc_attr(get_option("cookie_script_redirect_location"));
        }

        public function cookie_script_home()
        {
            add_management_page(
                "CookieScript",
                "CookieScript",
                "manage_options",
                "cookie-script",
                array($this, "register_options"),
                ""
            );
        }

        public function add_settings_link($links)
        {
            switch ($this->redirectLocation) {
                case "location-without-plan":
                    $settingsLink = "<a href=\"admin.php?page=cookie-script-without-account\">" . __("Settings") . "</a>";
                    break;
                case "location-with-plan":
                    $settingsLink = "<a href=\"admin.php?page=cookie-script-with-account\">" . __("Settings") . "</a>";
                    break;
                default:
                    $settingsLink = "<a href=\"admin.php?page=cookie-script-home\">" . __("Settings") . "</a>";
            }

            $links[] = $settingsLink;
            return $links;
        }

        public function cookie_script_admin_page_css_js()
        {
            wp_enqueue_style(
                "cookie_script_admin",
                plugin_dir_url(__FILE__) . "assets/css/cookie_script_admin.css"
            );
        }


        public function cookie_script_handle_redirection()
        {
            if (isset($_GET["page"]) && $_GET["page"] === "cookie-script") {
                if (!isset($_SERVER["HTTP_REFERER"]) || strpos($_SERVER["HTTP_REFERER"], "page=cookie-script") === false) {
                    switch ($this->redirectLocation) {
                        case "location-without-plan":
                            wp_redirect(admin_url("admin.php?page=cookie-script-without-account"));
                            break;
                        case "location-with-plan":
                            wp_redirect(admin_url("admin.php?page=cookie-script-with-account"));
                            break;
                        default:
                            wp_redirect(admin_url("admin.php?page=cookie-script-home"));
                    }
                    exit;
                }
            }
        }

        public function register_options()
        {
            $this->create_content_index_page();
        }

        static function cookie_script_deactivation()
        {
            wp_dequeue_script("cookie_script");
        }

        public static function cookie_script_uninstall()
        {
            if (!current_user_can("activate_plugins")) {
                return null;
            }

            delete_option("cookie_script_secret");
            delete_option("cookie_script_without_plan_cookies");
            delete_option("cookie_script_without_plan_script_added");
            delete_option("cookie_script_without_banner_language");
            delete_option("cookie_script_without_plan_privacy_policy_url");
            delete_option("cookie_script_item_id");
            delete_option("cookie_script_item_src");
            delete_option("cookie_script_location");
            delete_option("cookie_script_item_connection_type");
            delete_option("cookie_script_location_in_element");
            delete_option("cookie_script_with_plan_script_added");
            delete_option("cookie_script_with_plan_timestamp");
            delete_option("cookie_script_redirect_location");
            delete_option("cookie_script_current_plugin_version");
            delete_option("cookie_script_google_consent_mode_enabled");
            delete_option("cookie_script_google_consent_mode_settings");

            wp_dequeue_script("cookie_script");
            wp_deregister_script("cookie_script");
        }
    }

    add_action("admin_menu", "cookie_script_register_submenu_page");

    function cookie_script_register_submenu_page()
    {
        add_submenu_page(
            null,
            "With Account",
            "With Account",
            "manage_options",
            "cookie-script-with-account",
            "cookie_script_with_account_settings"
        );

        add_submenu_page(
            null,
            "Without Account",
            "Without Account",
            "manage_options",
            "cookie-script-without-account",
            "cookie_script_without_account_settings"
        );

        add_submenu_page(
            null,
            "Cookie Script",
            "Cookie Script",
            "manage_options",
            "cookie-script-home",
            "cookie_script_index"
        );
    }

    function cookie_script_index()
    {
        $cookieScript = new CookieScriptIndex();

        return $cookieScript->register_options();
    }

    function cookie_script_with_account_settings()
    {
        $withPlan = new CookieScriptWithPlan();

        return $withPlan->cookie_script_options_page();
    }

    function cookie_script_without_account_settings()
    {
        $withoutPlan = new CookieScriptWithoutPlan();

        return $withoutPlan->cookie_script_options_page();
    }
}

$cookieScriptInstance = new CookieScriptIndex();

require_once plugin_dir_path(__FILE__) . "upgrader.php";
new PluginUpdater();

// Make sure there is no cookie script in document while plugin is deactivated
register_deactivation_hook(__FILE__, array($cookieScriptInstance, "cookie_script_deactivation"));
// Clean up DB after uninstalling plugin
register_uninstall_hook(__FILE__, array("CookieScriptIndex", "cookie_script_uninstall"));

