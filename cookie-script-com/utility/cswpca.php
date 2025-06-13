<?php

class Cswpca
{
    function __construct() {
        add_action("admin_init", array($this, "cookie_script_register_settings"));
    }

    public function cookie_script_wp_consent_html($showSaveButton = false)
    {
        $saved = get_option('cookie_script_wp_init_consent', []);

        $getSelected = function ($key, $value) use ($saved) {
            return isset($saved[$key]) && $saved[$key] === $value ? 'selected="selected"' : '';
        };

        echo '
<div id="cs-settings">
    <div class="cs-settings-cswpca">
        <h4 class="cs-settings-header">Set initial consent</h4>
        <div class="cs-settings-values-wrapper">
            <div class="cs-settings-values">
                <div class="form-group">
                    <label class="control-label col-lg-4" for="functional-cookies">Functional Cookies</label>
                    <div class="col-lg-2">
                        <select name="functional-cookies">
                            <option value="deny" ' . $getSelected('functional-cookies', 'deny') . '>Deny</option>
                            <option value="allow" ' . $getSelected('functional-cookies', 'allow') . '>Allow</option>
                            <option value="ignore" ' . $getSelected('functional-cookies', 'ignore') . '>Ignore</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-lg-4" for="statistics-cookies">Statistics Cookies</label>
                    <div class="col-lg-2">
                        <select name="statistics-cookies">
                            <option value="deny" ' . $getSelected('statistics-cookies', 'deny') . '>Deny</option>
                            <option value="allow" ' . $getSelected('statistics-cookies', 'allow') . '>Allow</option>
                            <option value="ignore" ' . $getSelected('statistics-cookies', 'ignore') . '>Ignore</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-lg-4" for="marketing-cookies">Marketing Cookies</label>
                    <div class="col-lg-2">
                        <select name="marketing-cookies">
                            <option value="deny" ' . $getSelected('marketing-cookies', 'deny') . '>Deny</option>
                            <option value="allow" ' . $getSelected('marketing-cookies', 'allow') . '>Allow</option>
                            <option value="ignore" ' . $getSelected('marketing-cookies', 'ignore') . '>Ignore</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-lg-4" for="preferences-cookies">Preferences Cookies</label>
                    <div class="col-lg-2">
                        <select name="preferences-cookies">
                            <option value="deny" ' . $getSelected('preferences-cookies', 'deny') . '>Deny</option>
                            <option value="allow" ' . $getSelected('preferences-cookies', 'allow') . '>Allow</option>
                            <option value="ignore" ' . $getSelected('preferences-cookies', 'ignore') . '>Ignore</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>';

        if ($showSaveButton) {
            echo '
        <div class="panel-footer">
            <button type="submit" name="submit" class="CookieScript__button-success">
                <img src="http://localhost/wordpress/wp-content/plugins/cookie-script-com/utility/../assets/img/save-icon.svg"
                     alt="Save Icon">
                Save settings
            </button>
        </div>';
        }

        echo '</div></div>';
    }

    public function cookie_script_save_wpc()
    {
        if (!empty($_POST['functional-cookies'])) {
            $consent_data = [
                'functional-cookies'  => sanitize_text_field($_POST['functional-cookies']),
                'statistics-cookies'  => sanitize_text_field($_POST['statistics-cookies']),
                'marketing-cookies'   => sanitize_text_field($_POST['marketing-cookies']),
                'preferences-cookies' => sanitize_text_field($_POST['preferences-cookies']),
            ];

            update_option('cookie_script_wp_init_consent', $consent_data);
        }
    }

    public function cookie_script_register_settings()
    {
        register_setting(
            "cswpca_options",
            "cookie_script_wp_init_consent"
        );
    }
}