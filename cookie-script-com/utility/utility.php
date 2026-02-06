<?php

if (! defined('ABSPATH')) {
    exit;
}

require_once plugin_dir_path(__FILE__) . "cswpca.php";

class CSWP_CookieScript_Utility
{
    private static $imagePath;
    private static $imageUrls;

    public static function init()
    {
        self::$imagePath = plugins_url('../assets/img/', __FILE__);
        self::initializeImageUrls();
    }

    private static function initializeImageUrls()
    {
        $images = [
            'save-icon.svg',
            'flower2.svg',
            'flower1.svg',
            'delete-icon.svg',
            'checkmark-icon.svg',
            'banner-icon.svg',
            'back-arrow.svg',
            'add-icon.svg',
        ];

        self::$imageUrls = [];
        foreach ($images as $image) {
            self::$imageUrls[$image] = self::$imagePath . $image;
        }
    }

    public static function getImageUrls()
    {
        if (is_null(self::$imageUrls)) {
            self::init();
        }
        return self::$imageUrls;
    }

    //pages
    public function create_content_with_account()
    {
        $imageUrls = self::getImageUrls();

?>
        <form class="CookieScriptWithAccount CookieScript__adminForm" method="post">
            <div id="CookieScript" class="block-wrapper">
                <div>
                    <a class='CookieScript__button-back CookieScript__back-button'
                        href="<?php echo esc_html(admin_url("admin.php?page=cookie-script-com")) ?>">
                        <img src="<?php echo esc_html($imageUrls['back-arrow.svg']) ?>" alt="Back">
                        Back
                    </a>
                </div>
                <h3><?php esc_html_e("CookieScript Settings", "cookie-script-com"); ?></h3>
                <input type="hidden" name="cs_with_plan_setting-insert" value="<?php echo esc_html(time()); ?>">
                <?php wp_nonce_field('cs_with_plan_setting_action', 'cs_with_plan_nonce'); ?>
                <?php settings_fields("cookie_script_options_group"); ?>
                <label for="cookie_script_item_src">
                    <span><?php esc_html_e("CookieScript Source Link:", "cookie-script-com"); ?></span>
                    <div class="CookieScript__src-wrapper">
                        <input
                            type="text"
                            id="cookie_script_item_src"
                            name="cookie_script_item_src"
                            value="<?php echo esc_html($this->src) ?>"
                            maxLength="225"
                            minlength="60"
                            placeholder="//cdn.cookie-script.com/s/********************************.js"
                            required>
                        <span
                            class="CookieScript__help"
                            data-tooltip="<?php esc_html_e("You can find your Source within your account at Cookie-Script.com, under the 'Installation' tab.", "cookie-script-com"); ?>">
                            ?
                        </span>
                    </div>
                </label>
                <div>
                    <strong>
                        <?php esc_html_e("Location of the Script in the Document Object Model (DOM)", "cookie-script-com"); ?>
                    </strong>
                    <div class="CookieScript__connectionType">
                        <label for="cookie_script_location_header">
                            <input
                                type="radio"
                                id="cookie_script_location_header"
                                name="cookie_script_location"
                                value="wp_head"
                                <?php echo get_option("cookie_script_location") === "wp_head" ? "checked" : ""; ?>>
                            <?php esc_html_e("Header", "cookie-script-com"); ?>
                        </label>
                        <label for="cookie_script_location_footer">
                            <input
                                type="radio"
                                id="cookie_script_location_footer"
                                name="cookie_script_location"
                                value="wp_footer"
                                <?php echo get_option("cookie_script_location") === "wp_footer" ? "checked" : ""; ?>>
                            <?php esc_html_e("Body", "cookie-script-com"); ?>
                        </label>
                    </div>
                </div>
                <div>
                    <strong>
                        <?php esc_html_e("Specify Script Location: Either in Header or Body", "cookie-script-com"); ?>
                    </strong>
                    <div class="CookieScript__connectionType">
                        <label for="cookie_script_location_top">
                            <input
                                type="radio"
                                id="cookie_script_location_top"
                                name="cookie_script_location_in_element"
                                value="1"
                                <?php echo get_option("cookie_script_location_in_element") === "1" ? "checked" : ""; ?>>
                            <?php esc_html_e("First", "cookie-script-com"); ?>
                        </label>
                        <label for="cookie_script_location_bottom">
                            <input
                                type="radio"
                                id="cookie_script_location_bottom"
                                name="cookie_script_location_in_element"
                                value="1000"
                                <?php echo get_option("cookie_script_location_in_element") === "1000" ? "checked" : ""; ?>>
                            <?php esc_html_e("Last", "cookie-script-com"); ?>
                        </label>
                    </div>
                </div>
                <div class="CookieScript__adminForm--footer">
                    <button class="CookieScript__button-success" type="submit">
                        <img src="<?php echo esc_html($imageUrls["save-icon.svg"]) ?>" alt="Save Icon">
                        Save banner settings
                    </button>
                </div>
                <aside>
                    <hr>
                    <p><b><?php esc_html_e("How to use this plugin:", "cookie-script-com"); ?></b></p>
                    <ol>
                        <li>
                            <?php
                            printf(
                                esc_html__("Register account on %1\$s", "cookie-script-com"),
                                sprintf(
                                    "<a href='%s' target='_blank'>%s</a>",
                                    esc_url("https://cookie-script.com", array("https")),
                                    esc_html__("CookieScript", "cookie-script-com")
                                )
                            ); ?>
                        </li>
                        <li>
                            <?php
                            printf(
                                esc_html__("Create a banner for your website", "cookie-script-com")
                            ); ?>
                        </li>
                        <li>
                            <?php
                            printf(
                                esc_html__("Copy your banner code and insert it in the field above", "cookie-script-com")
                            ); ?>
                        </li>
                        <li>
                            <?php
                            printf(
                                esc_html__("All done, your website will now show the cookie banner", "cookie-script-com")
                            ); ?>
                        </li>
                    </ol>
                    <p><?php printf(esc_html__("If needed, you can adjust your banner settings in your CookieScript dashboard.", "cookie-script-com")); ?></p>
                    <p style="margin: 24px 0">
                        <?php
                        printf(
                            esc_html__("You can also check our %1\$s.", "cookie-script-com"),
                            sprintf(
                                "<a href='%s' target='_blank'>%s</a>",
                                esc_url("https://cookie-script.com/blog/cookie-consent-for-wordpress", array("https")),
                                esc_html__("detailed instructions with video guide", "cookie-script-com")
                            )
                        ); ?>
                    </p>
                    <p>
                        <?php
                        printf(
                            esc_html__("To block third-party cookies you might still have to make these changes: %1\$s.", "cookie-script-com"),
                            sprintf(
                                "<a href='%s' target='_blank'>%s</a>",
                                esc_url("https://cookie-script.com/how-to-block-third-party-cookies.html", array("https")),
                                esc_html__("How to block third-party cookies", "cookie-script-com")
                            )
                        ); ?>
                    </p>
                </aside>
                <div class="CookieScript__flowers">
                    <div class="CookieScript__flower">
                        <img src="<?php echo esc_html($imageUrls["flower1.svg"]) ?>" class="flower-left" alt="Flower">
                    </div>
                    <div class="CookieScript__flower">
                        <img src="<?php echo esc_html($imageUrls["flower2.svg"]) ?>" class='flower-right' alt="Flower">
                    </div>
                </div>
            </div>
            <div class="google-consent-mode-settings block-wrapper">
                <?php $this->google_consent_mode(); ?>
            </div>
        </form>
    <?php
    }

