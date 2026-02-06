<?php

if (! defined('ABSPATH')) {
    exit;
}

include_once ABSPATH . 'wp-admin/includes/plugin.php';

class CookieScriptPluginUpdater
{
    const NEW_VERSION = '1.4.2';

    public function __construct()
    {
        add_action('init', array($this, 'check_and_update'));
    }

    public function check_and_update()
    {
        $currentVersion = (string) get_option('cookie_script_current_plugin_version', '0.0.0');

        if (version_compare($currentVersion, self::NEW_VERSION, '<')) {
            $this->cookie_script_update_settings();
        }
    }

    private function migrate_without_plan_script_file_to_db()
    {
        $existing = get_option('cookie_script_without_plan_script_content', '');
        if (! empty($existing)) {
            return;
        }

        $file_path = plugin_dir_path(__FILE__) . 'scripts/cookie-script.js';

        if (! file_exists($file_path) || ! is_readable($file_path)) {
            return;
        }

        $js = file_get_contents($file_path);
        if (false === $js || '' === $js) {
            return;
        }

        update_option(
            'cookie_script_without_plan_script_content',
            $js,
            true
        );
    }

    public function cookie_script_update_settings()
    {
        $this->migrate_without_plan_script_file_to_db();

        $regexIdPattern = '/^[a-fA-F0-9]{32}$/';
        $this->item_id  = (string) get_option('cookie_script_item_id', '');

        update_option(
            'cookie_script_current_plugin_version',
            sanitize_text_field(self::NEW_VERSION),
            true
        );

        if (preg_match($regexIdPattern, $this->item_id) === 1) {
            $url = 'https://cdn.cookie-script.com/s/' . $this->item_id . '.js';
            update_option('cookie_script_item_src', esc_url_raw($url), true);
        }

        $itemSrc = (string) get_option('cookie_script_item_src', '');

        if ('' !== $itemSrc) {
            update_option('cookie_script_without_plan_script_added', 0, true);
            update_option('cookie_script_with_plan_script_added', 1, true);
            update_option('cookie_script_redirect_location', 'location-with-plan', true);
        }
    }
}

new CookieScriptPluginUpdater();
