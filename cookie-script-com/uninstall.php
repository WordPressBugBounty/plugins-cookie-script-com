<?php

// If uninstall not called from WordPress, then exit.
if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

delete_option("cookie_script_secret");
delete_option("cookie_script_without_plan_cookies");
delete_option("cookie_script_without_plan_script_added");
delete_option("cookie_script_without_plan_script_content");
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
delete_option("cookie_script_wp_init_consent");