    public function create_content_with_out_account()
    {
        $imageUrls = self::getImageUrls();

        $cookiesExist = [];
        $cookiesArrayExist = [];
        $cookies = $this->cookies;

        if ($cookies === false || $cookies === "" || empty($cookies)) {
            $cookies = [];
        }

    ?>
        <div class="CookieScriptWithoutAccount">
            <div id="CookieScript" class="block-wrapper">
                <div>
                    <a class="CookieScript__button-back CookieScript__back-button"
                        href="<?php echo esc_html(admin_url("admin.php?page=cookie-script-com")) ?>">
                        <img src="<?php echo esc_html($imageUrls["back-arrow.svg"]) ?>" alt="Back">Back
                    </a>
                </div>
                <h3><?php esc_html_e("CookieScript Settings", "cookie-script-com"); ?></h3>
                <div>
                    <div>
                        <?php
                        echo wp_kses_post(
                            count($cookies) <= 0
                                ? "To help create a banner that shows what cookies your website is using, we need to take a look at your site. This means <strong>we'll scan your website</strong> to find out all the different cookies it uses. This will make sure your banner has all the right info about your cookies."
                                : "<div style='margin-bottom: 12px'>We have created Cookie Declaration for your website.</div><strong>You can re-scan the website to update it.</strong>"
                        );
                        ?>
                        <div class="CookieScript__settings">
                            <div id="scan_form">
                                <input type="hidden" name="cs_without_plan_setting_scan" value="<?php echo esc_html(time()); ?>">
                                <div class="scan-button-wrapper">
                                    <button id="scan-website-button" class="CookieScript__button-primary" style="margin-right: 12px;">
                                        <?php echo count($cookies) > 0 ? esc_html_e("Re-scan website", "cookie-script-com") : esc_html_e("Scan website", "cookie-script-com"); ?>
                                    </button>

                                    <a id="thickbox" class="thickbox"
                                        href="#TB_inline?width=600&height=550&inlineId=scan-modal"></a>
                                    <span id="CookieScript-message" style="display: none"></span>
                                    <div id="scanning-website"
                                        class="CookieScript__button-primary CookieScript__scan-button">
                                        <div>
                                            <?php esc_html_e("Scanning", "cookie-script-com"); ?>
                                        </div>
                                        <div class="dots-loading">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                    <button id="cs-update-script" class="CookieScript__button-primary">
                                        Update banner script
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <?php

                    foreach ($cookies as $cookie) {
                        $cookiesArrayExist[] = $cookie["cookies"];

                        if (!isset($cookie["cookies"]) || empty($cookie["cookies"])) {
                            continue;
                        }

                        $cookiesExist[] = $cookie["cookies"];
                    }

                    if (count($cookiesArrayExist) > 0) {
                    ?>
                        <div class="activation-banner-wrapper">
                            <h4 class="cookiescript__subtitle">
                                <img src="<?php echo esc_html($imageUrls['banner-icon.svg']) ?>" alt="Back">
                                <?php esc_html_e("Cookie banner", "cookie-script-com"); ?>
                            </h4>
                            <div class="CookieScript__banner-status">
                                <?php
                                echo wp_kses_post(
                                    get_option("cookie_script_without_plan_script_added")
                                        ? "<div class='CookieScript__banner-status--added'>
                                                    <div>Banner is added.</div>
                                            </div>"
                                        : "<div class='CookieScript__banner-status--not-added'>
                                                    <div>Cookie <strong>banner is not added</strong> to your website yet. Add banner by clicking button below.</div>
                                            </div>"
                                );
                                ?>
                            </div>
                            <div class="CookieScript__form-control-buttons">
                                <?php if (get_option("cookie_script_without_plan_script_added")) { ?>
                                    <form method="post">
                                        <input type="hidden" name="cs_without_plan_setting-remove"
                                            value="<?php echo esc_html(time()); ?>">
                                        <?php wp_nonce_field('cs_without_plan_remove_action', 'cs_without_plan_remove_nonce'); ?>
                                        <div>
                                            <input type="submit" name="submit" class="CookieScript__button-secondary"
                                                value="Remove banner">
                                        </div>
                                    </form>
                                <?php } else { ?>
                                    <form method="post" style="margin-right: 12px">
                                        <input type="hidden" name="cs_without_plan_setting-insert"
                                            value="<?php echo esc_html(time()); ?>">
                                        <?php wp_nonce_field('cs_without_plan_insert_action', 'cs_without_plan_insert_nonce'); ?>
                                        <div>
                                            <input type="submit" name="submit" class="CookieScript__button-primary"
                                                value="Activate banner">
                                        </div>
                                    </form>
                                <?php } ?>
                            </div>
                        </div>
                    <?php
                    }
                    if (count($cookiesExist) > 0) {
                    ?>
                        <h4 class="cookiescript__subtitle">Your Cookie Declaration report:</h4>
                        <table class="CookieScript__report-table">
                            <tr>
                                <th class="CookieScript__report-table-th">
                                    <?php esc_html_e("Name", "cookie-script-com"); ?>
                                </th>
                                <th class="CookieScript__report-table-th">
                                    <?php esc_html_e("Category", "cookie-script-com"); ?>
                                </th>
                                <th class="CookieScript__report-table-th">
                                    <?php esc_html_e("Provider/Domain", "cookie-script-com"); ?>
                                </th>
                                <th class="CookieScript__report-table-th">
                                    <?php esc_html_e("Expiration", "cookie-script-com"); ?>
                                </th>
                                <th class="CookieScript__report-table-th">
                                    <?php esc_html_e("Description", "cookie-script-com"); ?>
                                </th>
                            </tr>
                            <?php
                            foreach ($cookies as $cookie) {

                                if (empty($cookie["cookies"])) {
                                    continue;
                                }

                                foreach ($cookie["cookies"] as $value) {
                                    echo "<tr>";
                                    echo "<td class='CookieScript__report-table-td'>" . esc_html($value["name"]) . "</td>";
                                    echo "<td class='CookieScript__report-table-td'>" . esc_html($cookie["type_name"]) . "</td>";
                                    echo "<td class='CookieScript__report-table-td'>" . esc_html($value["domain"]) . "</td>";
                                    echo "<td class='CookieScript__report-table-td'>" . esc_html($value["expire"]) . "</td>";
                                    echo "<td class='CookieScript__report-table-td'>" . esc_html($value["desc"]) . "</td>";
                                    echo "</tr>";
                                }
                            }
                            ?>
                        </table>
                        <div style="margin-top:20px">* To edit this report, create an account at <a
                                href="https://cookie-script.com" target="_blank">CookieScript</a> and use our
                            Dashboard
                            to adjust banner settings and Cookie Declaration
                        </div>
                    <?php } ?>
                </div>
                <div class="CookieScript__flowers">
                    <div class="CookieScript__flower">
                        <img src="<?php echo esc_html($imageUrls["flower1.svg"]) ?>" class="flower-left" alt="Flower">
                    </div>
                    <div class="CookieScript__flower">
                        <img src="<?php echo esc_html($imageUrls["flower2.svg"]) ?>" class="flower-right" alt="Flower">
                    </div>
                </div>
                <div id="scan-modal" style="display:none;">
                    <form id="modal-form" method="post">
                        <label for="cookie_script_policy_url">
                            <span><?php esc_html_e("We need a bit more information about your website. Please provide the URL of your website’s cookie policy page (optional) and select the primary language for your banner.", "cookie-script-com"); ?></span>
                            <div class="CookieScript__src-wrapper">
                                <input
                                    type="text"
                                    value="<?php echo esc_html($this->policyUrl); ?>"
                                    id="cookie_script_policy_url"
                                    name="cookie_script_policy_url"
                                    placeholder="Enter cookie policy link"
                                    required>
                            </div>
                        </label>
                        <label for="cookie_script_language">
                            <span><?php esc_html_e("Select banner language", "cookie-script-com"); ?></span>
                            <div class="CookieScript__src-wrapper">
                                <select id="cookie_script_select_language" name="cookie_script_select_language">
                                    <option></option>
                                </select>
                            </div>
                        </label>
                        <button id="scan-website" class="CookieScript__button-primary" type="submit">
                            <?php esc_html_e("Scan website", "cookie-script-com"); ?>
                        </button>
                    </form>
                </div>
            </div>
            <form class="google-consent-mode-settings block-wrapper" method="post">
                <input type="hidden" name="cs_without_plan_setting_save" value="<?php echo esc_html(time()); ?>">
                <?php wp_nonce_field('cs_without_plan_save_action', 'cs_without_plan_save_nonce'); ?>
                <?php $this->google_consent_mode(true); ?>
            </form>
        </div>
    <?php
    }

