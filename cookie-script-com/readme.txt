=== Cookie-Script.com ===
Contributors: cookiescriptcom
Tags: gdpr, cookie, compliance, cookiescript, consent
Requires at least: 5.6
Tested up to: 6.9
Stable tag: 1.4.3
Requires PHP: 5.6
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Cookie-Script.com WordPress plugin.

== Description ==
<strong>CookieScript</strong> helps your WordPress site meet privacy requirements like <strong>GDPR, CPRA, PIPEDA</strong> and more. It adds a cookie banner to your site—no need to edit files or write any code yourself.

You can use it right after installing, <strong>even without a CookieScript account</strong>. Later on, if you want to adjust how the banner looks or behaves, you can link an account to unlock more options.

The plugin works with <strong>Google Consent Mode v2</strong> and the <strong>WP Consent API</strong>, and can <strong>block third-party cookies</strong> until a visitor gives permission. It keeps your site compliant without interfering with tools like Google Analytics or ads.

More details are available at <a href="https://cookie-script.com/" target="_blank">cookie-script.com</a>.

== External services ==

This plugin utilizes Cookie-Script.com services to function.

**1. Cookie-Script.com API**
*   **Service:** Scans your website for cookies and retrieves configuration/status.
*   **Data Sent:** Website URL, Privacy Policy URL, Language preference, and a unique scan identifier.
*   **When:** During manual scan initiation via the plugin settings.
*   **Privacy Policy:** https://cookie-script.com/legal/privacy-policy
*   **Terms of Service:** https://cookie-script.com/legal/terms-and-conditions

**2. Cookie-Script.com CDN**
*   **Service:** Delivers the JavaScript file for the cookie banner (for "With Account" mode).
*   **Data Sent:** Standard web request data (IP address, User Agent) when fetching the script.
*   **When:** On every page load where the banner is active.
*   **Privacy Policy:** https://cookie-script.com/legal/privacy-policy

== Frequently Asked Questions ==
<strong>What does this plugin actually do?</strong>

It adds your CookieScript banner code to your site automatically. You won’t need to change any template files or figure out where scripts should go.

<strong>How do I set it up?</strong>

Just install and activate the plugin. That’s all it takes—the default CookieScript banner will appear on your site right away. No coding experience needed.

Click <a href="https://www.youtube.com/watch?v=iDhi-1SYBTM" target="_blank">here</a> for more detailed instructions!

<strong>Is Google Consent Mode supported?</strong>

Yes. CookieScript includes support for Google Consent Mode v2, so your site can continue collecting analytics and serving ads—while still respecting visitors’ choices. You’ll find the option in your CookieScript dashboard.

<strong>Can it work with the WP Consent API?</strong>

It can. If your site uses other plugins that rely on the WordPress Consent API, they’ll be able to read the same consent choices shared by CookieScript.

<strong>What about third-party cookies - can it block those?</strong>

Yes. Once you configure your banner in the CookieScript dashboard, it can prevent third-party scripts from running until users agree to it.

<strong>Where can I get support?</strong>

If you need a hand, you’ll find helpful articles, setup guides, and quick instruction videos right <a href="https://help.cookie-script.com/en" target="_blank">here</a>.


== Screenshots ==
1. Cookie-Script.com plugin settings page

== Changelog ==
1.4.3 - Wordpress rules fixes. Tested on WordPress 6.9
1.4.2 - Wordpress rules fixes. Tested on WordPress 6.9
1.4.1 - Wordpress rules fixes. Tested on WordPress 6.9
1.4.0 - Major security update. Tested on WordPress 6.8.3.
1.3.0 - Tested on a WordPress 6.8.2 version. Works as intended.
1.2.4 - Tested on a WordPress 6.8.2 version. Works as intended.
1.2.3 - Tested on a WordPress 6.8.1 version. Works as intended.
1.2.2 - Security fixes.
1.2.1 - Tested on a WordPress 6.8.1 version. Works as intended.
1.2.0 - Tested on a WordPress 6.8.1 version. Works as intended.
1.1.4 - Tested on a WordPress 6.6.2 version. Works as intended.
1.1.3 - Tested on a WordPress 6.5.5 version. Works as intended.
1.1.2 - Tested on a WordPress 6.5.4 version. Works as intended.
1.1.1 - Tested on a WordPress 6.5.4 version. Works as intended.
1.0.4 - Tested on a WordPress 6.5.2 version. Works as intended.
1.0.3 - Tested on a WordPress 6.5.2 version. Works as intended.
1.0.2 - Tested on a WordPress 6.5.2 version. Works as intended.
1.0.1 - Tested on a WordPress 6.5.2 version. Works as intended.
1.0 - Tested on a WordPress 6.5.2 version. Works as intended.
0.7 - Tested on a WordPress 6.2 version. Works as intended.
0.6 - Tested on a WordPress 6.1 version. Works as intended.
0.5 - Tested on a WordPress 5.8 version. Works as intended.
0.4 - Tested on a WordPress 5.7 version. Works as intended.
0.3 - Tested on a WordPress 5.6 version. Works as intended.
0.2 - Tested on a WordPress 5.0 version. Works as intended.
0.1 - Initial release

== == == == == == == == == == == == == == == == == == == == == == == == == == == ==
