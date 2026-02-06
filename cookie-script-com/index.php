<?php

/**
 * 🍪
 * Plugin Name:       Cookie-Script.com
 * Description:       Cookie-Script.com WordPress plugin.
 * Version:           1.4.3
 * Author:            Cookie-Script.com
 * Author URI:        https://cookie-script.com/
 * Text Domain:       cookie-script-com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Requires at least: 5.6
 * Tested up to:      6.9
 */

/**
 * Cookie vector attribution:
 * https://www.freepik.com/free-vector/friendship-day-background-with-cute-cartoons_2410968.html
 */

// Block direct access
if (! defined('ABSPATH')) {
    exit;
}

require_once plugin_dir_path(__FILE__) . "cookie-script-with-plan.php";
require_once plugin_dir_path(__FILE__) . "cookie-script-without-plan.php";
require_once plugin_dir_path(__FILE__) . "utility/utility.php";

if (!class_exists("CookieScriptIndex")) {
    class CookieScriptIndex extends CSWP_CookieScript_Utility
    {
        private $redirectLocation;

        public function __construct()
        {
            add_filter("plugin_action_links_" . plugin_basename(__FILE__), array($this, "add_settings_link"));
            add_action("admin_menu", array($this, "cookie_script_home"));
            add_action("admin_menu", array($this, "cookie_script_handle_redirection"));
            add_action("admin_init", array($this, "cookie_script_handle_redirection"));
            add_action("admin_enqueue_scripts", function () {
                // phpcs:ignore WordPress.Security.NonceVerification.Recommended
                $page = isset($_GET['page']) ? sanitize_text_field(wp_unslash($_GET['page'])) : '';
                if (in_array($page, ["cookie-script-with-account", "cookie-script", "cookie-script-home", "cookie-script-without-account"])) {
                    $this->cookie_script_admin_page_css_js();
                }
            });

            $this->redirectLocation = (string) get_option('cookie_script_redirect_location', '');
            add_action('wp_enqueue_scripts', array($this, 'cookie_script_api_js'));
            add_filter('wp_consent_api_registered_' . plugin_basename(__FILE__), '__return_true');
        }


        public function cookie_script_api_js()
        {
            $consents = map_deep(
                get_option('cookie_script_wp_init_consent', []),
                'sanitize_text_field'
            );

            wp_enqueue_script('wp-consent-api');

            wp_enqueue_script(
                'cookie_script_api',
                plugin_dir_url(__FILE__) . 'assets/js/cookie_script_api.js',
                array('wp-consent-api'),
                '1.4.1',
                true
            );

            wp_localize_script('cookie_script_api', 'wpConsentData', [
                'consents' => $consents,
            ]);
        }


        public function cookie_script_home()
        {
            add_management_page(
                "CookieScript",
                "CookieScript",
                "manage_options",
                "cookie-script-com",
                array($this, "register_options")
            );
        }

        public function add_settings_link($links)
        {
            switch ($this->redirectLocation) {
                case "location-without-plan":
                    $settingsLink = sprintf(
                        '<a href="%s">%s</a>',
                        esc_url(admin_url('admin.php?page=cookie-script-without-account')),
                        esc_html__('Settings', 'cookie-script-com')
                    );

                    break;
                case "location-with-plan":
                    $settingsLink = sprintf(
                        '<a href="%s">%s</a>',
                        esc_url(admin_url('admin.php?page=cookie-script-with-account')),
                        esc_html__('Settings', 'cookie-script-com')
                    );
                    break;
                default:
                    $settingsLink = sprintf(
                        '<a href="%s">%s</a>',
                        esc_url(admin_url('admin.php?page=cookie-script-home')),
                        esc_html__('Settings', 'cookie-script-com')
                    );
            }

            $links[] = $settingsLink;
            return $links;
        }

        public function cookie_script_admin_page_css_js()
        {
            wp_enqueue_style(
                "cookie_script_admin",
                plugin_dir_url(__FILE__) . "assets/css/cookie_script_admin.css",
                array(),
                '1.4.1'
            );
        }


        public function cookie_script_handle_redirection()
        {
            // phpcs:ignore WordPress.Security.NonceVerification.Recommended
            $page    = isset($_GET['page']) ? sanitize_text_field(wp_unslash($_GET['page'])) : '';
            // phpcs:ignore WordPress.Security.NonceVerification.Recommended
            $referer = isset($_SERVER['HTTP_REFERER']) ? esc_url_raw(wp_unslash($_SERVER['HTTP_REFERER'])) : '';

            if ('cookie-script' === $page) {
                if (empty($referer) || false === strpos($referer, 'page=cookie-script')) {

                    switch ($this->redirectLocation) {
                        case 'location-without-plan':
                            $url = admin_url('admin.php?page=cookie-script-without-account');
                            break;
                        case 'location-with-plan':
                            $url = admin_url('admin.php?page=cookie-script-with-account');
                            break;

                        default:
                            $url = admin_url('admin.php?page=cookie-script-home');
                            break;
                    }
                    wp_safe_redirect(esc_url_raw($url));
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

            $cats = ['functional', 'statistics', 'marketing', 'preferences'];
            foreach ($cats as $cat) {
                setcookie(
                    "wp_consent_" . $cat,
                    "",
                    time() - HOUR_IN_SECONDS,
                    COOKIEPATH ?: "/",
                    COOKIE_DOMAIN
                );
                unset($_COOKIE["wp_consent_" . $cat]);
            }
        }
    }

    add_action("admin_menu", "cookie_script_register_submenu_page");

    function cookie_script_register_submenu_page()
    {
        add_submenu_page(
            "",
            "With Account",
            "With Account",
            "manage_options",
            "cookie-script-with-account",
            "cookie_script_with_account_settings"
        );

        add_submenu_page(
            "",
            "Without Account",
            "Without Account",
            "manage_options",
            "cookie-script-without-account",
            "cookie_script_without_account_settings"
        );

        add_submenu_page(
            "",
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

$cookie_script_instance = new CookieScriptIndex();

require_once plugin_dir_path(__FILE__) . "upgrader.php";
new CookieScriptPluginUpdater();

// Make sure there is no cookie script in document while plugin is deactivated
register_deactivation_hook(__FILE__, array($cookie_script_instance, "cookie_script_deactivation"));