    public function create_content_index_page()
    {
        $imageUrls = self::getImageUrls();

    ?>
        <div class="wrap">
            <div class="CookieScript__home block-wrapper">
                <h1 class="entry-title">
                    <div><?php esc_html_e("Welcome to CookieScript Integration", "cookie-script-com"); ?></div>
                </h1>
                <p><?php esc_html_e("Get started with enhancing your website's compliance and user experience with our CookieScript Integration plugin. Whether you have an existing CookieScript account or prefer to get a feel for our features first, we've got you covered. Choose your setup path below to begin customizing your site’s cookie consent management in a way that best suits your needs.", "cookie-script-com"); ?></p>
                <div>
                    <a class="CookieScript__button-secondary" href="admin.php?page=cookie-script-with-account"
                        style="margin-right: 12px;">
                        I have CookieScript account</a>
                    <a class="CookieScript__button-primary" href="admin.php?page=cookie-script-without-account">
                        I don't have CookieScript account</a>
                </div>
            </div>
            <div class="CookieScript__flowers">
                <div class="CookieScript__flower">
                    <img src="<?php echo esc_html($imageUrls["flower1.svg"]) ?>" alt="Flower">
                </div>
                <div class="CookieScript__flower">
                    <img src="<?php echo esc_html($imageUrls["flower2.svg"]) ?>" alt="Flower">
                </div>
            </div>
        </div>
    <?php
    }

