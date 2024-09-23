(function () {
	jQuery(document).ready(function ( $ ) {

		const minSrcLength = 59
		let that,
				url,
				itemId = $("#cookie_script_item_id").val(),
				srcUrl = $("#cookie_script_item_src").val()

		$("#cookie_script_item_src").change("change keydown keyup click", function () {
			that = $(this),
					itemId = $(this).val(),
					url = srcUrl

			if (itemId.length >= minSrcLength) {
				that.removeClass("CookieScript--error").addClass("CookieScript--success")
			} else {
				that.removeClass("CookieScript--success").addClass("CookieScript--error")
			}
		})
	})
})()

jQuery(document).ready(function ( $ ) {
	let openModalButton = $("#scan-website-button")
	let scanWebsite = $("#scan-website")

	scanning()
	finishedScanning()
	scannerInformation()
	removeFlashMessage()

	if (getCookie("isScanning") === "scanning") {
		checkScanStatus()
	}

	openModalButton.on("click", function () {
		scannerInformation()
	})

	scanWebsite.on("click", function ( e ) {
		e.preventDefault()

		checkScanStatus()
		startScanWebsite()
		tb_remove()
	})

	function removeFlashMessage() {
		setTimeout(function () {
			let message = $("#flash-message-wrapper")
			if (message) {
				message.fadeOut("slow")
			}
		}, 3000)
	}

	function finishedScanning( shouldReload ) {
		if (getCookie("isScanning") === "") {
			$("#cookie_script_user_web").attr("disabled", false)
			openModalButton.css("display", "inline-block")
			$("#scanning-website").css("display", "none")

			if (shouldReload) {
				location.reload()
			}
		}
	}

	function scanning() {
		if (getCookie("isScanning") === "scanning") {
			$("#cookie_script_user_web").attr("disabled", true)
			openModalButton.css("display", "none")
			$("#scanning-website").css("display", "flex")
		}
	}

	function checkScanStatus() {
		$.ajax({
			type: "POST",
			url: ajaxRequest.ajax_url,
			data: {
				action: "cookie_script_check_scan_status_callback",
				nonce: ajaxRequest.nonce,
			},
			success: function ( response ) {
				if (response === "finish") {
					finishedScanning(true)
				}

				if (response === "progress" || response === "analyze") {
					setTimeout(() => {
						checkScanStatus()
					}, 5000);
					scanning()
				}
			},
			error: function ( jqXHR, textStatus, errorThrown ) {
				console.error("Error:", textStatus, ", Message:", errorThrown)
			}
		})
	}

	function startScanWebsite() {
		let url = $("#modal-form input[name='cookie_script_policy_url']").val()
		let language = $("#modal-form select[name='cookie_script_select_language']").val()

		$.ajax({
			type: "POST",
			url: ajaxRequest.ajax_url,
			data: {
				action: "cookie_script_start_scan",
				nonce: ajaxRequest.nonce,
				url: url,
				language: language,
			},
			success: function () {
				checkScanStatus()
			},
			error: function ( jqXHR, textStatus, errorThrown ) {
				console.error("Error:", textStatus, ", Message:", errorThrown)
			}
		})
	}

	function scannerInformation() {
		$.ajax({
			type: "GET",
			url: ajaxRequest.ajax_url,
			data: {
				action: "cookie_script_get_scanner_status",
				nonce: ajaxRequest.nonce,
			},
			success: function ( response ) {
				let res = JSON.parse(response)

				if (res.error !== null) {
					openModalButton.on("click", function () {
						$("#CookieScript-message")
								.addClass("CookieScript__error")
								.text(res.error)
								.show()
								.delay(3000)
								.fadeOut("slow", function () {
									$(this)
											.removeClass("CookieScript__error")
											.text("")
								})
					})
				} else {
					openModalButton.on("click", function () {
						$("#thickbox").click()
					});
				}
			},
			error: function ( jqXHR, textStatus, errorThrown ) {
				console.error("Error:", textStatus, ", Message:", errorThrown)
			}
		})
	}

	function getCookie( name ) {
		let cookieArray = document.cookie.split(";")

		for (let i = 0; i < cookieArray.length; i++) {
			let cookie = cookieArray[i]

			while (cookie.charAt(0) === " ") {
				cookie = cookie.substring(1)
			}

			if (cookie.indexOf(name + "=") === 0) {
				return cookie.substring(name.length + 1)
			}
		}
		return ""
	}
})

