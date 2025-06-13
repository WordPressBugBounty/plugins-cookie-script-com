(function () {
  const allAPICats = ["functional", "statistics", "marketing", "preferences"]

  function wpInitConsent() {
    if (window.wpConsentData && wpConsentData.consents) {
      const saved = wpConsentData.consents

      wp_set_consent("functional", saved["functional-cookies"] || "deny");
      wp_set_consent("statistics", saved["statistics-cookies"] || "deny");
      wp_set_consent("marketing", saved["marketing-cookies"] || "deny");
      wp_set_consent("preferences", saved["preferences-cookies"] || "deny");
    }
  }

  function consentWithoutCategories() {
      CookieScript.instance.onAcceptAll = function() {
        wp_set_consent("functional", "allow");
        wp_set_consent("statistics", "allow");
        wp_set_consent("marketing", "allow");
        wp_set_consent("preferences", "allow");
      };

      CookieScript.instance.onAccept = function(categories) {
        wp_set_consent("functional", "allow");
        wp_set_consent("statistics", "allow");
        wp_set_consent("marketing", "allow");
        wp_set_consent("preferences", "allow");
      };

      CookieScript.instance.onReject = function() {
        wp_set_consent("functional", "deny");
        wp_set_consent("statistics", "deny");
        wp_set_consent("marketing", "deny");
        wp_set_consent("preferences", "deny");
      };
  }

  function clearConsentCookies() {
    allAPICats.forEach(cat => {
      const name = "wp_consent_" + cat
      document.cookie = name + "=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    })
  }

  if (typeof CookieScript === "undefined") {
    window.wp_consent_type = "optin"
    document.dispatchEvent(new CustomEvent("wp_consent_type_defined"))

    if (typeof wp_set_consent === "function") {
      allAPICats.forEach(cat => wp_set_consent(cat, "deny"))
    }

    clearConsentCookies()

    return
  }

  window.wp_consent_type = "optin"
  document.dispatchEvent(new CustomEvent("wp_consent_type_defined"))

  const mapCsCat = {
    strict: "functional",
    performance: "statistics",
    targeting: "marketing",
    functionality: "preferences",
    unclassified: "preferences"
  }

  function syncConsent() {
    if (typeof wp_set_consent !== "function") return
    const csCats = CookieScript.instance.currentState().categories ?? []
    const mapCats = csCats.map(cat => mapCsCat[cat])
    const consentAction = CookieScript.instance.currentState().action

    if (!consentAction) {
      wpInitConsent()

      return
    }

    if (mapCats.length === 0) {
      consentWithoutCategories()
      
      return
    }

    wp_set_consent("functional", "allow");

    ["statistics", "marketing", "preferences"].forEach(apiCat => {
      if (mapCats.includes(apiCat)) {
        wp_set_consent(apiCat, "allow")
      } else {
        wp_set_consent(apiCat, "deny")
      }
    })
  }

  ["DOMContentLoaded", "CookieScriptLoaded", "CookieScriptAccept", "CookieScriptReject", "CookieScriptAcceptAll", "CookieScriptRejectAll"]
    .forEach(evt => document.addEventListener(evt, syncConsent))

  document.addEventListener("wp_listen_for_consent_change", syncConsent)
})()