    //Error message
    public function flashMessage($message, $type = "success", $typeClass = "flash-message__success")
    {
        set_transient("cswp_cookie_script_banner_added_flash", sanitize_text_field($message));

    ?>
        <div id="flash-message-wrapper" class="">
            <div class="flash-message <?php echo esc_html($typeClass); ?> notice is-dismissible">
                <?php if ($type === "success") { ?>
                    <div class="flash-message__image">
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                            width="15.000000pt" height="15.000000pt" viewBox="0 0 512.000000 512.000000"
                            preserveAspectRatio="xMidYMid meet">

                            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                fill="#fff" stroke="none">
                                <path d="M4605 4386 c-105 -33 -109 -36 -1445 -1372 l-1315 -1314 -595 595
                            c-553 551 -600 596 -662 625 -159 74 -328 51 -454 -63 -100 -90 -149 -234
                            -125 -364 25 -134 9 -117 839 -944 726 -724 771 -767 832 -794 78 -34 185 -44
                            257 -25 122 33 70 -16 1629 1543 1614 1616 1522 1517 1547 1660 34 199 -91
                            392 -292 453 -56 17 -162 17 -216 0z" />
                            </g>
                        </svg>
                    </div>
                <?php } ?>
                <p><?php echo esc_html(get_transient("cswp_cookie_script_banner_added_flash")); ?></p>
            </div>
        </div>
    <?php

        delete_transient("cswp_cookie_script_banner_added_flash");
    }

