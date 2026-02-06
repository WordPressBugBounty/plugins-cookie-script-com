<?php

class CookieScriptWpca
{
    function __construct()
    {
        add_action("admin_init", array($this, "cookie_script_register_settings"));
    }

    public function cookie_script_wp_consent_html($showSaveButton = false, $imageUrls)
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
                            <option value="deny" ' . esc_html($getSelected('functional-cookies', 'deny')) . '>Deny</option>
                            <option value="allow" ' . esc_html($getSelected('functional-cookies', 'allow')) . '>Allow</option>
                            <option value="ignore" ' . esc_html($getSelected('functional-cookies', 'ignore')) . '>Ignore</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-lg-4" for="statistics-cookies">Statistics Cookies</label>
                    <div class="col-lg-2">
                        <select name="statistics-cookies">
                            <option value="deny" ' . esc_html($getSelected('statistics-cookies', 'deny')) . '>Deny</option>
                            <option value="allow" ' . esc_html($getSelected('statistics-cookies', 'allow')) . '>Allow</option>
                            <option value="ignore" ' . esc_html($getSelected('statistics-cookies', 'ignore')) . '>Ignore</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-lg-4" for="marketing-cookies">Marketing Cookies</label>
                    <div class="col-lg-2">
                        <select name="marketing-cookies">
                            <option value="deny" ' . esc_html($getSelected('marketing-cookies', 'deny')) . '>Deny</option>
                            <option value="allow" ' . esc_html($getSelected('marketing-cookies', 'allow')) . '>Allow</option>
                            <option value="ignore" ' . esc_html($getSelected('marketing-cookies', 'ignore')) . '>Ignore</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-lg-4" for="preferences-cookies">Preferences Cookies</label>
                    <div class="col-lg-2">
                        <select name="preferences-cookies">
                            <option value="deny" ' . esc_html($getSelected('preferences-cookies', 'deny')) . '>Deny</option>
                            <option value="allow" ' . esc_html($getSelected('preferences-cookies', 'allow')) . '>Allow</option>
                            <option value="ignore" ' . esc_html($getSelected('preferences-cookies', 'ignore')) . '>Ignore</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>';

        if ($showSaveButton) {
            echo '
        <div class="panel-footer">
            <button type="submit" name="submit" class="CookieScript__button-success">
                <img src="' . esc_html($imageUrls["save-icon.svg"]) . '" alt="Save Icon">
                Save settings
            </button>
        </div>';
        }

        echo '</div></div>';
    }

    public function cookie_script_save_wpc()
    {
        // phpcs:ignore WordPress.Security.NonceVerification.Missing
        if (!empty($_POST['functional-cookies'])) {
            $consent_data = [
                // phpcs:ignore WordPress.Security.NonceVerification.Missing
                'functional-cookies'  => sanitize_text_field(wp_unslash($_POST['functional-cookies'])),
                // phpcs:ignore WordPress.Security.NonceVerification.Missing
                'statistics-cookies'  => isset($_POST['statistics-cookies']) ? sanitize_text_field(wp_unslash($_POST['statistics-cookies'])) : '',
                // phpcs:ignore WordPress.Security.NonceVerification.Missing
                'marketing-cookies'   => isset($_POST['marketing-cookies']) ? sanitize_text_field(wp_unslash($_POST['marketing-cookies'])) : '',
                // phpcs:ignore WordPress.Security.NonceVerification.Missing
                'preferences-cookies' => isset($_POST['preferences-cookies']) ? sanitize_text_field(wp_unslash($_POST['preferences-cookies'])) : '',
            ];

            update_option('cookie_script_wp_init_consent', $consent_data);
        }
    }

    public function sanitize_cswpca_options($input)
    {
        if (!is_array($input)) {
            return [];
        }

        $sanitized_input = [];
        $allowed_values  = ['deny', 'allow', 'ignore'];
        $fields          = ['functional-cookies', 'statistics-cookies', 'marketing-cookies', 'preferences-cookies'];

        foreach ($fields as $field) {
            if (isset($input[$field]) && in_array($input[$field], $allowed_values, true)) {
                $sanitized_input[$field] = $input[$field];
            }
        }

        return $sanitized_input;
    }

    public function cookie_script_register_settings()
    {
        register_setting(
            "cswpca_options",
            "cookie_script_wp_init_consent",
            array(
                'sanitize_callback' => array($this, 'sanitize_cswpca_options'),
                'type'              => 'array',
            )
        );
    }
}
