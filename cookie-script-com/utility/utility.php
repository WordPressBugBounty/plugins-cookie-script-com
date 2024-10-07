<?php

class Utility
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
                       href="<?php echo admin_url("admin.php?page=cookie-script") ?>">
                        <img src="<?php echo $imageUrls['back-arrow.svg'] ?>" alt="Back">
                        Back
                    </a>
                </div>
                <h3><?php esc_html_e("CookieScript Settings", "CookieScript"); ?></h3>
                <input type="hidden" name="cs_with_plan_setting-insert" value="<?php echo time(); ?>">
                <?php settings_fields("cookie_script_options_group"); ?>
                <label for="cookie_script_item_src">
                    <span><?php esc_html_e("CookieScript Source Link:", "CookieScript"); ?></span>
                    <div class="CookieScript__src-wrapper">
                        <input
                                type="text"
                                id="cookie_script_item_src"
                                name="cookie_script_item_src"
                                value="<?php echo $this->src ?>"
                                maxLength="225"
                                minlength="60"
                                placeholder="//cdn.cookie-script.com/s/********************************.js"
                                required
                        >
                        <span
                                class="CookieScript__help"
                                data-tooltip="<?php esc_html_e("You can find your Source within your account at Cookie-Script.com, under the 'Installation' tab.", "CookieScript"); ?>">
                        ?
                    </span>
                    </div>
                </label>
                <div>
                    <strong>
                        <?php esc_html_e("Location of the Script in the Document Object Model (DOM)", "CookieScript"); ?>
                    </strong>
                    <div class="CookieScript__connectionType">
                        <label for="cookie_script_location_header">
                            <input
                                    type="radio"
                                    id="cookie_script_location_header"
                                    name="cookie_script_location"
                                    value="wp_head"
                                <?php echo get_option("cookie_script_location") === "wp_head" ? "checked" : ""; ?>
                            >
                            <?php esc_html_e("Header", "CookieScript"); ?>
                        </label>
                        <label for="cookie_script_location_footer">
                            <input
                                    type="radio"
                                    id="cookie_script_location_footer"
                                    name="cookie_script_location"
                                    value="wp_footer"
                                <?php echo get_option("cookie_script_location") === "wp_footer" ? "checked" : ""; ?>
                            >
                            <?php esc_html_e("Body", "CookieScript"); ?>
                        </label>
                    </div>
                </div>
                <div>
                    <strong>
                        <?php esc_html_e("Specify Script Location: Either in Header or Body", "CookieScript"); ?>
                    </strong>
                    <div class="CookieScript__connectionType">
                        <label for="cookie_script_location_top">
                            <input
                                    type="radio"
                                    id="cookie_script_location_top"
                                    name="cookie_script_location_in_element"
                                    value="1"
                                <?php echo get_option("cookie_script_location_in_element") === "1" ? "checked" : ""; ?>
                            >
                            <?php esc_html_e("First", "CookieScript"); ?>
                        </label>
                        <label for="cookie_script_location_bottom">
                            <input
                                    type="radio"
                                    id="cookie_script_location_bottom"
                                    name="cookie_script_location_in_element"
                                    value="1000"
                                <?php echo get_option("cookie_script_location_in_element") === "1000" ? "checked" : ""; ?>
                            >
                            <?php esc_html_e("Last", "CookieScript"); ?>
                        </label>
                    </div>
                </div>
                <div class="CookieScript__adminForm--footer">
                    <button class="CookieScript__button-success" type="submit">
                        <img src="<?php echo $imageUrls["save-icon.svg"]; ?>" alt="Save Icon">
                        Save banner settings
                    </button>
                </div>
                <aside>
                    <hr>
                    <p><b><?php esc_html_e("How to use this plugin:", "CookieScript"); ?></b></p>
                    <ol>
                        <li>
                            <?php
                            printf(
                                esc_html__("Register account on %1\$s", "CookieScript"),
                                sprintf(
                                    "<a href='%s' target='_blank'>%s</a>",
                                    esc_url("https://cookie-script.com", array("https")),
                                    esc_html__("CookieScript", "CookieScript")
                                )
                            ); ?>
                        </li>
                        <li>
                            <?php
                            printf(
                                esc_html__("Create a banner for your website", "CookieScript")
                            ); ?>
                        </li>
                        <li>
                            <?php
                            printf(
                                esc_html__("Copy your banner code and insert it in the field above", "CookieScript")
                            ); ?>
                        </li>
                        <li>
                            <?php
                            printf(
                                esc_html__("All done, your website will now show the cookie banner", "CookieScript")
                            ); ?>
                        </li>
                    </ol>
                    <p><?php printf(esc_html_e("If needed, you can adjust your banner settings in your CookieScript dashboard.", "CookieScript")); ?></p>
                    <p style="margin: 24px 0">
                        <?php
                        printf(
                            esc_html__("You can also check our %1\$s.", "CookieScript"),
                            sprintf(
                                "<a href='%s' target='_blank'>%s</a>",
                                esc_url("https://cookie-script.com/blog/cookie-consent-for-wordpress", array("https")),
                                esc_html__("detailed instructions with video guide", "CookieScript")
                            )
                        ); ?>
                    </p>
                    <p>
                        <?php
                        printf(
                            esc_html__("To block third-party cookies you might still have to make these changes: %1\$s.", "CookieScript"),
                            sprintf(
                                "<a href='%s' target='_blank'>%s</a>",
                                esc_url("https://cookie-script.com/how-to-block-third-party-cookies.html", array("https")),
                                esc_html__("How to block third-party cookies", "CookieScript")
                            )
                        ); ?>
                    </p>
                </aside>
                <div class="CookieScript__flowers">
                    <div class="CookieScript__flower">
                        <img src="<?php echo $imageUrls["flower1.svg"] ?>" class="flower-left" alt="Flower">
                    </div>
                    <div class="CookieScript__flower">
                        <img src="<?php echo $imageUrls["flower2.svg"]; ?>" class='flower-right' alt="Flower">
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
                       href="<?php echo admin_url("admin.php?page=cookie-script") ?>">
                        <img src="<?php echo $imageUrls["back-arrow.svg"]; ?>" alt="Back">Back
                    </a>
                </div>
                <h3><?php esc_html_e("CookieScript Settings", "CookieScript"); ?></h3>
                <div>
                    <div>
                        <?php
                        echo count($cookies) <= 0
                            ? "To help create a banner that shows what cookies your website is using, we need to take a look at your site. This means <strong>we'll scan your website</strong> to find out all the different cookies it uses. This will make sure your banner has all the right info about your cookies."
                            : "<div style='margin-bottom: 12px'>We have created Cookie Declaration for your website.</div><strong>You can re-scan the website to update it.</strong>";
                        ?>
                        <div class="CookieScript__settings">
                            <div id="scan_form">
                                <input type="hidden" name="cs_without_plan_setting_scan" value="<?php echo time(); ?>">
                                <div class="scan-button-wrapper">
                                    <button id="scan-website-button" class="CookieScript__button-primary">
                                        <?php echo count($cookies) > 0 ? esc_html_e("Re-scan website", "CookieScript") : esc_html_e("Scan website", "CookieScript"); ?>
                                    </button>
                                    <a id="thickbox" class="thickbox"
                                       href="#TB_inline?width=600&height=550&inlineId=scan-modal"></a>
                                    <span id="CookieScript-message" style="display: none"></span>
                                    <div id="scanning-website"
                                         class="CookieScript__button-primary CookieScript__scan-button">
                                        <div>
                                            <?php esc_html_e("Scanning", "CookieScript"); ?>
                                        </div>
                                        <div class="dots-loading">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <?php

                    foreach ($cookies as $cookie) {
	                    $cookiesArrayExist[] = $cookie["cookies"];

                        if (!isset($cookie["cookies"])) {
                            continue;
                        }

                        $cookiesExist[] = $cookie["cookies"] ;
                    }

                    if (count($cookiesArrayExist) > 0) {
                        ?>
                        <div class="activation-banner-wrapper">
                            <h4 class="cookiescript__subtitle">
                                <img src="<?php echo $imageUrls['banner-icon.svg'] ?>" alt="Back">
                                <?php esc_html_e("Cookie banner", "CookieScript"); ?>
                            </h4>
                            <div class="CookieScript__banner-status">
                                <?php
                                if (get_option("cookie_script_without_plan_script_added")) {
                                    echo
                                    "<div class='CookieScript__banner-status--added'>
                                        <div>Banner is added.</div>
                                    </div>";
                                } else {
                                    echo
                                    "<div class='CookieScript__banner-status--not-added'>
                                        <div>Cookie <strong>banner is not added </strong> to your website yet. Add banner by clicking button below.</div>
                                    </div>";
                                }
                                ?>
                            </div>
                            <div class="CookieScript__form-control-buttons">
                                <?php if (get_option("cookie_script_without_plan_script_added")) { ?>
                                    <form method="post">
                                        <input type="hidden" name="cs_without_plan_setting-remove"
                                               value="<?php echo time(); ?>">
                                        <div>
                                            <input type="submit" name="submit" class="CookieScript__button-secondary"
                                                   value="Remove banner">
                                        </div>
                                    </form>
                                <?php } else { ?>
                                    <form method="post" style="margin-right: 12px">
                                        <input type="hidden" name="cs_without_plan_setting-insert"
                                               value="<?php echo time(); ?>">
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
                                    <?php esc_html_e("Name", "CookieScript"); ?>
                                </th>
                                <th class="CookieScript__report-table-th">
                                    <?php esc_html_e("Category", "CookieScript"); ?>
                                </th>
                                <th class="CookieScript__report-table-th">
                                    <?php esc_html_e("Provider/Domain", "CookieScript"); ?>
                                </th>
                                <th class="CookieScript__report-table-th">
                                    <?php esc_html_e("Expiration", "CookieScript"); ?>
                                </th>
                                <th class="CookieScript__report-table-th">
                                    <?php esc_html_e("Description", "CookieScript"); ?>
                                </th>
                            </tr>
                            <?php
                            foreach ($cookies as $cookie) {

                                if (empty($cookie["cookies"])) {
                                    continue;
                                }

                                foreach ($cookie["cookies"] as $value) {
                                    echo "<tr>";
                                    echo "<td class='CookieScript__report-table-td'>" . $value["name"] . "</td>";
                                    echo "<td class='CookieScript__report-table-td'>" . $cookie["type_name"] . "</td>";
                                    echo "<td class='CookieScript__report-table-td'>" . $value["domain"] . "</td>";
                                    echo "<td class='CookieScript__report-table-td'>" . $value["expire"] . "</td>";
                                    echo "<td class='CookieScript__report-table-td'>" . $value["desc"] . "</td>";
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
                        <img src="<?php echo $imageUrls["flower1.svg"] ?>" class="flower-left" alt="Flower">
                    </div>
                    <div class="CookieScript__flower">
                        <img src="<?php echo $imageUrls["flower2.svg"] ?>" class="flower-right" alt="Flower">
                    </div>
                </div>
                <div id="scan-modal" style="display:none;">
                    <form id="modal-form" method="post">
                        <label for="cookie_script_policy_url">
                            <span><?php esc_html_e("We need a bit more information about your website. Please provide the URL of your website’s cookie policy page (optional) and select the primary language for your banner.", "CookieScript"); ?></span>
                            <div class="CookieScript__src-wrapper">
                                <input
                                        type="text"
                                        value="<?php echo $this->policyUrl; ?>"
                                        id="cookie_script_policy_url"
                                        name="cookie_script_policy_url"
                                        placeholder="Enter cookie policy link"
                                        required
                                >
                            </div>
                        </label>
                        <label for="cookie_script_language">
                            <span><?php esc_html_e("Select banner language", "CookieScript"); ?></span>
                            <div class="CookieScript__src-wrapper">
                                <select id="cookie_script_select_language" name="cookie_script_select_language">
                                    <option></option>
                                </select>
                            </div>
                        </label>
                        <button id="scan-website" class="CookieScript__button-primary" type="submit">
                            <?php esc_html_e("Scan website", "CookieScript"); ?>
                        </button>
                    </form>
                </div>
            </div>
            <form class="google-consent-mode-settings block-wrapper" method="post">
                <input type="hidden" name="cs_without_plan_setting_save" value="<?php echo time(); ?>">
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
                    <div><?php esc_html_e("Welcome to CookieScript Integration", "CookieScript"); ?></div>
                </h1>
                <p><?php esc_html_e("Get started with enhancing your website's compliance and user experience with our CookieScript Integration plugin. Whether you have an existing CookieScript account or prefer to get a feel for our features first, we've got you covered. Choose your setup path below to begin customizing your site’s cookie consent management in a way that best suits your needs.", "CookieScript"); ?></p>
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
                    <img src="<?php echo $imageUrls["flower1.svg"]; ?>" alt="Flower">
                </div>
                <div class="CookieScript__flower">
                    <img src="<?php echo $imageUrls["flower2.svg"]; ?>" alt="Flower">
                </div>
            </div>
        </div>
        <?php
    }

    //Error message

    public function flashMessage($message, $type = "success", $typeClass = "flash-message__success")
    {
        set_transient("banner-added-flash", $message);

        ?>
        <div id="flash-message-wrapper" class="">
            <div class="flash-message <?php echo $typeClass; ?> notice is-dismissible">
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
                            392 -292 453 -56 17 -162 17 -216 0z"/>
                            </g>
                        </svg>
                    </div>
                <?php } ?>
                <p><?php echo esc_html(get_transient("banner-added-flash")); ?></p>
            </div>
        </div>
        <?php

        delete_transient("banner-added-flash");
    }

    //Google Consent Mode

    public function google_consent_mode($displaySaveButton = false)
    {
        $consentModeSettings = json_decode(get_option("cookie_script_google_consent_mode_settings", '{}'), true);
        $imageUrls = self::getImageUrls();

        ?>
        <div class="form-group enable-consent-mode">
            <div>
                <input type="hidden" name="enable_google_consent_mode" value="0"/>
                <input type="checkbox" name="enable_google_consent_mode"
                       id="enable_google_consent_mode" <?php echo get_option("cookie_script_google_consent_mode_enabled") ? "checked" : "" ?>>
                <label for="enable_google_consent_mode"><?php esc_html_e('Enable Google Consent Mode', 'CookieScript'); ?></label>
            </div>
            <div>
                <?php if ($displaySaveButton) { ?>
                    <button id="top-gtm-save-button" type="submit" name="submit"
                            class="CookieScript__button-success">
                        <img src="<?php echo $imageUrls["save-icon.svg"];?> " alt="Save Icon">
                        Save settings
                    </button>
                <?php } ?>
            </div>
        </div>
        <div id="google-consent-settings" <?php if (!get_option("cookie_script_google_consent_mode_enabled")) echo 'style="display:none"'; ?>>
            <h4 class="google-consent-mode-header"><?php esc_html_e('Global Settings', 'CookieScript'); ?></h4>
            <div class="google-consent-mode-values-wrapper">
                <div class="google-consent-mode-values">
                    <?php
                        $globalSettings = $consentModeSettings['global'] ?? [];

                        $this->render_google_consent_select('global', 'ad_storage', 'Advertisement Cookies', $globalSettings["ad_storage"] ?? "denied");
                        $this->render_google_consent_select('global', 'analytics_storage', 'Analytics Cookies', $globalSettings["analytics_storage"] ?? "denied");
                        $this->render_google_consent_select('global', 'ad_user_data', 'Advertisement User Data', $globalSettings["ad_user_data"] ?? "denied");
                        $this->render_google_consent_select('global', 'ad_personalization', 'Advertisement Personalization', $globalSettings["ad_personalization"] ?? "denied");
                    ?>
                </div>
                <div class="google-consent-mode-values">
                    <?php
                        $this->render_google_consent_select('global', 'functionality_storage', 'Functional Cookies', $globalSettings["functionality_storage"] ?? "denied");
                        $this->render_google_consent_select('global', 'personalization_storage', 'Personalization Cookies', $globalSettings["personalization_storage"] ?? "denied");
                        $this->render_google_consent_select('global', 'security_storage', 'Security Cookies', $globalSettings["security_storage"] ?? "denied");
                    ?>
                    <div class="form-group">
                        <label class="control-label col-lg-4"><?php esc_html_e('Wait for update', 'CookieScript'); ?></label>
                        <div class="col-lg-2">
                            <input onchange="inputWfuValidation(this)" type="text"
                                   name="consent_settings[global][wait_for_update]"
                                   value="<?php echo esc_attr($globalSettings['wait_for_update'] ?? '500'); ?>"
                                   size="5"/>
                        </div>
                    </div>
                </div>
            </div>
            <h4 class="google-consent-mode-header"><?php esc_html_e('Regional Settings', 'CookieScript'); ?></h4>
            <div id="accordion">
                <?php $this->render_regional_settings(); ?>
            </div>
            <div class="panel-footer">
                <button class="CookieScript__button-secondary" type="button" id="add-region"
                        onclick="addRegion()">
                    <img src="<?php echo $imageUrls["add-icon.svg"]; ?>" alt="Add Icon">
                    <?php esc_html_e('Add new region', 'CookieScript'); ?>
                </button>
                <?php if ($displaySaveButton) { ?>
                    <button type="submit" name="submit" class="CookieScript__button-success">
                        <img src="<?php echo $imageUrls["save-icon.svg"]; ?>" alt="Save Icon">
                        Save settings
                    </button>
                <?php } ?>
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
                <h5><?php esc_html_e('Region: ', 'CookieScript'); ?><?php echo esc_html($region['region_code']); ?></h5>
                <button class="CookieScript__button-remove" type="button"
                        onclick="removeRegion(this)">
                    <img src="<?php echo $imageUrls["delete-icon.svg"]; ?>" alt="Delete Icon">
                    <?php esc_html_e('DELETE REGION', 'CookieScript'); ?>
                </button>
            </div>
            <div class="gcm-setting form-wrapper">
                <div class="google-consent-mode-values-wrapper">
                    <div class="google-consent-mode-values">
                        <div class="form-group">
                            <label class="control-label col-lg-4"><?php esc_html_e('Region Code', 'CookieScript'); ?></label>
                            <div class="col-lg-2">
                                <input type="text"
                                       name="consent_settings[regional][<?php echo esc_attr($index); ?>][region_code]"
                                       value="<?php echo $region["region_code"]; ?>" size="5"/>
                            </div>
                        </div>
	                    <?php
                            $this->render_google_consent_select( "regional", "ad_storage", 'Advertisement Cookies', $region["ad_storage"], $index );
                            $this->render_google_consent_select( "regional", "analytics_storage", 'Analytics Cookies', $region["analytics_storage"], $index );
                            $this->render_google_consent_select( "regional", "ad_user_data", 'Advertisement User Data', $region["ad_user_data"], $index );
                            $this->render_google_consent_select( "regional", "ad_personalization", 'Advertisement Personalization', $region["ad_personalization"], $index );
	                    ?>
                    </div>
                    <div class="google-consent-mode-values">
                        <?php
                            $this->render_google_consent_select("regional", "functionality_storage", 'Functional Cookies', $region["functionality_storage"], $index);
                            $this->render_google_consent_select("regional", "personalization_storage", 'Personalization Cookies', $region["personalization_storage"], $index);
                            $this->render_google_consent_select("regional", "security_storage", 'Security Cookies', $region["security_storage"], $index);
                        ?>
                        <div class="form-group">
                            <label class="control-label col-lg-4"><?php esc_html_e('Wait for update', 'CookieScript'); ?></label>
                            <div class="col-lg-2">
                                <input onchange="inputWfuValidation(this)" type="text"
                                       name="consent_settings[regional][<?php echo esc_attr($index); ?>][wait_for_update]"
                                       value="<?php echo esc_attr($region['wait_for_update']); ?>" size="5"/>
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

	public function validate_positive_integer($value) {
		if (is_numeric($value) && is_int(0 + $value) && $value > 0) {
			return true;
		}

		return false;
	}

    public function display_google_consent_script_front($consentModeSettings)
    {
        if (!is_null($consentModeSettings) && !empty($consentModeSettings)) {
            echo "<script>
                window.dataLayer = window.dataLayer || [];
                window.gtag = window.gtag || function () {
                    dataLayer.push(arguments)
                };

                gtag('set', 'developer_id.dMmY1Mm', true);
                gtag('set', 'ads_data_redaction', true);

                gtag('consent', 'default', {
                    ad_storage: '{$consentModeSettings['global']['ad_storage']}',
                    analytics_storage: '{$consentModeSettings['global']['analytics_storage']}',
                    ad_user_data: '{$consentModeSettings['global']['ad_user_data']}',
                    ad_personalization: '{$consentModeSettings['global']['ad_personalization']}',
                    functionality_storage: '{$consentModeSettings['global']['functionality_storage']}',
                    personalization_storage: '{$consentModeSettings['global']['personalization_storage']}',
                    security_storage: '{$consentModeSettings['global']['security_storage']}',
                    wait_for_update: {$consentModeSettings['global']['wait_for_update']}
                })";

            if (!is_null($consentModeSettings['regional']) && !empty($consentModeSettings['regional'])) {
                foreach ($consentModeSettings['regional'] as $region) {
                    $encodedRegionCode = json_encode(array_map('trim', explode(',', $region['region_code'])));

                    echo "
                        
                gtag('consent', 'default', {
                    ad_storage: '{$region['ad_storage']}',
                    analytics_storage: '{$region['analytics_storage']}',
                    ad_user_data: '{$region['ad_user_data']}',
                    ad_personalization: '{$region['ad_personalization']}',
                    functionality_storage: '{$region['functionality_storage']}',
                    personalization_storage: '{$region['personalization_storage']}',
                    security_storage: '{$region['security_storage']}',
                    wait_for_update: '{$region['wait_for_update']}',
                    region:  JSON.parse('{$encodedRegionCode}'.replace(/&quot;/g, '\"'))
                })";
                }
            }

            echo "</script>";
        } else {
            echo "";
        }
    }

    private function render_google_consent_select($scope, $name, $label, $settings, $value = null)
    {
        ?>
        <div class="form-group">
            <label class="control-label col-lg-4"><?php echo esc_html($label); ?></label>
            <div class="col-lg-2">
                <select name="consent_settings[<?php echo $scope; ?>]<?php echo $value !== null ? '[' . $value . ']' : ''; ?>[<?php echo $name; ?>]"
                        id="<?php echo $value . '-' . $name; ?>">
                    <option value="granted" <?php selected($settings, 'granted'); ?>><?php esc_html_e('Granted', 'CookieScript'); ?></option>
                    <option value="denied" <?php selected($settings, 'denied'); ?>><?php esc_html_e('Denied', 'CookieScript'); ?></option>
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
}