    //Google Consent Mode

    public function google_consent_mode($displaySaveButton = false)
    {
        $consentModeSettings = json_decode(
            get_option('cookie_script_google_consent_mode_settings', '{}'),
            true
        );

        $consentModeSettings = is_array($consentModeSettings)
            ? map_deep($consentModeSettings, 'sanitize_text_field')
            : [];

        $imageUrls = self::getImageUrls();

    ?>
        <div class="tabs">
            <ul class="tab-list" role="tablist">
                <li role="presentation">
                    <button type="button" id="tab-1-btn" role="tab" aria-controls="tab-1" aria-selected="true">
                        Google Consent Mode
                    </button>
                </li>
                <li role="presentation">
                    <button type="button" id="tab-2-btn" role="tab" aria-controls="tab-2" aria-selected="false">
                        WordPress Consent API
                    </button>
                </li>
            </ul>
            <div id="tab-1" class="tab-panel" role="tabpanel" aria-labelledby="tab-1-btn">
                <div class="form-group enable-consent-mode">
                    <div>
                        <input type="hidden" name="enable_google_consent_mode" value="0" />
                        <input type="checkbox" name="enable_google_consent_mode" value="1"
                            id="enable_google_consent_mode" <?php echo get_option("cookie_script_google_consent_mode_enabled") ? "checked" : "" ?>>
                        <label for="enable_google_consent_mode"><?php esc_html_e('Enable Google Consent Mode', 'cookie-script-com'); ?></label>
                    </div>
                    <div>
                        <?php if ($displaySaveButton) { ?>
                            <button id="top-gtm-save-button" type="submit" name="submit"
                                class="CookieScript__button-success">
                                <img src="<?php echo esc_html($imageUrls["save-icon.svg"]) ?> " alt="Save Icon">
                                Save settings
                            </button>
                        <?php } ?>
                    </div>
                </div>
                <div id="cs-settings" <?php if (!get_option("cookie_script_google_consent_mode_enabled")) echo 'style="display:none"'; ?>>
                    <h4 class="cs-settings"><?php esc_html_e('Global Settings', 'cookie-script-com'); ?></h4>
                    <div class="cs-settings-values-wrapper">
                        <div class="cs-settings-values">
                            <?php
                            $globalSettings = isset($consentModeSettings['global']) ? $consentModeSettings['global'] : [];

                            $this->render_google_consent_select('global', 'ad_storage', 'Advertisement Cookies', isset($globalSettings["ad_storage"]) ? $globalSettings["ad_storage"] : "denied");
                            $this->render_google_consent_select('global', 'analytics_storage', 'Analytics Cookies', isset($globalSettings["analytics_storage"]) ? $globalSettings["analytics_storage"] : "denied");
                            $this->render_google_consent_select('global', 'ad_user_data', 'Advertisement User Data', isset($globalSettings["ad_user_data"]) ? $globalSettings["ad_user_data"] : "denied");
                            $this->render_google_consent_select('global', 'ad_personalization', 'Advertisement Personalization', isset($globalSettings["ad_personalization"]) ? $globalSettings["ad_personalization"] : "denied");
                            ?>
                        </div>
                        <div class="cs-settings-values">
                            <?php
                            $this->render_google_consent_select('global', 'functionality_storage', 'Functional Cookies', isset($globalSettings["functionality_storage"]) ? $globalSettings["functionality_storage"] : "denied");
                            $this->render_google_consent_select('global', 'personalization_storage', 'Personalization Cookies', isset($globalSettings["personalization_storage"]) ? $globalSettings["personalization_storage"] : "denied");
                            $this->render_google_consent_select('global', 'security_storage', 'Security Cookies', isset($globalSettings["security_storage"]) ? $globalSettings["security_storage"] : "denied");
                            ?>
                            <div class="form-group">
                                <label class="control-label col-lg-4"><?php esc_html_e('Wait for update', 'cookie-script-com'); ?></label>
                                <div class="col-lg-2">
                                    <input onchange="inputWfuValidation(this)" type="text"
                                        name="consent_settings[global][wait_for_update]"
                                        value="<?php echo esc_attr(isset($globalSettings['wait_for_update']) ? $globalSettings['wait_for_update'] : '500'); ?>"
                                        size="5" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <h4 class="cs-settings-header"><?php esc_html_e('Regional Settings', 'cookie-script-com'); ?></h4>
                    <div id="accordion">
                        <?php $this->render_regional_settings(); ?>
                    </div>
                    <div class="panel-footer">
                        <button class="CookieScript__button-secondary" type="button" id="add-region"
                            onclick="addRegion()">
                            <img src="<?php echo esc_html($imageUrls["add-icon.svg"]) ?>" alt="Add Icon">
                            <?php esc_html_e('Add new region', 'cookie-script-com'); ?>
                        </button>
                        <?php if ($displaySaveButton) { ?>
                            <button type="submit" name="submit" class="CookieScript__button-success">
                                <img src="<?php echo esc_html($imageUrls["save-icon.svg"]) ?>" alt="Save Icon">
                                Save settings
                            </button>
                        <?php } ?>
                    </div>
                </div>
            </div>
            <div id="tab-2" class="tab-panel" role="tabpanel" aria-labelledby="tab-2-btn">
                <?php
                if (is_plugin_active('wp-consent-api/wp-consent-api.php')) {
                    echo '<p>' . esc_html__('The WP Consent API plugin is active. CookieScript will automatically synchronize consent preferences with it.', 'cookie-script-com') . '</p>';
                    $cswpca = new CookieScriptWpca();
                    $cswpca->cookie_script_wp_consent_html($displaySaveButton, $imageUrls);
                } else {
                    echo '<p>' . esc_html__('The WP Consent API plugin is not installed or activated. To enable integration, please install and activate it.', 'cookie-script-com') . ' <a href="https://help.cookie-script.com/en/integration-with-other-systems/cookie-compliance-integration-for-wordpress-and-woocommerce" target="_blank">' . esc_html__('Learn more', 'cookie-script-com') . '</a>.</p>';
                }
                ?>
            </div>
        </div>
    <?php
    }