jQuery(document).ready(function ( $ ) {
	let languages = [
		{ "value": "ar", "flag": flags.assetsPath + "img/flags/AR.svg", "language": "Arabic" },
		{ "value": "eu", "flag": flags.assetsPath + "img/flags/EU.svg", "language": "Basque" },
		{ "value": "bg", "flag": flags.assetsPath + "img/flags/BG.svg", "language": "Bulgarian" },
		{ "value": "ca", "flag": flags.assetsPath + "img/flags/CA.svg", "language": "Catalan" },
		{ "value": "hr", "flag": flags.assetsPath + "img/flags/HR.svg", "language": "Croatian" },
		{ "value": "cs", "flag": flags.assetsPath + "img/flags/CS.svg", "language": "Czech" },
		{ "value": "da", "flag": flags.assetsPath + "img/flags/DA.svg", "language": "Danish" },
		{ "value": "nl", "flag": flags.assetsPath + "img/flags/NL.svg", "language": "Dutch" },
		{ "value": "en", "flag": flags.assetsPath + "img/flags/EN.svg", "language": "English" },
		{ "value": "et", "flag": flags.assetsPath + "img/flags/ET.svg", "language": "Estonian" },
		{ "value": "fi", "flag": flags.assetsPath + "img/flags/FI.svg", "language": "Finnish" },
		{ "value": "fr", "flag": flags.assetsPath + "img/flags/FR.svg", "language": "French" },
		{ "value": "de", "flag": flags.assetsPath + "img/flags/DE.svg", "language": "German" },
		{ "value": "el", "flag": flags.assetsPath + "img/flags/EL.svg", "language": "Greek" },
		{ "value": "hi", "flag": flags.assetsPath + "img/flags/HI.svg", "language": "Hindi" },
		{ "value": "hu", "flag": flags.assetsPath + "img/flags/HU.svg", "language": "Hungarian" },
		{ "value": "ga", "flag": flags.assetsPath + "img/flags/GA.svg", "language": "Irish" },
		{ "value": "it", "flag": flags.assetsPath + "img/flags/IT.svg", "language": "Italian" },
		{ "value": "lv", "flag": flags.assetsPath + "img/flags/LV.svg", "language": "Latvian" },
		{ "value": "lt", "flag": flags.assetsPath + "img/flags/LT.svg", "language": "Lithuanian" },
		{ "value": "mt", "flag": flags.assetsPath + "img/flags/MT.svg", "language": "Maltese" },
		{ "value": "no", "flag": flags.assetsPath + "img/flags/NO.svg", "language": "Norwegian" },
		{ "value": "pl", "flag": flags.assetsPath + "img/flags/PL.svg", "language": "Polish" },
		{ "value": "pt", "flag": flags.assetsPath + "img/flags/PT.svg", "language": "Portuguese" },
		{ "value": "ro", "flag": flags.assetsPath + "img/flags/RO.svg", "language": "Romanian" },
		{ "value": "ru", "flag": flags.assetsPath + "img/flags/RU.svg", "language": "Russian" },
		{ "value": "sk", "flag": flags.assetsPath + "img/flags/SK.svg", "language": "Slovak" },
		{ "value": "sl", "flag": flags.assetsPath + "img/flags/SL.svg", "language": "Slovenian" },
		{ "value": "es", "flag": flags.assetsPath + "img/flags/ES.svg", "language": "Spanish" },
		{ "value": "sv", "flag": flags.assetsPath + "img/flags/SV.svg", "language": "Swedish" },
		{ "value": "th", "flag": flags.assetsPath + "img/flags/TH.svg", "language": "Thai" },
		{ "value": "tr", "flag": flags.assetsPath + "img/flags/TR.svg", "language": "Turkish" },
		{ "value": "uk", "flag": flags.assetsPath + "img/flags/UK.svg", "language": "Ukrainian" },
		{ "value": "vi", "flag": flags.assetsPath + "img/flags/VI.svg", "language": "Vietnamese" },
	]

	for (let language of languages) {
		let option = new Option(language.language, language.value, false, false);
		$("#cookie_script_select_language").append(option);
	}

	function formatCountry( language ) {
		if (!language.id) {
			return language.text
		}

		let languageObj = languages.find(c => c.value === language.id)

		return $('<span class="lang-container"><img src="' + languageObj.flag + '" class="img-flag" width="20"  alt="Language"/> ' + languageObj.language + "</span>")
	}

	$("#cookie_script_select_language").val(lang.bannerLanguage);

	$("#cookie_script_select_language").select2({
		placeholder: "Select language",
		templateResult: formatCountry,
		templateSelection: formatCountry,
	})

	$("#cookie_script_select_language").trigger('change');

	$("#cookie_script_select_language").on("select2:open", function () {
		$(".select2-dropdown").css("top", "-10px")
		$(".select2-dropdown").css("left", "-1.571px")
	})

	function inputWfuValidation(input) {
		input.value = input.value.replace(/\D/g, "")
	}

	$("#enable_google_consent_mode").on("change", function () {
		let consentSettings = $("#google-consent-settings");
		let saveButton = $("#top-gtm-save-button");

		if (this.checked) {
			consentSettings.show();
			saveButton.hide();
		} else {
			consentSettings.hide();
			saveButton.show();
		}
	});

	$(window).on('load', function() {
		if ($("#enable_google_consent_mode").is(":checked")) {
			$("#top-gtm-save-button").hide();
		} else {
			$("#top-gtm-save-button").show();
		}
	});

	window.addRegion = function () {
		let accordion = $("#accordion");
		let newRegionIndex = accordion.children().length;
		let newRegionHtml = `
        <div class="regional-setting">
            <hr>
            <div class="region-settings">
                <h5>New region</h5>
                <button class="CookieScript__button-remove" type="button" onclick="removeRegion(this)">
                    DELETE REGION                
                </button>
            </div>
            <div class="gcm-setting form-wrapper">
                <div class="google-consent-mode-values-wrapper">
                    <div class="google-consent-mode-values">
                        <div class="form-group">
                            <label class="control-label col-lg-4">Region Code</label>
                            <div class="col-lg-2">
                                <input type="text" name="consent_settings[regional][${newRegionIndex}][region_code]" value="" size="5" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-lg-4">Advertisement Cookies</label>
                            <div class="col-lg-2">
                                <select name="consent_settings[regional][${newRegionIndex}][ad_storage]">
                                    <option value="granted">Granted</option>
                                    <option value="denied" selected>Denied</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-lg-4">Analytics Cookies</label>
                            <div class="col-lg-2">
                                <select name="consent_settings[regional][${newRegionIndex}][analytics_storage]">
                                    <option value="granted">Granted</option>
                                    <option value="denied" selected>Denied</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-lg-4">Advertisement User Data</label>
                            <div class="col-lg-2">
                                <select name="consent_settings[regional][${newRegionIndex}][ad_user_data]">
                                    <option value="granted">Granted</option>
                                    <option value="denied" selected>Denied</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-lg-4">Advertisement Personalization</label>
                            <div class="col-lg-2">
                                <select name="consent_settings[regional][${newRegionIndex}][ad_personalization]">
                                    <option value="granted">Granted</option>
                                    <option value="denied" selected>Denied</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="google-consent-mode-values">
                        <div class="form-group">
                            <label class="control-label col-lg-4">Functional Cookies</label>
                            <div class="col-lg-2">
                                <select name="consent_settings[regional][${newRegionIndex}][functionality_storage]">
                                    <option value="granted">Granted</option>
                                    <option value="denied" selected>Denied</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-lg-4">Personalization Cookies</label>
                            <div class="col-lg-2">
                                <select name="consent_settings[regional][${newRegionIndex}][personalization_storage]">
                                    <option value="granted">Granted</option>
                                    <option value="denied" selected>Denied</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-lg-4">Security Cookies</label>
                            <div class="col-lg-2">
                                <select name="consent_settings[regional][${newRegionIndex}][security_storage]">
                                    <option value="granted">Granted</option>
                                    <option value="denied" selected>Denied</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-lg-4">Wait for update</label>
                            <div class="col-lg-2">
                                <input onchange="inputWfuValidation(this)" type="text" name="consent_settings[regional][${newRegionIndex}][wait_for_update]" value="500" size="5" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
		accordion.append(newRegionHtml);
	}

	window.removeRegion = function (button) {
		$(button).closest(".regional-setting").remove();
	}


	window.removeRegion = function (button) {
		$(button).closest(".regional-setting").remove();
	}
})
