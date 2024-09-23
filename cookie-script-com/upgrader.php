<?php

include_once( ABSPATH . "wp-admin/includes/plugin.php" );

class PluginUpdater {
    const NEW_VERSION = "1.0.4";

    public function __construct() {
        add_action("init", array($this, "check_and_update"));
    }

    public function check_and_update() {
        $currentVersion = get_option("cookie_script_current_plugin_version");

        if (version_compare($currentVersion, self::NEW_VERSION, "<")) {
            $this->cookie_script_update_settings();
            $this->activate_plugin();
        }
    }

    private function activate_plugin() {
        $plugin_basename = "cookie-script-com/index.php";

        if (!is_plugin_active($plugin_basename)) {
            activate_plugin($plugin_basename);
        }
    }

    public function cookie_script_update_settings() {
        $regexIdPattern = "/^[a-fA-F0-9]{32}$/";
        $this->item_id = esc_attr(get_option("cookie_script_item_id"));

        update_option("cookie_script_current_plugin_version", sanitize_text_field(self::NEW_VERSION), true);

        if (preg_match($regexIdPattern, $this->item_id) === 1) {
            $url = "https://cdn.cookie-script.com/s/" . $this->item_id . ".js";
            update_option("cookie_script_item_src", $url, true);
        }

        $itemSrc = get_option("cookie_script_item_src");

        if (!empty($itemSrc)) {
            update_option("cookie_script_without_plan_script_added", 0, true);
            update_option("cookie_script_with_plan_script_added", true, true);
            update_option("cookie_script_redirect_location", "location-with-plan", true);
        }
    }
}

new PluginUpdater();