    private function render_region($index, $region)
    {
        $imageUrls = self::getImageUrls();

    ?>
        <div class="regional-setting">
            <div class="region-settings">
                <h5><?php esc_html_e('Region: ', 'cookie-script-com'); ?><?php echo esc_html($region['region_code']); ?></h5>
                <button class="CookieScript__button-remove" type="button"
                    onclick="removeRegion(this)">
                    <img src="<?php echo esc_html($imageUrls["delete-icon.svg"]) ?>" alt="Delete Icon">
                    <?php esc_html_e('DELETE REGION', 'cookie-script-com'); ?>
                </button>
            </div>
            <div class="gcm-setting form-wrapper">
                <div class="cs-settings-values-wrapper">
                    <div class="cs-settings-values">
                        <div class="form-group">
                            <label class="control-label col-lg-4"><?php esc_html_e('Region Code', 'cookie-script-com'); ?></label>
                            <div class="col-lg-2">
                                <input type="text"
                                    name="consent_settings[regional][<?php echo esc_attr($index); ?>][region_code]"
                                    value="<?php echo esc_html($region["region_code"]); ?>" size="5" />
                            </div>
                        </div>
                        <?php
                        $this->render_google_consent_select("regional", "ad_storage", 'Advertisement Cookies', $region["ad_storage"], $index);
                        $this->render_google_consent_select("regional", "analytics_storage", 'Analytics Cookies', $region["analytics_storage"], $index);
                        $this->render_google_consent_select("regional", "ad_user_data", 'Advertisement User Data', $region["ad_user_data"], $index);
                        $this->render_google_consent_select("regional", "ad_personalization", 'Advertisement Personalization', $region["ad_personalization"], $index);
                        ?>
                    </div>
                    <div class="cs-settings-values">
                        <?php
                        $this->render_google_consent_select("regional", "functionality_storage", 'Functional Cookies', $region["functionality_storage"], $index);
                        $this->render_google_consent_select("regional", "personalization_storage", 'Personalization Cookies', $region["personalization_storage"], $index);
                        $this->render_google_consent_select("regional", "security_storage", 'Security Cookies', $region["security_storage"], $index);
                        ?>
                        <div class="form-group">
                            <label class="control-label col-lg-4"><?php esc_html_e('Wait for update', 'cookie-script-com'); ?></label>
                            <div class="col-lg-2">
                                <input onchange="inputWfuValidation(this)" type="text"
                                    name="consent_settings[regional][<?php echo esc_attr($index); ?>][wait_for_update]"
                                    value="<?php echo esc_attr($region['wait_for_update']); ?>" size="5" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <?php
    }

    public function string_validation($string, $patern)
    {
        if (!preg_match($patern, $string)) {
            return false;
        }

        return true;
    }

    public function validate_positive_integer($value)
    {
        if (is_numeric($value) && is_int(0 + $value) && $value > 0) {
            return true;
        }

        return false;
    }

    public function display_google_consent_script_front($consentModeSettings)
    {

        if (! is_array($consentModeSettings)) {
            return '';
        }

        $script = [
            'window.dataLayer = window.dataLayer || [];',
            'window.gtag = window.gtag || function(){dataLayer.push(arguments);};',
        ];

        if (! empty($consentModeSettings['regional']) && is_array($consentModeSettings['regional'])) {
            foreach ($consentModeSettings['regional'] as $region) {

                if (empty($region['region_code'])) {
                    continue;
                }

                $regions = array_map('trim', explode(',', sanitize_text_field($region['region_code'])));

                $data = [
                    'ad_storage' => sanitize_text_field($region['ad_storage'] ?? 'denied'),
                    'analytics_storage' => sanitize_text_field($region['analytics_storage'] ?? 'denied'),
                    'ad_user_data' => sanitize_text_field($region['ad_user_data'] ?? 'denied'),
                    'ad_personalization' => sanitize_text_field($region['ad_personalization'] ?? 'denied'),
                    'functionality_storage' => sanitize_text_field($region['functionality_storage'] ?? 'denied'),
                    'personalization_storage' => sanitize_text_field($region['personalization_storage'] ?? 'denied'),
                    'security_storage' => sanitize_text_field($region['security_storage'] ?? 'denied'),
                    'wait_for_update' => absint($region['wait_for_update'] ?? 500),
                    'region' => $regions,
                ];

                $script[] = "gtag('consent','default'," . wp_json_encode($data) . ");";
            }
        }

        if (! empty($consentModeSettings['global']) && is_array($consentModeSettings['global'])) {

            $g = $consentModeSettings['global'];

            $data = [
                'ad_storage' => sanitize_text_field($g['ad_storage'] ?? 'denied'),
                'analytics_storage' => sanitize_text_field($g['analytics_storage'] ?? 'denied'),
                'ad_user_data' => sanitize_text_field($g['ad_user_data'] ?? 'denied'),
                'ad_personalization' => sanitize_text_field($g['ad_personalization'] ?? 'denied'),
                'functionality_storage' => sanitize_text_field($g['functionality_storage'] ?? 'denied'),
                'personalization_storage' => sanitize_text_field($g['personalization_storage'] ?? 'denied'),
                'security_storage' => sanitize_text_field($g['security_storage'] ?? 'denied'),
                'wait_for_update' => absint($g['wait_for_update'] ?? 500),
            ];

            $script[] = "gtag('consent','default'," . wp_json_encode($data) . ");";
            $script[] = "gtag('set','developer_id.dMmY1Mm',true);";
            $script[] = "gtag('set','ads_data_redaction',true);";
        }

        return wp_get_inline_script_tag(implode("\n", $script));
    }


    private function render_google_consent_select($scope, $name, $label, $settings, $value = null)
    {
    ?>
        <div class="form-group">
            <label class="control-label col-lg-4"><?php echo esc_html($label); ?></label>
            <div class="col-lg-2">
                <select name="consent_settings[<?php echo esc_html($scope); ?>]<?php echo esc_html($value !== null ? '[' . $value . ']' : ''); ?>[<?php echo esc_html($name); ?>]"
                    id="<?php echo esc_html($value . '-' . $name); ?>">
                    <option value="granted" <?php selected($settings, 'granted'); ?>><?php esc_html_e('Granted', 'cookie-script-com'); ?></option>
                    <option value="denied" <?php selected($settings, 'denied'); ?>><?php esc_html_e('Denied', 'cookie-script-com'); ?></option>
                </select>
            </div>
        </div>
<?php
    }

    private function render_regional_settings()
    {
        $settings = json_decode(get_option('cookie_script_google_consent_mode_settings'), true);
        $regions = isset($settings['regional']) ? $settings['regional'] : [];

        if (!empty($regions)) {
            foreach ($regions as $index => $region) {
                $this->render_region($index, $region);
            }
        }
    }

    public function is_preview()
    {
        // phpcs:ignore WordPress.Security.NonceVerification.Recommended
        $elementor_preview = isset($_GET['elementor-preview']) ? sanitize_text_field(wp_unslash($_GET['elementor-preview'])) : '';
        // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.MissingUnslash
        $fetch_dest = isset($_SERVER['HTTP_SEC_FETCH_DEST']) ? sanitize_text_field(wp_unslash($_SERVER['HTTP_SEC_FETCH_DEST'])) : '';

        return !empty($elementor_preview) || $fetch_dest === 'iframe';
    }
}
