//Polyfill for querySelectorAll and querySelector for IE6,IE7
/*@cc_on
document.querySelectorAll||(document.querySelectorAll=function(e){var t,n=document.createElement('style'),o=[];for(document.documentElement.firstChild.appendChild(n),document._qsa=[],n.styleSheet.cssText=e+'{x-qsa:expression(document._qsa && document._qsa.push(this))}',window.scrollBy(0,0),n.parentNode.removeChild(n);document._qsa.length;)(t=document._qsa.shift()).style.removeAttribute('x-qsa'),o.push(t);return document._qsa=null,o}),document.querySelector||(document.querySelector=function(e){var t=document.querySelectorAll(e);return t.length?t[0]:null});
@*/
//Polyfill for classList old browser
!function(){var e=function(e){return e.replace(/^\s+|\s+$/g,"")},t=function(e){return new RegExp("(^|\\s+)"+e+"(\\s+|$)")},n=function(e,t,n){for(var s=0;s<e.length;s++)t.call(n,e[s])};function s(e){this.element=e}s.prototype={add:function(){n(arguments,function(t){this.contains(t)||(this.element.className=e(this.element.className+" "+t))},this)},remove:function(){n(arguments,function(n){this.element.className=e(this.element.className.replace(t(n)," "))},this)},toggle:function(e){return this.contains(e)?(this.remove(e),!1):(this.add(e),!0)},contains:function(e){return t(e).test(this.element.className)},item:function(e){return this.element.className.split(/\s+/)[e]||null},replace:function(e,t){this.remove(e),this.add(t)}},"classList"in Element.prototype||Object.defineProperty(Element.prototype,"classList",{get:function(){return new s(this)}}),window.DOMTokenList&&!DOMTokenList.prototype.replace&&(DOMTokenList.prototype.replace=s.prototype.replace)}();
//Polyfill for array indexOf
Array.prototype.indexOf||(Array.prototype.indexOf=function(r,t){"use strict";var e;if(null==this)throw new TypeError('"this" is null or not defined');var n=Object(this),i=n.length>>>0;if(0===i)return-1;var o=0|t;if(o>=i)return-1;for(e=Math.max(o>=0?o:i-Math.abs(o),0);e<i;e++)if(e in n&&n[e]===r)return e;return-1});

if(!window.CookieScriptData) {
  window.CookieScriptData = {
    useGoogleTemplate: false,
    isVerifyGoogleConsentMode: false,
  };
}

if(!(!!window.CookieScript && !!window.CookieScript.instance)) {
  window.CookieScript = function () {
    this.version = 20240422;
    this.initTime = null;
    this.saveTime = '2025-06-06 11:56:39';
    this.consentTime = 1718713572;

    this.onAcceptAll = function () {
    }

    this.onAccept = function () {
    }

    this.onReject = function () {
    }

    this.onClose = function () {
    }

    
    var _onChangeIABCategoryMap = { core: null, other: null };
    function setOnChangeIABCategoryMap(value) {
      if(typeof value === 'function') {
        _onChangeIABCategoryMap.other = value;
      } else if(typeof value === 'object') {
        if(value.core) {
          _onChangeIABCategoryMap.core = value.fn;
        }
      }
    }

    Object.defineProperties(this, {
      onChangeIABCategoryMap: { set: setOnChangeIABCategoryMap, enumerable: false, configurable: false },
    });

    function onChangeIABCategoryMap(value) {
      if(_onChangeIABCategoryMap.core && typeof _onChangeIABCategoryMap.core === 'function') {
        _onChangeIABCategoryMap.core(value);
      }

      if(_onChangeIABCategoryMap.other && typeof _onChangeIABCategoryMap.other === 'function') {
        _onChangeIABCategoryMap.other(value);
      }
    }

    this.currentState = function () {
      var data= {action: _readInnerCookieParam('action')};
      var key = _readInnerCookieParam('key');
      if (key) {
        data.key = key;
      }
          data.categories = _readCategoriesCheckboxesFromCookies();
          return data;
    }

    
    this.expireDays = function () {
      return expireDays;
    }

    this.hash = function () {
      return cookieId;
    }

    this.show = function () {
      _showBanner();
    }

    this.hide = function () {
      _hideBanner();
      _showBadge();
    }

    this.categories = function () {
      return allCategory;
    }

    
    this.getCookieValueForQueryArg = function () {
      var cookieName = _cookieConsentName()
      var value = _cookiesApi.get(cookieName);
      if (value) {
        return cookieName + '=' + encodeURIComponent(value);
      }
      return '';
    }

    
    this.dispatchEventNames = [];

    this.currentLang = null;

    this.iabCMP = null;
    this.tcString = undefined;
    this.googleAcString = undefined;

    this.getCMPId = function () {
      return Number(cmpId);
    }

    this.getIABSdkUrl = function () {
      return iabSdkUrl;
    }

    this.getIABVendorsIds = function () {
      return iabVendorsIds;
    }

    this.getGoogleVendorsIds = function () {
      return googleVendorsIds;
    }

    this.getIABLegIntPurposes = function () {
      return iabLegIntPurposes;
    }

    this.iabDisabledGdprAppliesStatus = function () {
      return Boolean();
    }

    this.isCheckedIABCategoryMap = function () {
          return false;
        }

    this.IABEnableAdvertiserConsentMode = function () {
              return false;
          }

    this.IABEnabledIgnoreDecline = Boolean()

    this.getIABText = function () {
      return iabText;
    }

    this.getIABTextTranslations = function () {
      return iabTextTranslations;
    }

    this.showIABSpecificTab = function (tabType) {
          return false;
        }

    
    this.setCMPCookie = function (value) {
      this.tcString = value;
      _writeInnerCookieParam('CMP', value);
    }

    this.getCMPCookie = function () {
      var value = _readInnerCookieParam('CMP');
      this.tcString = value;
      return value;
    }

    this.setGoogleACStringCookie = function (value) {
      this.googleAcString = value;
      _writeInnerCookieParam('GoogleACString', value);
    }

    this.getGoogleACStringCookie = function () {
      var value = _readInnerCookieParam('GoogleACString');
      this.googleAcString = value;
      return value
    }

    
    this.forceDispatchCSLoadEvent = function () {
      _dispatchCustomEvent('CookieScriptLoaded');
    }

    this.applyTranslation = function (nodeScope) {
      _applyTranslation(nodeScope);
    }

    this.applyCurrentCookiesState = function () {
      _applyCurrentCookiesState()
    }

    this.applyTranslationByCode = function (code, options) {
      _applyTranslationByCodeLang(code, options);
    }

    this.acceptAllAction = function () {
      _setAllCheckboxesValue(true);
          _hideBanner();
    
          _acceptAllAction();
        }

    this.acceptAction = function (outerCategories, loadGPC) {
              var allowCategory;
      if (typeof outerCategories === 'undefined') {
        allowCategory = _readCategoriesCheckboxesFromUI();
        _setReportPagesCheckboxes(allowCategory);
      } else {
        if (isPresentStrictly) {
          outerCategories.push('strict');
        }
        allowCategory = _uniqueArray(outerCategories);
        if(loadGPC === 'undefined') {
          _setCheckboxesByCategories(allowCategory);
        }
      }

              _hideBanner();
      
              _acceptAction(allowCategory, loadGPC);
      
            }

    this.rejectAllAction = function () {
      _setAllCheckboxesValue(false);
      _setReportPagesCheckboxes([]);

          _hideBanner();
    
          _rejectAllAction();
        }


    this.demoLoadView = function () {
          _log('Warning is real site script');
        }

    /* Private variable */
    var _this = this;
    var css = "\n    <style data-type=\"cookiescriptstyles\">\n      #cookiescript_injected {\r\n    background-color: #1C1C1C;\r\n    z-index: 999997;\r\n    opacity: 1;\r\n    font-size: 14px;\r\n    font-weight: normal;\r\n    font-family: 'Open Sans', Arial, 'Trebuchet MS', 'Segoe UI', 'Helvetica', sans-serif;\r\n    box-shadow: 1px 2px 8px 0 rgba(0, 0, 0, 0.35);\r\n    color: #FFFFFF;\r\n    box-sizing: border-box;\r\n}\r\n\r\n.cookiescript_overlay {\r\n    overflow: hidden;\r\n    height: 100vh;\r\n}\r\n\r\n.cookiescript_checkbox_label {\r\n    cursor: pointer;\r\n    display: flex;\r\n    align-items: center;\r\n    padding:0 4px;\r\n    line-height: 1.5;\r\n    margin:0;\r\n\ttext-align: left;\r\n}\r\n.cookiescript_pre_header {\r\n    display: flex;\r\n    justify-content: flex-end;\r\n    align-items: center;\r\n    position: absolute;\r\n    top: 15px;\r\n    right: 15px;\r\n}\r\n#cookiescript_close {\r\n    font-size: 29px;\r\n    line-height: 13px;\r\n    cursor: pointer;\r\n    color: #FFFFFF;\r\n    height: 15px;\r\n    width: 15px;\r\n    margin: 0 0 0 10px;\r\n    padding: 0;\r\n    overflow: hidden;\r\n    letter-spacing: 0;\r\n    font-family: 'Trebuchet MS', 'Arial', sans-serif;\r\n    font-weight: 100;\r\n    opacity: 0.85;\r\n    z-index: 999999;\r\n    position: relative;\r\n    top: -1px;\r\n}\r\n\r\n#cookiescript_buttons {\r\n    display: flex;\r\n    flex-direction: row;\r\n    font-weight: 700;\r\n}\r\n#cookiescript_manage_wrap {\r\n    text-transform: uppercase;\r\n    text-align: center;\r\n    font-size: 12px;\r\n    letter-spacing: 0.4px;\r\n    font-weight: 700;\r\n}\r\n#cookiescript_manage {\r\n    display: inline;\r\n    cursor: pointer;\r\n    color: #FFFFFF;\r\n    opacity:0.85;\r\n    margin-left:-15px;\r\n}\r\n#cookiescript_manage #cookiescript_manageicon .cookiescript_gear {\r\n    fill: #FFFFFF;\r\n}\r\n#cookiescript_manage:hover #cookiescript_manageicon .cookiescript_gear {\r\n    fill: #6BBE6B;;\r\n}\r\n\r\nsvg#cookiescript_manageicon {\r\n    width: 15px;\r\n    height: 15px;\r\n    display: inline;\r\n    margin: 0 5px 0 0;\r\n    padding: 0;\r\n    position: relative;\r\n    top: 3px;\r\n    vertical-align: baseline;\r\n}\r\n\r\n#cookiescript_header {\r\n    background-color: transparent;\r\n    z-index: 999998;\r\n    color: #FFFFFF;\r\n    font-size: 18px;\r\n    line-height: 1.3;\r\n    font-weight: 600;\r\n    letter-spacing: 0.4px;\r\n    opacity:1;\r\n}\r\n.cookiescript_checkbox {\r\n    display: flex;\r\n    flex-direction: row;\r\n}\r\ninput.cookiescript_checkbox_input {\r\n}\r\nspan.cookiescript_checkbox_text {\r\n    display: inline-block;\r\n    font-size: 12px;\r\n    margin: 0;\r\n    text-transform: uppercase;\r\n    font-weight: 600;\r\n    color: #FFFFFF;\r\n    letter-spacing: 1px;\r\n}\r\n\r\n#cookiescript_save {\r\n    border: 0;\r\n    transition: all 0.25s ease 0s;\r\n    background-color: #6BBE6B;\r\n    color: #FFFFFF;\r\n    text-transform: uppercase;\r\n    font-size: 12px;\r\n    text-align: center;\r\n    line-height: 3.2;\r\n    letter-spacing: 0.4px;\r\n}\r\n\/*IE 9 fixes*\/\r\n@media screen and (min-width:0\\0) and (min-resolution: .001dpcm) {\r\n    .cookiescript_checkbox_label {\r\n        position: relative;\r\n        top:-10px;\r\n    }\r\n    #cookiescript_accept, #cookiescript_reject, #cookiescript_save{\r\n    \tdisplay: inline-block;\r\n    }\r\n    #cookiescript_buttons{\r\n    \ttext-align:center;\r\n    }\r\n}\r\n#cookiescript_save{\r\n    display: none;\r\n}\r\n#cookiescript_reject {\r\n    border: 1px solid #FFFFFF;\r\n    text-align: center;\r\n    line-height: 3;\r\n    font-size: 12px;\r\n    text-transform: uppercase;\r\n    letter-spacing: 0.4px;\r\n    color: #FFFFFF;\r\n    background: #1C1C1C;\r\n}\r\n#cookiescript_accept {\r\n\ttransition: all 0.25s ease 0s;\r\n\ttext-transform: uppercase;\r\n\tfont-size: 12px;\r\n\ttext-align: center;\r\n\tletter-spacing: 0.4px;\r\n\tborder: 0;\r\n\tbackground-color: #6BBE6B;\r\n\tcolor: #FFFFFF;\r\n\tline-height: 3.2;\r\n}\r\n\r\n#cookiescript_accept, #cookiescript_reject, #cookiescript_save {\r\n    font-weight: 700;\r\n    cursor: pointer;\r\n    white-space: nowrap;\r\n    transition-duration: 100ms;\r\n    transition-timing-function: ease-in-out;\r\n    min-width: 103px;\r\n}\r\n.cookiescript_bigger {\r\n    transform: scale(1.1);\r\n}\r\n#cookiescript_link {\r\n    text-decoration: none;\r\n    color: #FFFFFF;\r\n    font-size: 11px;\r\n    text-align: center;\r\n    font-weight: 400;\r\n    text-transform: uppercase;\r\n    opacity: 0.8;\r\n\tdisplay:inline !important;\r\n}\r\n\r\n#cookiescript_readmore,\r\n#cookiescript_reportlink,\r\n#cookiescript_cookiescriptlink {\r\n    border: 0;\r\n    padding: 0;\r\n    cursor: pointer;\r\n    margin: 0;\r\n    transition: all 100ms ease 0s;\r\n    background-color: transparent;\r\n    display: inline;\r\n    font-size: 12px;\r\n    text-decoration: none;\r\n}\r\n\r\n#cookiescript_readmore,\r\n#cookiescript_description a{\r\n    color: #FFFFFF;\r\n}\r\n#cookiescript_reportlink,\r\n#cookiescript_cookiescriptlink {\r\n    color: #FFFFFF;\r\n}\r\n\r\n\r\n#cookiescript_readmore:hover,\r\n#cookiescript_reportlink:hover,\r\n#cookiescript_cookiescriptlink:hover,\r\n#cookiescript_description a:hover{\r\n    text-decoration: underline;\r\n    color: #FFFFFF;\r\n\r\n}\r\n\r\n#cookiescript_description {\r\n    color: #FFFFFF;\r\n    font-size: 12px;\r\n    letter-spacing: 0.3px;\r\n    line-height: 1.65;\r\n    font-weight: 400;\r\n}\r\n#cookiescript_checkboxs {\r\n}\r\n#cookiescript_close:hover,\r\n#cookiescript_manage:hover,\r\n#cookiescript_link:hover\r\n{\r\n    opacity: 1;\r\n}\r\n\r\n#cookiescript_reject:hover {\r\n    background-color: #2f2f2f;\r\n}\r\n\r\n#cookiescript_accept:hover{\r\n\tbackground-color: #63af63;\r\n}\r\n#cookiescript_save:hover {\r\n    background-color: #63af63;\r\n}\r\n\r\n#cookiescript_readmore:hover,\r\n#cookiescript_reportlink:hover,\r\n#cookiescript_cookiescriptlink:hover\r\n{\r\n    color: #63af63;\r\n}\r\n\r\n.cookiescript_globe {\r\n    fill:#1c1c1c;\r\n}\r\n\r\n\r\n.cookiescriptlogo {fill: #22b8f0;}\r\n\r\n#cookiescript_badge {\r\n    position: fixed;\r\n    line-height: 0;\r\n    cursor: pointer;\r\n    z-index: 99999;\r\n    font-size: 0;\r\n    color: #999;\r\nleft: 10px;\r\n    display: flex;\r\n    flex-direction: row;\r\n    opacity: 1;\r\n}\r\n\r\n#cookiescript_badgetext{\r\n    text-transform: uppercase;\r\n    font-weight: 600;\r\n    font-family: 'Open Sans', Arial, 'Trebuchet MS', 'Segoe UI', 'Helvetica', sans-serif;\r\n    overflow: hidden;\r\n    transition-duration: 500ms;\r\n    white-space: nowrap;\r\n    padding-right: 0;\r\n    color: #FFFFFF;\r\n}\r\n\r\n#cookiescript_badgesvg{\r\n    width:40px;\r\n    height: 40px;\r\n}\r\n\r\n\r\n\r\n#cookiescript_badge {\r\nbottom: 10px;\r\n    border-radius:25px;\r\n    padding:3px;\r\n    transition-duration: 500ms;\r\n    box-shadow: 1px 2px 8px 0 rgba(0, 0, 0, 0.2);\r\n    background: #1C1C1C;\r\n}\r\n#cookiescript_badge:hover #cookiescript_badgetext{\r\n    max-width: 300px;\r\n    padding-right: 15px;\r\n    padding-left: 12px;\r\n}\r\n#cookiescript_badgetext {\r\n    font-size: 16px;\r\n    line-height: 2.5;\r\n    max-width: 0;\r\n}\r\n#cookiescript_badgeimage {\r\n    width: 40px;\r\n    height: 40px;\r\n}\r\n@media only screen and (max-width: 414px) {\r\n    #cookiescript_badgeimage {\r\n        width: 30px;\r\n        height: 30px;\r\n    }\r\n    #cookiescript_badgesvg{\r\n        width:30px;\r\n        height: 30px;\r\n    }\r\n    #cookiescript_badgetext{\r\n        display: none;\r\n    }\r\n}\r\n\/*IE 9 fixes*\/\r\n@media screen and (min-width:0\\0) and (min-resolution: .001dpcm) {\r\n\t#cookiescript_badgeimage{\r\n    \tfloat:left;\r\n    }\r\n}\r\n\r\n@media print{\r\n    #cookiescript_injected{\r\n        display:none;\r\n    }\r\n}\r\n\r\n\r\n\r\n\n#cookiescript_injected_fsd {\n    position: fixed;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(17, 17, 17, 0.5) !important;\n    z-index: 999996;\n\toverflow-y: auto;\n}\n\n#cookiescript_fsd_wrapper {\n    \/*animation: expandBox 2s forwards;*\/\n    max-width: 950px;\n\twidth: 95%;\n    margin: 0 auto 3% auto;\n\ttop: 5%;\n    line-height: 18px;\n    letter-spacing: normal;\n    position: relative;\n    display: flex;\n    flex-direction: column;\n\tbackground-color: #f3f3f3;\n    z-index: 999997;\n    opacity: 1;\n    font-size: 14px;\n    font-weight: normal;\n    font-family: 'Open Sans', Arial, 'Trebuchet MS', 'Segoe UI', 'Helvetica', sans-serif;\n    box-shadow: 1px 2px 8px 0 rgba(0, 0, 0, 0.35);\n    color: #1C1C1C;\n    align-items: center;\n    overflow: visible;\n    outline: none;\n    max-height: 90%;\n    box-sizing: border-box;\n\tcursor: default;\n\tmin-height: 500px;\n}\n@keyframes expandBox {\n    from {\n        width: 10%;\n        margin-left:0;\n        overflow: hidden;\n        top:90%;\n        height: 5%;\n    }\n    to {\n        width: 95%;\n        margin-left:auto;\n        overflow: hidden;\n        top:5%;\n        height: 90%;\n    }\n}\n\n.cookiescript_fsd_header {\n\tmin-height: 57px;\n\tborder-bottom: 1px solid #e2e2e2;\n\twidth: 100%;\n\tdisplay: flex;\n\tflex-direction: row;\n\talign-items: center;\n\tbackground-color: #ffffff;\n}\n.cookiescript_fsd_logo_a{\n\tmargin-left: 23px;\n    text-decoration: none;\n}\n.cookiescript_fsd_logo{\n\theight: 27px;\n\twidth: auto;\n\tdisplay: block;\n\tmax-width: 100%;\n}\n.cookiescript_fsd_powered {\n    color: #666666;\n    font-size: 11px;\n    position: relative;\n    left: 31px;\n    top: 0;\n    line-height: 1;\n    text-decoration: none;\n    display: block;\n    height: 8px;\n}\n.cookiescript_fsd_language_drop_down {\n    position: absolute;\n    right: 67px;\n\ttop: 19px;\n}\n\n.cookiescript_fsd_main {\n    width: 100%;\n\tbackground-color: #ffffff;\n}\n\n.cookiescript_fsd_main_info {\n    padding: 20px 53px 30px 53px;\n    }\n\n.cookiescript_fsd_title {\n    background-color: transparent;\n    z-index: 999998;\n    color: #1C1C1C;\n    font-size: 24px;\n    line-height: 1.3;\n    font-weight: 700;\n    opacity:1;\n}\n\n.cookiescript_fsd_description {\n    color: #1C1C1C;\n    font-size: 14px;\n    line-height: 1.6;\n    font-weight: 400;\n\tmargin-top: 9px;\n}\n.cookiescript_fsd_description > span{\n    opacity: 0.85;\n}\n\n#cookiescript_fsd_wrapper #cookiescript_readmore{\n\tfont-size: 14px;\n\tcolor: #3fb6ee;\n\ttext-decoration: none;\n}\n#cookiescript_fsd_wrapper #cookiescript_readmore:hover{\n\ttext-decoration: underline;\n}\n\n.cookiescript_fsd_tabs {\n    display: flex;\n    justify-content: space-around;\n    align-items: stretch;\n\tflex-direction: row;\n    width: 100%;\n}\n\n.cookiescript_fsd_tabs > div {\n\tcursor: pointer;\n\twidth: 50%;\n\ttext-transform: uppercase;\n\tfont-size: 16px;\n\ttext-align: center;\n\tline-height: 1.6;\n\tfont-weight: bold;\n\tborder-top: 2px solid transparent;\n\ttransition: all 300ms ease 0s;\n\tpadding: 10px 20px;\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\tbackground-color: #ffffff;\n}\n\n.cookiescript_fsd_tabs > .cookiescript_active {\n    border-top: 2px solid #3fb6ee;\n    background-color: #f3f3f3;\n    color: #3fb6ee;\n}\n\n.cookiescript_fsd_tabs_content {\n    background-color: #f3f3f3;\n    padding: 5px 50px 10px 50px;\n    width: 100%;\n    overflow-y: auto;\n    box-sizing: border-box;\n    flex-grow: 1;\n\t--scrollbar-width: 8px;\n\t--mask-height: 35px;\n\t--mask-image-content: linear-gradient( to bottom, transparent, black var(--mask-height), black calc(100% - var(--mask-height)), transparent );\n\t--mask-size-content: calc(100% - var(--scrollbar-width)) 100%;\n\t--mask-image-scrollbar: linear-gradient(black, black);\n\t--mask-size-scrollbar: var(--scrollbar-width) 100%;\n\tmask-image: var(--mask-image-content), var(--mask-image-scrollbar);\n\tmask-size: var(--mask-size-content), var(--mask-size-scrollbar);\n\tmask-position: 0 0, 100% 0;\n\tmask-repeat: no-repeat, no-repeat;\n\t-webkit-mask-image: var(--mask-image-content), var(--mask-image-scrollbar);\n\t-webkit-mask-size: var(--mask-size-content), var(--mask-size-scrollbar);\n\t-webkit-mask-position: 0 0, 100% 0;\n\t-webkit-mask-repeat: no-repeat, no-repeat;\n}\n\n.cookiescript_fsd_tabs_content .cookiescript_hidden {\n    opacity: 0;\n    height: 0 !important;\n    overflow: hidden;\n\tpadding: 0 !important;\n\tmin-height: 0 !important;\n}\n\n.cookiescript_fsd_category {\n    border-bottom: 1px solid #e2e2e2;\n    padding-top: 23px;\n    padding-bottom: 17px;\n    display: flex;\n    flex-direction: column;\n}\n\n.cookiescript_fsd_category:last-child {\n    border-bottom: 0;\n}\n\n.cookiescript_fsd_category .cookiescript_hidden {\n    opacity: 0;\n\toverflow-y: auto;\n\toverflow-x: hidden;\n\tpadding: 0 !important;\n\tmax-height: 0;\n\tmargin: 0;\n\theight: auto !important;\n\t\ttransition: max-height 300ms ease 200ms, opacity ease 200ms, margin-top 100ms ease 100ms;\n\t}\n\n.cookiescript_fsd_category_main {\n    align-items: center;\n    display: flex;\n    justify-content: space-between;\n}\n\n.cookiescript_fsd_category_info {\n    flex: 9;\n    padding-right: 10px;\n}\n\n.cookiescript_fsd_category_control {\n    flex: 1;\n    display: flex;\n    justify-content: center;\n}\n\n.cookiescript_fsd__category_name {\n    font-size: 16px;\n    font-weight: 700;\n\tmargin-bottom: 6px;\n}\n\n.cookiescript_category_description {\n\tfont-size: 13px;\n\tpadding-bottom: 5px;\n\tline-height: 1.6;\n}\n\n.cookiescript_fsd_cookies {\n\tborder: 1px solid #e2e2e2;\n\tborder-radius: 10px;\n\toverflow-y: auto;\n\tmargin-top: 15px;\n\tmax-height: 222px;\n\t\ttransition: max-height 300ms ease, opacity 200ms ease 300ms, margin-top 100ms ease 100ms;\n\t}\n\n.cookiescript_fsd_cookies caption {\n    font-weight: 600;\n    padding: 10px;\n    text-align: left;\n    color: #1C1C1C;\n    caption-side: top;\n}\n\n\n.cookiescript_fsd_cookies_control {\n    color: #3fb6ee;\n    text-transform: uppercase;\n    font-size: 14px;\n    font-weight: 700;\n    position: relative;\n    display: flex;\n    align-items: center;\n    margin-right: auto;\n    margin-top: 10px;\n    cursor: pointer;\n}\n\n.cookiescript_fsd_cookies_control .cookiescript_hidden {\n    display: none;\n}\n\n.cookiescript_fsd_cookies_control  span{\n\tmargin-right: 7px;\n}\n\n.cookiescript_fsd_cookies_control svg {\n    width: 10px;\n    height: 10px;\n    font-size: 10px;\n}\n\n.cookiescript_fsd_cookies_control.active svg {\n    width: 10px;\n    height: 10px;\n    font-size: 10px;\n    transform: rotate(180deg);\n}\n\n.cookiescript_fsd_cookies_table {\n    width: 100%;\n}\n\n.cookiescript_fsd_cookies_table,\n.cookiescript_fsd_cookies_table tbody,\n.cookiescript_fsd_cookies_table thead,\n.cookiescript_fsd_cookies_table tr,\n.cookiescript_fsd_cookies_table th,\n.cookiescript_fsd_cookies_table td {\n    margin: 0;\n    padding: 0;\n    font: inherit;\n    vertical-align: baseline;\n    background-color: #ffffff;\n    border-spacing: 0;\n    border-collapse: collapse;\n}\n\n\n.cookiescript_fsd_cookies_table tr:last-child td{\n    border-bottom: 0;\n}\n\n.cookiescript_fsd_cookies_table td, .cookiescript_fsd_cookies_table th {\n    white-space: normal;\n    font-size: 13px;\n    text-align: left;\n    margin: 0;\n}\n.cookiescript_fsd_cookies_table th {\n\tfont-weight: 600;\n\tpadding: 8px 8px;\n\tline-height: 1.4;\n\tword-break: keep-all;\n\tvertical-align: middle;\n}\n\n.cookiescript_fsd_cookies_table td {\n\tpadding: 7px 8px;\n\tline-height: 1.6;\n\tvertical-align: top;\n\tfont-weight: 400;\n\tborder: 0;\n\tborder-top: 1px solid #e2e2e2;\n\tcolor: #1C1C1C;\n}\n\n.cookiescript_fsd_cookies_table th:last-child {\n    padding-right: 10px;\n}\n\n    .cookiescript_fsd_cookies_table td:nth-child(1), .cookiescript_fsd_cookies_table th:nth-child(1) {\n    padding-left: 15px;\n    word-break: normal;\n}\n\n.cookiescript_fsd_cookies_table td:nth-child(2) {\n    color: #3fb6ee;\n}\n\n.cookiescript_fsd_cookies_table td:nth-child(3), .cookiescript_fsd_cookies_table th:nth-child(3) {\n    text-align: center;\n}\n\n.cookiescript_fsd_cookies_table.cookiescript_fsd_storage_table td:nth-child(2) {\n     color: #1C1C1C;\n}\n\n.cookiescript_vendor_name a{\n\ttext-decoration: underline;\n\tfont-weight: bold;\n\tcolor: #3fb6ee;\n\tline-height: normal;\n\tborder: 0;\n\tpadding: 0;\n\tmargin: 0;\n\tbackground: transparent;\n\tfont-size: 13px;\n}\n.cookiescript_vendor_name a:hover {\n\ttext-decoration: underline;\n\tcolor: #3fb6ee;\n}\n.cookiescript_vendor_address {\n    margin-top: 10px;\n    font-style: italic;\n}\n.cookiescript_vendor_address > span {\n    font-weight: 600;\n    font-style: normal;\n}\n\n.cookiescript_fsd_footer {\n    border-top: 1px solid #e2e2e2;\n    width: 100%;\n\tbackground-color: #ffffff;\n    position: relative;\n}\n#cookiescript_fsd_wrapper #cookiescript_declarationwrap{\n\t\ttransition: opacity 200ms ease 0ms, height 0ms ease 200ms;\n\t}\n#cookiescript_fsd_wrapper #cookiescript_aboutwrap{\n\tfont-size: 13px;\n\tpadding: 23px 0;\n\tline-height: 1.6;\n\ttext-align: left;\n\tfont-weight: normal;\n\tbox-sizing: border-box;\n\ttransition: opacity 200ms ease 0ms;\n\toverflow: auto;\n\tmin-height: 181px;\n}\n#cookiescript_fsd_wrapper #cookiescript_aboutwrap a,\n#cookiescript_fsd_wrapper #cookiescript_aboutwrap a:hover{\n    color: #3fb6ee;\n    text-decoration: underline;\n}\n\n#cookiescript_setting_advertising_wrap {\n    font-size: 12px;\n}\n.cookiescript_cross_domain{\n    margin-top:10px;\n}\n#cookiescript_iab_type {\n    display: flex;\n    justify-content: center;\n    padding: 20px 0;\n    border-bottom: 1px solid #e2e2e2;\n    flex-wrap: wrap;\n}\n\n#cookiescript_iab_type > div {\n    cursor: pointer;\n    padding: 0 9px;\n    font-size: 11px;\n    font-weight: 600;\n    background: #f5f5f5;\n    color: #1C1C1C;\n    line-height: 2;\n    margin: 3px 5px;\n    white-space: nowrap;\n}\n\n#cookiescript_iab_type .cookiescript_active {\n    background: #3fb6ee;\n    color: #FEFEFE;\n}\n\n\n.cookiescript_fsd_cookies::-webkit-scrollbar-track,\n.cookiescript_fsd_tabs_content::-webkit-scrollbar-track {\n    background-color: #DADADA;\n}\n\n.cookiescript_fsd_cookies::-webkit-scrollbar,\n.cookiescript_fsd_tabs_content::-webkit-scrollbar {\n    width: 8px;\n    height: 8px;\n}\n\n.cookiescript_fsd_cookies::-webkit-scrollbar-thumb,\n.cookiescript_fsd_tabs_content::-webkit-scrollbar-thumb {\n    background-color: #6BBE6B;\n}\n\n\n\n@media screen and (min-width:0\\0) and (min-resolution: .001dpcm) {\n    #cookiescript_iab_type > div{\n        display:inline-block;\n    }\n}\n\n\/* --- OVERRIDE ----*\/\n\n#cookiescript_injected_fsd #cookiescript_close {\n\ttop: 20px;\n\tfont-size: 37px;\n\tright: 20px;\n\tcolor: #1C1C1C;\n\theight: 18px;\n\twidth: 18px;\n    position: absolute;\n    margin:0;\n}\n\n#cookiescript_injected_fsd #cookiescript_show_all_partners_button {\n    color: #3fb6ee;\n    margin-bottom: 0;\n    margin-top: 12px;\n    display: inline-block;\n}\n\n#cookiescript_injected_fsd #cookiescript_buttons {\n    justify-content: flex-start;\n    padding: 5px 15px;\n    margin: 0;\n}\n\n#cookiescript_injected_fsd #cookiescript_accept, #cookiescript_injected_fsd #cookiescript_save, #cookiescript_injected_fsd #cookiescript_reject {\n\t\tflex-grow: unset;\n\t\tpadding: 0px 25px;\n\tmargin: 10px 5px;\n\tfont-size: 13px;\n\tline-height: 3;\n}\n#cookiescript_injected_fsd #cookiescript_buttons{\n\tflex-direction: row;\n}\n#cookiescript_injected_fsd #cookiescript_buttons #cookiescript_reject {\n    margin-right: auto;\n}\n\n#cookiescript_injected_fsd .cookiescript-iab-itemContainer {\n    border: 1px solid #e2e2e2;\n\tbackground-color: #ffffff;\n\tpadding: 10px;\n}\n\n#cookiescript_injected_fsd .cookiescript-iab-header,\n#cookiescript_injected_fsd .cookiescript-iab-itemHeader,\n#cookiescript_injected_fsd .cookiescript-iab-itemHeaderAction {\n    color: #1C1C1C;\n}\n\n#cookiescript_injected_fsd .cookiescript-iab-itemHeaderAction {\n    border-color: #1C1C1C;\n}\n\n#cookiescript_injected_fsd #cookiescript_accept {\n    background-color: #ffffff;\n    color: #4d4d4d;\n    border: 1px solid #4d4d4d;\n    order: 1}\n\n#cookiescript_injected_fsd #cookiescript_accept:hover {\n    background-color: #ebebeb;\n}\n\n#cookiescript_injected_fsd #cookiescript_reject {\n    background-color: #ffffff;\n    color: #4d4d4d;\n    border: 1px solid #4d4d4d;\n    order: 2}\n\n#cookiescript_injected_fsd #cookiescript_reject:hover {\n    background-color: #ebebeb;\n}\n\n#cookiescript_injected_fsd #cookiescript_save {\n    display: inline-block;\n    background-color: #6BBE6B;\n    color: #ffffff;\n    border: 1px solid #6BBE6B;\n    order: 3}\n\n#cookiescript_injected_fsd #cookiescript_save:hover {\n    background-color: #63af63;\n}\n.cookiescript_fsd_reportby{\n    position: absolute;\n    bottom: -20px;\n    right: 20px;\n    color: #FFFFFF;\n    display: inline;\n    font-size: 13px;\n}\n#cookiescript_fsd_reportlink, #cookiescript_fsd_cookiescriptlink {\n    border: 0;\n    padding: 0;\n    cursor: pointer;\n    margin: 0;\n    transition: all 100ms ease 0s;\n    background-color: transparent;\n    color: #FFFFFF;\n    display: inline;\n    font-size: 13px;\n    text-decoration: underline;\n}\n\n\n\n\n\n\n\/*Switches color reload*\/\n#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:enabled .mdc-switch__handle::after {\n    background: #6BBE6B;\n}\n\n#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after {\n    background: #68b968;\n}\n\n#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:enabled:focus:not(:active) .mdc-switch__handle::after {\n    background: #68b968;\n}\n\n#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:enabled:active .mdc-switch__handle::after {\n    background: #68b968;\n}\n\n#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::before,\n#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::after{\n    background: #6BBE6B;\n}\n\n#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:enabled:focus .mdc-switch__ripple::before,\n#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:enabled:focus .mdc-switch__ripple::after {\n    background: #6BBE6B;\n}\n\n#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:enabled:active .mdc-switch__ripple::before,\n#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:enabled:active .mdc-switch__ripple::after {\n    background: #6BBE6B;\n}\n\n#cookiescript_injected_fsd .mdc-switch:enabled .mdc-switch__track::after {\n    background: #6BBE6B;\n    opacity: 0.3;\n}\n\n#cookiescript_injected_fsd .mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after {\n    background: #6BBE6B;\n    opacity: 0.3;\n}\n\n#cookiescript_injected_fsd .mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after {\n    background: #6BBE6B;\n    opacity: 0.3;\n}\n\n#cookiescript_injected_fsd .mdc-switch:enabled:active .mdc-switch__track::after {\n    background: #6BBE6B;\n    opacity: 0.3;\n}\n\n\n#cookiescript_fsd_wrapper {\n    border-radius: 25px;\n}\n.cookiescript_fsd_header {\n    border-radius: 25px 25px 0 0;\n}\n.cookiescript_fsd_footer {\n    border-radius: 0 0 25px 25px;\n}\n#cookiescript_iab_type > div {\n    border-radius: 25px;\n}\n.cookiescript_fsd_cookies::-webkit-scrollbar-track,\n.cookiescript_fsd_tabs_content::-webkit-scrollbar-track\n#cookiescript_iabwrap::-webkit-scrollbar-thumb,\n#cookiescript_aboutwrap::-webkit-scrollbar-thumb{\n    border-radius: 6px;\n}\n.cookiescript_fsd_cookies::-webkit-scrollbar-thumb,\n.cookiescript_fsd_tabs_content::-webkit-scrollbar-thumb,\n#cookiescript_iabwrap::-webkit-scrollbar-thumb,\n#cookiescript_aboutwrap::-webkit-scrollbar-thumb{\n    border-radius: 5px;\n}\n#cookiescript_injected_fsd #cookiescript_accept,\n#cookiescript_injected_fsd #cookiescript_save,\n#cookiescript_injected_fsd #cookiescript_reject{\n    border-radius: 30px;\n}\n\n@media only screen and (max-width: 414px) {\n    .cookiescript_fsd_header {\n        border-radius: 0;\n    }\n    .cookiescript_fsd_footer {\n        border-radius: 0;\n    }\n}\n@media only screen and (max-width: 414px) {\n\t#cookiescript_fsd_wrapper {\n\t\twidth: 100%;\n\t\theight: 100%;\n\t\tmax-height: 100%;\n\t\ttop: 0;\n\t\tborder-radius: 0;\n\t\tmargin: 0;\n\t}\n\n\t.cookiescript_fsd_main_info {\n\t\tpadding: 13px 20px;\n\t\toverflow-y: auto;\n\t\tmax-height: 140px;\n\t}\n\t.cookiescript_fsd_description{\n\t\tmargin-top: 8px;\n\t}\n\t.cookiescript_fsd_tabs > div {\n\t\tpadding: 6px;\n\t\tfont-size: 12px;\n\t}\n\n\t.cookiescript_fsd_tabs_content {\n\t\tpadding: 5px 20px 10px 20px;\n\t}\n\n\t.cookiescript_fsd_cookies_table thead {\n\t\tdisplay: none;\n\t}\n\n\t.cookiescript_fsd_cookies_table td {\n\t\tdisplay: flex;\n\t\tborder-bottom: 0px;\n\t}\n\n\t.cookiescript_fsd_cookies_table tr td:last-child {\n\t\tborder-bottom: 0;\n\t}\n\n\t.cookiescript_fsd_cookies_table td {\n\t\tborder-top: 0;\n\t}\n\n\t.cookiescript_fsd_cookies_table td::before {\n\t\tcontent: attr(label);\n\t\tfont-weight: bold;\n\t\twidth: 120px;\n\t\tmin-width: 120px;\n\t\ttext-align: left;\n\t}\n\n\t.cookiescript_fsd_cookies_table td:nth-child(2):before {\n\t\tcolor: #1C1C1C;\n\t}\n\n\t.cookiescript_category_description {\n\t\ttext-align: left;\n\t}\n\n\t.cookiescript_fsd_cookies_table td:nth-child(1),\n\t.cookiescript_fsd_cookies_table th:nth-child(1) {\n\t\tpadding-left: 7px;\n\t\tfont-weight: bold;\n\t\tborder-top: 1px solid #e2e2e2;\n\t}\n\n\t.cookiescript_fsd_cookies_table tr:nth-child(1) td:nth-child(1),\n\t.cookiescript_fsd_cookies_table tr:nth-child(1) th:nth-child(1) {\n\t\tborder-top: 0px;\n\t}\n\n\t.cookiescript_fsd_cookies_table td:last-child {\n\t\tborder-bottom: none;\n\t}\n\n\t.cookiescript_fsd_cookies_table tr:nth-child(even) {\n\t\tbackground: #f5f5f5;\n\t}\n\n\t.cookiescript_fsd_cookies_table tr:nth-child(even) td {\n\t\tborder-bottom: 0px solid #FFF;\n\t}\n\n\t#cookiescript_injected_fsd #cookiescript_buttons {\n\t\tmargin-bottom: 0;\n\t}\n\n\t#cookiescript_injected_fsd #cookiescript_buttons #cookiescript_accept,\n\t#cookiescript_injected_fsd #cookiescript_buttons #cookiescript_save,\n\t#cookiescript_injected_fsd #cookiescript_buttons #cookiescript_reject {\n\t\tflex-grow: 1;\n\t\tmargin-left: 10px;\n\t\tmargin-right: 10px;\n\t\tmargin-top: 5px;\n\t\tmargin-bottom: 5px;\n\t\tpadding: 0 15px;\n\t}\n\n\t.cookiescript_fsd_language_drop_down {\n\t\tright: 40px;\n\t}\n\n\t#cookiescript_injected_fsd #cookiescript_close{\n\t\tright:14px;\n\t}\n    .cookiescript_fsd_reportby {\n        position: relative;\n        bottom: 0;\n        right: auto;\n        color: #1C1C1C;\n        font-size: 12px;\n        padding: 0 20px 10px 21px;\n        max-width: 100%;\n        opacity: 0.8;\n        display: none;\n    }\n    #cookiescript_fsd_reportlink, #cookiescript_fsd_cookiescriptlink{\n        color: #1C1C1C;\n        font-size: 12px;\n    }\n    \n}\n\n\n\r\n\r\n\r\n.cookiescript_rtl {\r\n    direction:rtl;\r\n}\r\n\r\n\/*Start Checkboxes*\/\r\n#cookiescript_injected_fsd .mdc-checkbox,\r\n#cookiescript_injected .mdc-checkbox {\r\n    box-sizing: content-box !important;\r\n}\r\n#cookiescript_injected_fsd .mdc-checkbox__native-control,\r\n#cookiescript_injected .mdc-checkbox__native-control {\r\n    display: block;\r\n    z-index: 1;\r\n}\r\n#cookiescript_injected_fsd .mdc-checkbox .mdc-checkbox__native-control:focus~.mdc-checkbox__background::before, \r\n#cookiescript_injected .mdc-checkbox .mdc-checkbox__native-control:focus~.mdc-checkbox__background::before, \r\n#cookiescript_injected_fsd .mdc-checkbox .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background::before,\r\n#cookiescript_injected .mdc-checkbox .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background::before {\r\n    background-color: #FFFFFF;\r\n}\r\n#cookiescript_injected .mdc-checkbox,#cookiescript_injected_fsd .mdc-checkbox{display:inline-block;position:relative;flex:0 0 18px;box-sizing:content-box;width:18px;height:18px;line-height:0;white-space:nowrap;cursor:pointer;vertical-align:bottom;padding:11px}#cookiescript_injected .mdc-checkbox .mdc-checkbox__native-control:checked~.mdc-checkbox__background::before,#cookiescript_injected .mdc-checkbox .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background::before,#cookiescript_injected_fsd .mdc-checkbox .mdc-checkbox__native-control:checked~.mdc-checkbox__background::before,#cookiescript_injected_fsd .mdc-checkbox .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background::before{background-color:#FFFFFF}@supports not (-ms-ime-align:auto){#cookiescript_injected .mdc-checkbox .mdc-checkbox__native-control:checked~.mdc-checkbox__background::before,#cookiescript_injected .mdc-checkbox .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background::before,#cookiescript_injected_fsd .mdc-checkbox .mdc-checkbox__native-control:checked~.mdc-checkbox__background::before,#cookiescript_injected_fsd .mdc-checkbox .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background::before{background-color:var(--mdc-theme-secondary, #FFFFFF)}}#cookiescript_injected .mdc-checkbox .mdc-checkbox__background,#cookiescript_injected_fsd .mdc-checkbox .mdc-checkbox__background{top:11px;left:11px}#cookiescript_injected .mdc-checkbox .mdc-checkbox__background::before,#cookiescript_injected_fsd .mdc-checkbox .mdc-checkbox__background::before{top:-13px;left:-13px;width:40px;height:40px}#cookiescript_injected .mdc-checkbox .mdc-checkbox__native-control,#cookiescript_injected_fsd .mdc-checkbox .mdc-checkbox__native-control{top:0;right:0;left:0;width:40px;height:40px}#cookiescript_injected .mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate)~.mdc-checkbox__background,#cookiescript_injected_fsd .mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate)~.mdc-checkbox__background{border-color:#FFFFFF;background-color:transparent}#cookiescript_injected .mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background,#cookiescript_injected .mdc-checkbox__native-control:enabled:indeterminate~.mdc-checkbox__background,#cookiescript_injected_fsd .mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background,#cookiescript_injected_fsd .mdc-checkbox__native-control:enabled:indeterminate~.mdc-checkbox__background{border-color:#FFFFFF;background-color:#FFFFFF}#cookiescript_injected .mdc-checkbox__native-control[disabled]:not(:checked):not(:indeterminate)~.mdc-checkbox__background,#cookiescript_injected_fsd .mdc-checkbox__native-control[disabled]:not(:checked):not(:indeterminate)~.mdc-checkbox__background{border-color:rgba(255,255,255,0.26);background-color:transparent}#cookiescript_injected .mdc-checkbox__native-control[disabled]:checked~.mdc-checkbox__background,#cookiescript_injected .mdc-checkbox__native-control[disabled]:indeterminate~.mdc-checkbox__background,#cookiescript_injected_fsd .mdc-checkbox__native-control[disabled]:checked~.mdc-checkbox__background,#cookiescript_injected_fsd .mdc-checkbox__native-control[disabled]:indeterminate~.mdc-checkbox__background{border-color:transparent;background-color:rgba(255,255,255,0.26)}#cookiescript_injected .mdc-checkbox__native-control:enabled~.mdc-checkbox__background .mdc-checkbox__checkmark,#cookiescript_injected_fsd .mdc-checkbox__native-control:enabled~.mdc-checkbox__background .mdc-checkbox__checkmark{color:#1C1C1C}#cookiescript_injected .mdc-checkbox__native-control:disabled~.mdc-checkbox__background .mdc-checkbox__checkmark,#cookiescript_injected_fsd .mdc-checkbox__native-control:disabled~.mdc-checkbox__background .mdc-checkbox__checkmark{color:#1C1C1C}#cookiescript_injected .mdc-checkbox__background,#cookiescript_injected_fsd .mdc-checkbox__background{display:inline-flex;position:absolute;align-items:center;justify-content:center;box-sizing:border-box;width:18px;height:18px;border:2px solid #FFFFFF;border-radius:2px;background-color:transparent;pointer-events:none;will-change:background-color,border-color;transition:background-color 90ms 0s cubic-bezier(.4,0,.6,1),border-color 90ms 0s cubic-bezier(.4,0,.6,1)}#cookiescript_injected .mdc-checkbox__background .mdc-checkbox__background::before,#cookiescript_injected_fsd .mdc-checkbox__background .mdc-checkbox__background::before{background-color:#000}@supports not (-ms-ime-align:auto){#cookiescript_injected .mdc-checkbox__checkmark,#cookiescript_injected_fsd .mdc-checkbox__checkmark{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;opacity:0;transition:opacity 180ms 0s cubic-bezier(.4,0,.6,1)}#cookiescript_injected .mdc-checkbox__checkmark-path,#cookiescript_injected_fsd .mdc-checkbox__checkmark-path{transition:stroke-dashoffset 180ms 0s cubic-bezier(.4,0,.6,1);stroke:currentColor;stroke-width:5px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}#cookiescript_injected .mdc-checkbox__native-control:checked~.mdc-checkbox__background,#cookiescript_injected .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background,#cookiescript_injected_fsd .mdc-checkbox__native-control:checked~.mdc-checkbox__background,#cookiescript_injected_fsd .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background{transition:border-color 90ms 0s cubic-bezier(0,0,.2,1),background-color 90ms 0s cubic-bezier(0,0,.2,1)}#cookiescript_injected .mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark-path,#cookiescript_injected .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark-path,#cookiescript_injected_fsd .mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark-path,#cookiescript_injected_fsd .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark-path{stroke-dashoffset:0}#cookiescript_injected .mdc-checkbox__background::before,#cookiescript_injected_fsd .mdc-checkbox__background::before{position:absolute;-webkit-transform:scale(0,0);transform:scale(0,0);border-radius:50%;opacity:0;pointer-events:none;content:\"\";will-change:opacity,transform;transition:opacity 90ms 0s cubic-bezier(.4,0,.6,1),-webkit-transform 90ms 0s cubic-bezier(.4,0,.6,1);transition:opacity 90ms 0s cubic-bezier(.4,0,.6,1),transform 90ms 0s cubic-bezier(.4,0,.6,1);transition:opacity 90ms 0s cubic-bezier(.4,0,.6,1),transform 90ms 0s cubic-bezier(.4,0,.6,1),-webkit-transform 90ms 0s cubic-bezier(.4,0,.6,1)}#cookiescript_injected .mdc-checkbox__native-control:focus~.mdc-checkbox__background::before,#cookiescript_injected_fsd .mdc-checkbox__native-control:focus~.mdc-checkbox__background::before{-webkit-transform:scale(1);transform:scale(1);opacity:.12;transition:opacity 80ms 0s cubic-bezier(0,0,.2,1),-webkit-transform 80ms 0s cubic-bezier(0,0,.2,1);transition:opacity 80ms 0s cubic-bezier(0,0,.2,1),transform 80ms 0s cubic-bezier(0,0,.2,1);transition:opacity 80ms 0s cubic-bezier(0,0,.2,1),transform 80ms 0s cubic-bezier(0,0,.2,1),-webkit-transform 80ms 0s cubic-bezier(0,0,.2,1)}#cookiescript_injected .mdc-checkbox__native-control,#cookiescript_injected_fsd .mdc-checkbox__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit}#cookiescript_injected .mdc-checkbox__native-control:disabled,#cookiescript_injected_fsd .mdc-checkbox__native-control:disabled{cursor:default;pointer-events:none}#cookiescript_injected .mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark,#cookiescript_injected_fsd .mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark{transition:opacity 180ms 0s cubic-bezier(0,0,.2,1),-webkit-transform 180ms 0s cubic-bezier(0,0,.2,1);transition:opacity 180ms 0s cubic-bezier(0,0,.2,1),transform 180ms 0s cubic-bezier(0,0,.2,1);transition:opacity 180ms 0s cubic-bezier(0,0,.2,1),transform 180ms 0s cubic-bezier(0,0,.2,1),-webkit-transform 180ms 0s cubic-bezier(0,0,.2,1);opacity:1}#cookiescript_injected .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark,#cookiescript_injected_fsd .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark{-webkit-transform:rotate(45deg);transform:rotate(45deg);opacity:0;transition:opacity 90ms 0s cubic-bezier(.4,0,.6,1),-webkit-transform 90ms 0s cubic-bezier(.4,0,.6,1);transition:opacity 90ms 0s cubic-bezier(.4,0,.6,1),transform 90ms 0s cubic-bezier(.4,0,.6,1);transition:opacity 90ms 0s cubic-bezier(.4,0,.6,1),transform 90ms 0s cubic-bezier(.4,0,.6,1),-webkit-transform 90ms 0s cubic-bezier(.4,0,.6,1)}#cookiescript_injected .mdc-checkbox,#cookiescript_injected_fsd .mdc-checkbox{-webkit-tap-highlight-color:transparent}}\r\n\/*updated checkboxes*\/\r\n#cookiescript_injected .mdc-checkbox .mdc-checkbox__native-control, #cookiescript_injected_fsd .mdc-checkbox .mdc-checkbox__native-control{\r\n    width:47px;\r\n    height:47px;\r\n}\r\n#cookiescript_injected .mdc-checkbox, #cookiescript_injected_fsd .mdc-checkbox{\r\n    flex: 0 0 25px;\r\n    width: 25px;\r\n    height: 25px;\r\n}\r\n#cookiescript_injected .mdc-checkbox .mdc-checkbox__background::before, #cookiescript_injected_fsd .mdc-checkbox .mdc-checkbox__background::before{\r\n    width:0;\r\n    height: 0;\r\n}\r\n#cookiescript_injected .mdc-checkbox__background{\r\n    width: 25px;\r\n    height: 25px;\r\n    border-radius:8px;\r\n}\r\n\/*End Checkboxes*\/\r\n\r\n\r\n\/*Start Toggle*\/\r\n\r\n#cookiescript_injected .mdc-elevation-overlay,#cookiescript_injected_fsd .mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity 280ms cubic-bezier(.4,0,.2,1);background-color:#fff}#cookiescript_injected .mdc-switch,#cookiescript_injected_fsd .mdc-switch{align-items:center;background:0 0;border:none;cursor:pointer;display:inline-flex;flex-shrink:0;margin:0;outline:0;overflow:visible;padding:0;position:relative}#cookiescript_injected .mdc-switch:disabled,#cookiescript_injected_fsd .mdc-switch:disabled{cursor:default;pointer-events:none}#cookiescript_injected .mdc-switch input[type=checkbox],#cookiescript_injected_fsd .mdc-switch input[type=checkbox]{display:none;visibility:hidden}#cookiescript_injected .mdc-switch__track,#cookiescript_injected_fsd .mdc-switch__track{overflow:hidden;position:relative;width:100%}#cookiescript_injected .mdc-switch__track::after,#cookiescript_injected .mdc-switch__track::before,#cookiescript_injected_fsd .mdc-switch__track::after,#cookiescript_injected_fsd .mdc-switch__track::before{border:1px solid transparent;border-radius:inherit;box-sizing:border-box;content:\"\";height:100%;left:0;position:absolute;width:100%}#cookiescript_injected .mdc-switch__track::before,#cookiescript_injected_fsd .mdc-switch__track::before{transition:-webkit-transform 75ms 0s cubic-bezier(0,0,.2,1);transition:transform 75ms 0s cubic-bezier(0,0,.2,1);-webkit-transform:translateX(0);transform:translateX(0)}#cookiescript_injected .mdc-switch__track::after,#cookiescript_injected_fsd .mdc-switch__track::after{transition:-webkit-transform 75ms 0s cubic-bezier(.4,0,.6,1);transition:transform 75ms 0s cubic-bezier(.4,0,.6,1);-webkit-transform:translateX(-100%);transform:translateX(-100%)}#cookiescript_injected .mdc-switch__track[dir=rtl]::after,#cookiescript_injected [dir=rtl] .mdc-switch__track::after,#cookiescript_injected_fsd .mdc-switch__track[dir=rtl]::after,#cookiescript_injected_fsd [dir=rtl] .mdc-switch__track::after{-webkit-transform:translateX(100%);transform:translateX(100%)}#cookiescript_injected .mdc-switch--selected .mdc-switch__track::before,#cookiescript_injected_fsd .mdc-switch--selected .mdc-switch__track::before{transition:-webkit-transform 75ms 0s cubic-bezier(.4,0,.6,1);transition:transform 75ms 0s cubic-bezier(.4,0,.6,1);-webkit-transform:translateX(100%);transform:translateX(100%)}#cookiescript_injected .mdc-switch--selected .mdc-switch__track[dir=rtl]::before,#cookiescript_injected [dir=rtl] .mdc-switch--selected .mdc-switch__track::before,#cookiescript_injected_fsd .mdc-switch--selected .mdc-switch__track[dir=rtl]::before,#cookiescript_injected_fsd [dir=rtl] .mdc-switch--selected .mdc-switch__track::before{-webkit-transform:translateX(-100%);transform:translateX(-100%)}#cookiescript_injected .mdc-switch--selected .mdc-switch__track::after,#cookiescript_injected_fsd .mdc-switch--selected .mdc-switch__track::after{transition:-webkit-transform 75ms 0s cubic-bezier(0,0,.2,1);transition:transform 75ms 0s cubic-bezier(0,0,.2,1);-webkit-transform:translateX(0);transform:translateX(0)}#cookiescript_injected .mdc-switch__handle-track,#cookiescript_injected_fsd .mdc-switch__handle-track{height:100%;pointer-events:none;position:absolute;top:0;transition:-webkit-transform 75ms 0s cubic-bezier(.4,0,.2,1);transition:transform 75ms 0s cubic-bezier(.4,0,.2,1);left:0;right:auto;-webkit-transform:translateX(0);transform:translateX(0)}#cookiescript_injected .mdc-switch__handle-track[dir=rtl],#cookiescript_injected [dir=rtl] .mdc-switch__handle-track,#cookiescript_injected_fsd .mdc-switch__handle-track[dir=rtl],#cookiescript_injected_fsd [dir=rtl] .mdc-switch__handle-track{left:auto;right:0}#cookiescript_injected .mdc-switch--selected .mdc-switch__handle-track,#cookiescript_injected_fsd .mdc-switch--selected .mdc-switch__handle-track{-webkit-transform:translateX(100%);transform:translateX(100%)}#cookiescript_injected .mdc-switch--selected .mdc-switch__handle-track[dir=rtl],#cookiescript_injected [dir=rtl] .mdc-switch--selected .mdc-switch__handle-track,#cookiescript_injected_fsd .mdc-switch--selected .mdc-switch__handle-track[dir=rtl],#cookiescript_injected_fsd [dir=rtl] .mdc-switch--selected .mdc-switch__handle-track{-webkit-transform:translateX(-100%);transform:translateX(-100%)}#cookiescript_injected .mdc-switch__handle,#cookiescript_injected_fsd .mdc-switch__handle{display:flex;pointer-events:auto;position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);left:0;right:auto}#cookiescript_injected .mdc-switch__handle[dir=rtl],#cookiescript_injected [dir=rtl] .mdc-switch__handle,#cookiescript_injected_fsd .mdc-switch__handle[dir=rtl],#cookiescript_injected_fsd [dir=rtl] .mdc-switch__handle{left:auto;right:0}#cookiescript_injected .mdc-switch__handle::after,#cookiescript_injected .mdc-switch__handle::before,#cookiescript_injected_fsd .mdc-switch__handle::after,#cookiescript_injected_fsd .mdc-switch__handle::before{border:1px solid transparent;border-radius:inherit;box-sizing:border-box;content:\"\";width:100%;height:100%;left:0;position:absolute;top:0;transition:background-color 75ms 0s cubic-bezier(.4,0,.2,1),border-color 75ms 0s cubic-bezier(.4,0,.2,1);z-index:-1}#cookiescript_injected .mdc-switch__shadow,#cookiescript_injected_fsd .mdc-switch__shadow{border-radius:inherit;bottom:0;left:0;position:absolute;right:0;top:0}#cookiescript_injected .mdc-elevation-overlay,#cookiescript_injected_fsd .mdc-elevation-overlay{bottom:0;left:0;right:0;top:0}#cookiescript_injected .mdc-switch__ripple,#cookiescript_injected_fsd .mdc-switch__ripple{left:50%;position:absolute;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);z-index:-1}#cookiescript_injected .mdc-switch:disabled .mdc-switch__ripple,#cookiescript_injected_fsd .mdc-switch:disabled .mdc-switch__ripple{display:none}#cookiescript_injected .mdc-switch__icons,#cookiescript_injected_fsd .mdc-switch__icons{height:100%;position:relative;width:100%;z-index:1}#cookiescript_injected .mdc-switch__icon,#cookiescript_injected_fsd .mdc-switch__icon{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0;opacity:0;transition:opacity 30ms 0s cubic-bezier(.4,0,1,1)}#cookiescript_injected .mdc-switch--selected .mdc-switch__icon--on,#cookiescript_injected .mdc-switch--unselected .mdc-switch__icon--off,#cookiescript_injected_fsd .mdc-switch--selected .mdc-switch__icon--on,#cookiescript_injected_fsd .mdc-switch--unselected .mdc-switch__icon--off{opacity:1;transition:opacity 45ms 30ms cubic-bezier(0,0,.2,1)}#cookiescript_injected .mdc-switch,#cookiescript_injected_fsd .mdc-switch{will-change:transform,opacity}@-webkit-keyframes mdc-ripple-fg-radius-in{from{-webkit-animation-timing-function:cubic-bezier(.4,0,.2,1);animation-timing-function:cubic-bezier(.4,0,.2,1);-webkit-transform:translate(0) scale(1);transform:translate(0) scale(1)}to{-webkit-transform:translate(0) scale(1);transform:translate(0) scale(1)}}@keyframes mdc-ripple-fg-radius-in{from{-webkit-animation-timing-function:cubic-bezier(.4,0,.2,1);animation-timing-function:cubic-bezier(.4,0,.2,1);-webkit-transform:translate(0) scale(1);transform:translate(0) scale(1)}to{-webkit-transform:translate(0) scale(1);transform:translate(0) scale(1)}}@-webkit-keyframes mdc-ripple-fg-opacity-in{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:.1}}@keyframes mdc-ripple-fg-opacity-in{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:.1}}@-webkit-keyframes mdc-ripple-fg-opacity-out{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:.1}to{opacity:0}}@keyframes mdc-ripple-fg-opacity-out{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:.1}to{opacity:0}}#cookiescript_injected .mdc-switch .mdc-switch__ripple::after,#cookiescript_injected .mdc-switch .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch .mdc-switch__ripple::before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}#cookiescript_injected .mdc-switch .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch .mdc-switch__ripple::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}#cookiescript_injected .mdc-switch .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch .mdc-switch__ripple::after{z-index:0}#cookiescript_injected .mdc-switch.mdc-ripple-upgraded .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch.mdc-ripple-upgraded .mdc-switch__ripple::before{-webkit-transform:scale(1);transform:scale(1)}#cookiescript_injected .mdc-switch.mdc-ripple-upgraded .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch.mdc-ripple-upgraded .mdc-switch__ripple::after{top:0;left:0;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:center center;transform-origin:center center}#cookiescript_injected .mdc-switch.mdc-ripple-upgraded--unbounded .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch.mdc-ripple-upgraded--unbounded .mdc-switch__ripple::after{top:0;left:0}#cookiescript_injected .mdc-switch.mdc-ripple-upgraded--foreground-activation .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch.mdc-ripple-upgraded--foreground-activation .mdc-switch__ripple::after{-webkit-animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards;animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}#cookiescript_injected .mdc-switch.mdc-ripple-upgraded--foreground-deactivation .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch.mdc-ripple-upgraded--foreground-deactivation .mdc-switch__ripple::after{-webkit-animation:mdc-ripple-fg-opacity-out 150ms;animation:mdc-ripple-fg-opacity-out 150ms;-webkit-transform:translate(0) scale(1);transform:translate(0) scale(1)}#cookiescript_injected .mdc-switch .mdc-switch__ripple::after,#cookiescript_injected .mdc-switch .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch .mdc-switch__ripple::before{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}#cookiescript_injected .mdc-switch.mdc-ripple-upgraded .mdc-switch__ripple::after,#cookiescript_injected .mdc-switch.mdc-ripple-upgraded .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch.mdc-ripple-upgraded .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch.mdc-ripple-upgraded .mdc-switch__ripple::before{top:0;left:0;width:0;height:0}#cookiescript_injected .mdc-switch.mdc-ripple-upgraded .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch.mdc-ripple-upgraded .mdc-switch__ripple::after{width:0;height:0}#cookiescript_injected .mdc-switch,#cookiescript_injected_fsd .mdc-switch{width:36px}#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled .mdc-switch__handle::after{background:}#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:}#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:focus:not(:active) .mdc-switch__handle::after{background:}#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:active .mdc-switch__handle::after{background:}#cookiescript_injected .mdc-switch.mdc-switch--selected:disabled .mdc-switch__handle::after,#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:disabled .mdc-switch__handle::after{background:#424242}#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled .mdc-switch__handle::after,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled .mdc-switch__handle::after{background:#616161}#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:#212121}#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:focus:not(:active) .mdc-switch__handle::after,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:focus:not(:active) .mdc-switch__handle::after{background:#212121}#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:active .mdc-switch__handle::after,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:active .mdc-switch__handle::after{background:#212121}#cookiescript_injected .mdc-switch.mdc-switch--unselected:disabled .mdc-switch__handle::after,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:disabled .mdc-switch__handle::after{background:#424242}#cookiescript_injected .mdc-switch .mdc-switch__handle::before,#cookiescript_injected_fsd .mdc-switch .mdc-switch__handle::before{background:#fff}#cookiescript_injected .mdc-switch:enabled .mdc-switch__shadow,#cookiescript_injected_fsd .mdc-switch:enabled .mdc-switch__shadow{box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12);--mdc-elevation-box-shadow-for-gss:0px 2px 1px -1px rgba(0, 0, 0, 0.2),0px 1px 1px 0px rgba(0, 0, 0, 0.14),0px 1px 3px 0px rgba(0, 0, 0, 0.12)}#cookiescript_injected .mdc-switch:disabled .mdc-switch__shadow,#cookiescript_injected_fsd .mdc-switch:disabled .mdc-switch__shadow{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12);--mdc-elevation-box-shadow-for-gss:0px 0px 0px 0px rgba(0, 0, 0, 0.2),0px 0px 0px 0px rgba(0, 0, 0, 0.14),0px 0px 0px 0px rgba(0, 0, 0, 0.12)}#cookiescript_injected .mdc-switch .mdc-switch__handle,#cookiescript_injected_fsd .mdc-switch .mdc-switch__handle{height:20px}#cookiescript_injected .mdc-switch:disabled .mdc-switch__handle::after,#cookiescript_injected_fsd .mdc-switch:disabled .mdc-switch__handle::after{opacity:.38}#cookiescript_injected .mdc-switch .mdc-switch__handle,#cookiescript_injected_fsd .mdc-switch .mdc-switch__handle{border-radius:10px}#cookiescript_injected .mdc-switch .mdc-switch__handle,#cookiescript_injected_fsd .mdc-switch .mdc-switch__handle{width:20px}#cookiescript_injected .mdc-switch .mdc-switch__handle-track,#cookiescript_injected_fsd .mdc-switch .mdc-switch__handle-track{width:calc(100% - 20px)}#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled .mdc-switch__icon,#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:enabled .mdc-switch__icon{fill:#fff}#cookiescript_injected .mdc-switch.mdc-switch--selected:disabled .mdc-switch__icon,#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:disabled .mdc-switch__icon{fill:#fff}#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled .mdc-switch__icon,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled .mdc-switch__icon{fill:#fff}#cookiescript_injected .mdc-switch.mdc-switch--unselected:disabled .mdc-switch__icon,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:disabled .mdc-switch__icon{fill:#fff}#cookiescript_injected .mdc-switch.mdc-switch--selected:disabled .mdc-switch__icons,#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:disabled .mdc-switch__icons{opacity:.38}#cookiescript_injected .mdc-switch.mdc-switch--unselected:disabled .mdc-switch__icons,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:disabled .mdc-switch__icons{opacity:.38}#cookiescript_injected .mdc-switch.mdc-switch--selected .mdc-switch__icon,#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected .mdc-switch__icon{width:18px;height:18px}#cookiescript_injected .mdc-switch.mdc-switch--unselected .mdc-switch__icon,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected .mdc-switch__icon{width:18px;height:18px}#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::after,#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::before{background-color:}#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:focus .mdc-switch__ripple::after,#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:focus .mdc-switch__ripple::before{background-color:}#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:active .mdc-switch__ripple::after,#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:active .mdc-switch__ripple::before{background-color:}#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::after,#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::before{background-color:#424242}#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::after,#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::before{background-color:#424242}#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:active .mdc-switch__ripple::after,#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:active .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:active .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:active .mdc-switch__ripple::before{background-color:#424242}#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus).mdc-ripple-surface--hover .mdc-switch__ripple::before,#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus):hover .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus).mdc-ripple-surface--hover .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus):hover .mdc-switch__ripple::before{opacity:.04}#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:focus.mdc-ripple-upgraded--background-focused .mdc-switch__ripple::before,#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:focus:not(.mdc-ripple-upgraded):focus .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:enabled:focus.mdc-ripple-upgraded--background-focused .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:enabled:focus:not(.mdc-ripple-upgraded):focus .mdc-switch__ripple::before{transition-duration:75ms;opacity:.12}#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:active:not(.mdc-ripple-upgraded) .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:enabled:active:not(.mdc-ripple-upgraded) .mdc-switch__ripple::after{transition:opacity 150ms linear}#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:active:not(.mdc-ripple-upgraded):active .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:enabled:active:not(.mdc-ripple-upgraded):active .mdc-switch__ripple::after{transition-duration:75ms;opacity:.1}#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus).mdc-ripple-surface--hover .mdc-switch__ripple::before,#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus):hover .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus).mdc-ripple-surface--hover .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus):hover .mdc-switch__ripple::before{opacity:.04}#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:focus.mdc-ripple-upgraded--background-focused .mdc-switch__ripple::before,#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:focus:not(.mdc-ripple-upgraded):focus .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:focus.mdc-ripple-upgraded--background-focused .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:focus:not(.mdc-ripple-upgraded):focus .mdc-switch__ripple::before{transition-duration:75ms;opacity:.12}#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:active:not(.mdc-ripple-upgraded) .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:active:not(.mdc-ripple-upgraded) .mdc-switch__ripple::after{transition:opacity 150ms linear}#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:active:not(.mdc-ripple-upgraded):active .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:active:not(.mdc-ripple-upgraded):active .mdc-switch__ripple::after{transition-duration:75ms;opacity:.1}#cookiescript_injected .mdc-switch .mdc-switch__ripple,#cookiescript_injected_fsd .mdc-switch .mdc-switch__ripple{height:48px;width:48px}#cookiescript_injected .mdc-switch .mdc-switch__track,#cookiescript_injected_fsd .mdc-switch .mdc-switch__track{height:14px}#cookiescript_injected .mdc-switch:disabled .mdc-switch__track,#cookiescript_injected_fsd .mdc-switch:disabled .mdc-switch__track{opacity:.12}#cookiescript_injected .mdc-switch:enabled .mdc-switch__track::after{background:;opacity:0.3}#cookiescript_injected .mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after{background:;opacity:0.3}#cookiescript_injected .mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after{background:;opacity:0.3}#cookiescript_injected .mdc-switch:enabled:active .mdc-switch__track::after{background:;opacity:0.3}#cookiescript_injected .mdc-switch:disabled .mdc-switch__track::after,#cookiescript_injected_fsd .mdc-switch:disabled .mdc-switch__track::after{background:#424242}#cookiescript_injected .mdc-switch:enabled .mdc-switch__track::before,#cookiescript_injected_fsd .mdc-switch:enabled .mdc-switch__track::before{background:#e0e0e0}#cookiescript_injected .mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before,#cookiescript_injected_fsd .mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before{background:#e0e0e0}#cookiescript_injected .mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before,#cookiescript_injected_fsd .mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before{background:#e0e0e0}#cookiescript_injected .mdc-switch:enabled:active .mdc-switch__track::before,#cookiescript_injected_fsd .mdc-switch:enabled:active .mdc-switch__track::before{background:#e0e0e0}#cookiescript_injected .mdc-switch:disabled .mdc-switch__track::before,#cookiescript_injected_fsd .mdc-switch:disabled .mdc-switch__track::before{background:#424242}#cookiescript_injected .mdc-switch .mdc-switch__track,#cookiescript_injected_fsd .mdc-switch .mdc-switch__track{border-radius:7px}@media screen and (forced-colors:active),(-ms-high-contrast:active){#cookiescript_injected .mdc-switch:disabled .mdc-switch__handle::after,#cookiescript_injected_fsd .mdc-switch:disabled .mdc-switch__handle::after{opacity:1}#cookiescript_injected .mdc-switch.mdc-switch--selected:disabled .mdc-switch__icons,#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:disabled .mdc-switch__icons{opacity:1}#cookiescript_injected .mdc-switch.mdc-switch--unselected:disabled .mdc-switch__icons,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:disabled .mdc-switch__icons{opacity:1}#cookiescript_injected .mdc-switch:disabled .mdc-switch__track,#cookiescript_injected_fsd .mdc-switch:disabled .mdc-switch__track{opacity:1}}\r\n\/*End Toggle*\/\r\n\r\n#cookiescript_injected {\r\nbottom: 20px;\r\nleft: 20px;\r\n    position: fixed;\r\n    padding: 15px 20px 15px 20px;\r\n    width: 300px;\r\n    text-align: left;\r\n    max-height: 85%;\r\n    overflow-y: auto;\r\n    max-width: calc(100% - 40px);\r\n}\r\n#cookiescript_copyright {\r\n    line-height: 1;\r\n    text-align: center;\r\n}\r\n#cookiescript_buttons {\r\n    justify-content: space-between;\r\n    margin: 0 -5px 0 -5px;\r\n    flex-wrap: wrap;\r\n}\r\n#cookiescript_manage_wrap {\r\n    margin: 0 0 5px 0;\r\n}\r\n#cookiescript_header {\r\n    padding: 10px 0 10px;\r\n    text-align: left;\r\n    margin: 0;\r\n    margin-right: 13px;\r\n}\r\n#cookiescript_checkboxs {\r\n    margin: 0 0 18px -11px;\r\n}\r\n.cookiescript_checkbox {\r\n    margin: 0 0 -10px 0;\r\n}\r\n#cookiescript_accept,\r\n#cookiescript_save,\r\n#cookiescript_reject {\r\n    flex-grow: 1;\r\n    padding: 0 7px;\r\n    margin: 0 5px 13px 5px;\r\n}\r\n#cookiescript_description {\r\n    margin: 0 0 10px;\r\n}\r\n\r\n.cookiescript_checkbox_label{\r\n    padding: 0;\r\n    margin: 0 10px 0 0;\r\n}\r\n\r\n#cookiescript_injected{\r\n    transition: width 200ms 600ms;\r\n}\r\n\r\n#cookiescript_injected.hascookiereport{\r\n    width:600px;\r\n    transition: width 200ms 0ms;\r\n}\r\n#cookiescript_cookietablewrap {\r\n    transition: height 300ms 200ms, min-height 300ms 200ms, max-height 300ms 200ms, opacity 200ms 300ms;\r\n}\r\n#cookiescript_cookietablewrap.cookiescript_hidden {\r\n    transition: height 300ms 200ms, min-height 300ms 200ms, max-height 300ms 200ms, opacity 200ms 0ms;\r\n}\r\n\r\n#cookiescript_accept, #cookiescript_reject, #cookiescript_save {\r\n\tborder-radius: 20px;\r\n}\r\n\r\n#cookiescript_injected {\r\n\tborder-radius: 20px;\r\n}\r\n\r\n\r\n@media only screen and (max-width: 414px) {\r\n    #cookiescript_injected{\r\n    bottom: 0;\r\n    left: 0;\r\n        width: 100%;\r\n        padding: 15px;\r\n        border-radius:0;\r\n\t\tmax-width: 100%;\r\n    }\r\n    #cookiescript_description,\r\n    #cookiescript_buttons,\r\n    #cookiescript_manage_wrap\r\n    {\r\n        margin-bottom: 8px;\r\n    }\r\n    #cookiescript_checkboxs\r\n    {\r\n        margin-bottom: 15px;\r\n    }\r\n    #cookiescript_header{\r\n        padding-top:5px;\r\n    }\r\n    #cookiescript_checkboxs {\r\n        display: flex;\r\n        flex-wrap: wrap;\r\n    }\r\n    #cookiescript_injected {\r\n\t\tmax-height: 100%;\r\n\t}\r\n}\r\n\r\n\n    <\/style>\n  ";
    var customCssForPreview = '';
    var html = "<div id=\"cookiescript_injected_wrapper\" tabindex=\"0\" role=\"dialog\" aria-label=\"Cookie consent dialog\" aria-live=\"assertive\" data-cs-id=\"cookiescript_injected\">\n\t<div id=\"cookiescript_injected\" tabindex=\"0\" role=\"dialog\" aria-label=\"Cookie consent dialog\" aria-live=\"assertive\" data-nosnippet class=\"\">\n\t\t<div class=\"cookiescript_pre_header\">\n              <div id=\"cookiescript_close\" tabindex=\"0\" role=\"button\" aria-label=\"Close\">\u00d7<\/div>\n    <\/div>\n      <div id=\"cookiescript_header\" data-cs-i18n-text=\"{&quot;lt&quot;:&quot;\\u0160i svetain\\u0117 naudoja slapukus&quot;}\">\n    \u0160i svetain\u0117 naudoja slapukus  <\/div>\n  <div id=\"cookiescript_description\">\n\t    <span data-cs-desc-box=\"true\" data-cs-i18n-text=\"{&quot;lt&quot;:&quot;\\u0160ioje svetain\\u0117je naudojami slapukai, siekiant pagerinti vartotojo patirt\\u012f. Naudodamiesi m\\u016bs\\u0173 svetaine, j\\u016bs sutinkate su visais slapukais pagal m\\u016bs\\u0173 slapuk\\u0173 politik\\u0105.&quot;}\" data-cs-i18n-read=\"\u0160ioje svetain\u0117je naudojami slapukai, siekiant pagerinti vartotojo patirt\u012f. Naudodamiesi m\u016bs\u0173 svetaine, j\u016bs sutinkate su visais slapukais pagal m\u016bs\u0173 slapuk\u0173 politik\u0105.\">\n      \u0160ioje svetain\u0117je naudojami slapukai, siekiant pagerinti vartotojo patirt\u012f. Naudodamiesi m\u016bs\u0173 svetaine, j\u016bs sutinkate su visais slapukais pagal m\u016bs\u0173 slapuk\u0173 politik\u0105.    <\/span>\n\n    \n      \n      <a\n        id=\"cookiescript_readmore\"\n        data-cs-i18n-text=\"{&quot;lt&quot;:&quot;Skaityti daugiau&quot;}\"\n        data-cs-i18n-url=\"{&quot;lt&quot;:&quot;\\\/test&quot;}\"\n        target='_blank'        aria-label=\"Skaityti daugiau, opens a new window\"\n        href='\/test'      >\n        Skaityti daugiau      <\/a>\n\n          <\/div>\n  <div id=\"cookiescript_checkboxs\">\n                                    <\/div>\n  <div id=\"cookiescript_buttons\">\n          <div id=\"cookiescript_save\" tabindex=\"0\" role=\"button\" data-cs-i18n-text=\"{&quot;lt&quot;:&quot;I\\u0161saugoti ir u\\u017edaryti&quot;}\">\n        I\u0161saugoti ir u\u017edaryti      <\/div>\n              <div id=\"cookiescript_accept\" tabindex=\"0\" role=\"button\" data-cs-i18n-text=\"{&quot;lt&quot;:&quot;A\\u0161 sutinku&quot;}\">\n        A\u0161 sutinku      <\/div>\n              <div id=\"cookiescript_reject\" tabindex=\"0\" role=\"button\" data-cs-i18n-text=\"{&quot;lt&quot;:&quot;A\\u0161 nesutinku&quot;}\">\n        A\u0161 nesutinku      <\/div>\n      <\/div>\n\n  <div id=\"cookiescript_manage_wrap\" tabindex=\"0\" role=\"button\">\n    <div id=\"cookiescript_manage\">\n      <svg role=\"none\" id=\"cookiescript_manageicon\" viewBox=\"0 0 9.62 9.57\">\n        <g id=\"cs-manage-btn\">\n          <g id=\"cs-manage-btn-1-2\">\n            <path class=\"cookiescript_gear\" d=\"M9.46,6.06l-1.1-.78c0-.16.06-.31.06-.47a1.27,1.27,0,0,0-.06-.47L9.57,3.4l-1.15-2L7,1.93a2.74,2.74,0,0,0-.83-.47L6,0H3.61L3.35,1.46a7.14,7.14,0,0,0-.79.47L1.15,1.36,0,3.4l1.15.94c0,.16,0,.31,0,.47a1.51,1.51,0,0,0,0,.47l-1,.78A.75.75,0,0,0,0,6.17l1.15,2,1.41-.58a2.49,2.49,0,0,0,.84.47l.21,1.47H6a.53.53,0,0,1,0-.21L6.22,8.1a4,4,0,0,0,.84-.47l1.41.58,1.15-2A.75.75,0,0,0,9.46,6.06Zm-4.65.19A1.47,1.47,0,1,1,6.28,4.78,1.47,1.47,0,0,1,4.81,6.25Z\"><\/path>\n          <\/g>\n        <\/g>\n      <\/svg>\n      <span data-cs-show-title=\"cookie-script\" data-cs-i18n-text=\"{&quot;lt&quot;:&quot;Parodyti detaliau&quot;}\">\n        Parodyti detaliau      <\/span>\n      <span style=\"display: none\" data-cs-hide-title=\"cookie-script\" data-cs-i18n-text=\"{&quot;lt&quot;:&quot;Pasl\\u0117pti&quot;}\">\n        Pasl\u0117pti      <\/span>\n    <\/div>\n  <\/div>\n\t\t<div class=\"cookiescript_hidden\" id=\"cookiescript_cookietablewrap\">\n\t\t\t\t\t<\/div>\n\t\t\n\n\n  <div id=\"cookiescript_copyright\">\n    <a href=\"https:\/\/cookie-script.com\" target=\"_blank\" aria-label=\"Powered by CookieScript, opens a new window\" id=\"cookiescript_link\" title=\"Consent Management Platform\">\n      Powered by CookieScript\n    <\/a>\n  <\/div>\n\t<\/div>\n<\/div>\n";
    var badgeHtml = "  \n  <div id=\"cookiescript_badge\" tabindex=\"0\" role=\"dialog\" aria-label=\"Cookie consent button\" aria-live=\"assertive\">\n          <div id=\"cookiescript_badgeimage\">\n        <svg id=\"cookiescript_badgesvg\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" viewBox=\"0 0 320.28 320.28\">\n          <g id=\"cs_layer_2\" data-name=\"cs_layer_2\">\n            <g id=\"cs_layer_1\" data-name=\"cs_layer_1\">\n              <path class=\"cookiescriptlogo\" d=\"M160.14,0A160.14,160.14,0,1,0,320.28,160.14,160.14,160.14,0,0,0,160.14,0Zm0,301.49A141.35,141.35,0,1,1,301.49,160.14,141.35,141.35,0,0,1,160.14,301.49Z\"\/>\n              <circle class=\"cookiescriptlogo\" cx=\"98.09\" cy=\"106.52\" r=\"35.11\"\/>\n              <circle class=\"cookiescriptlogo\" cx=\"88.27\" cy=\"200.63\" r=\"14.09\"\/>\n              <circle class=\"cookiescriptlogo\" cx=\"151.17\" cy=\"251.06\" r=\"22.63\"\/>\n              <circle class=\"cookiescriptlogo\" cx=\"238.42\" cy=\"180.9\" r=\"30.49\"\/>\n              <circle class=\"cookiescriptlogo\" cx=\"206.65\" cy=\"86.27\" r=\"18.53\"\/>\n            <\/g>\n          <\/g>\n        <\/svg>\n      <\/div>\n              <div id=\"cookiescript_badgetext\" data-cs-i18n-text=\"{&quot;lt&quot;:&quot;Slapuk\\u0173 nustatymai&quot;}\">\n        Slapuk\u0173 nustatymai      <\/div>\n      <\/div>\n";
    var fullScreenDetailsHtml = "\n<div id=\"cookiescript_injected_fsd\" data-nosnippet role=\"dialog\" aria-label=\"Cookie consent dialog\" class=\"\">\n  <div id=\"cookiescript_fsd_wrapper\" tabindex=\"0\" role=\"button\">\n    <div class=\"cookiescript_fsd_header\">\n\t                      <div id=\"cookiescript_close\" tabindex=\"0\" role=\"button\" aria-label=\"Close\">\u00d7<\/div>\n          <\/div>\n    <div class=\"cookiescript_fsd_main\">\n      <div class=\"cookiescript_fsd_main_info\">\n        <!-- TITLE -->\n                  <div class=\"cookiescript_fsd_title\" data-cs-i18n-text=\"{&quot;lt&quot;:&quot;\\u0160i svetain\\u0117 naudoja slapukus&quot;}\">\n            \u0160i svetain\u0117 naudoja slapukus          <\/div>\n                <!-- END TITLE -->\n\n        <!-- DESCRIPTION -->\n                  <div class=\"cookiescript_fsd_description\">\n            <span data-cs-desc-box=\"true\" data-cs-i18n-text=\"{&quot;lt&quot;:&quot;\\u0160ioje svetain\\u0117je naudojami slapukai, siekiant pagerinti vartotojo patirt\\u012f. Naudodamiesi m\\u016bs\\u0173 svetaine, j\\u016bs sutinkate su visais slapukais pagal m\\u016bs\\u0173 slapuk\\u0173 politik\\u0105.&quot;}\" data-cs-i18n-read=\"\u0160ioje svetain\u0117je naudojami slapukai, siekiant pagerinti vartotojo patirt\u012f. Naudodamiesi m\u016bs\u0173 svetaine, j\u016bs sutinkate su visais slapukais pagal m\u016bs\u0173 slapuk\u0173 politik\u0105.\">\n              \u0160ioje svetain\u0117je naudojami slapukai, siekiant pagerinti vartotojo patirt\u012f. Naudodamiesi m\u016bs\u0173 svetaine, j\u016bs sutinkate su visais slapukais pagal m\u016bs\u0173 slapuk\u0173 politik\u0105.            <\/span>\n\n            \n              \n              <a\n                id=\"cookiescript_readmore\"\n                data-cs-i18n-text=\"{&quot;lt&quot;:&quot;Skaityti daugiau&quot;}\"\n                data-cs-i18n-url=\"{&quot;lt&quot;:&quot;\\\/test&quot;}\"\n                target='_blank'                aria-label=\"Skaityti daugiau, opens a new window\"\n                href='\/test'              >\n                Skaityti daugiau              <\/a>\n                      <\/div>\n                \n        \n\n\n        <!-- END DESCRIPTION -->\n        \n      <\/div>\n    <\/div>\n    <div class=\"cookiescript_fsd_tabs\" data-cs-maintabs=\"cookiescript\">\n      <div tabindex=\"0\" role=\"button\" id=\"cookiescript_declaration\" class=\"cookiescript_active\" data-cs-maintab=\"declaration\" data-cs-i18n-text=\"{&quot;lt&quot;:&quot;Slapuk\\u0173 deklaracija&quot;}\">\n        Slapuk\u0173 deklaracija      <\/div>\n      <div tabindex=\"0\" role=\"button\" id=\"cookiescript_aboutcookies\" data-cs-maintab=\"aboutcookies\" data-cs-i18n-text=\"{&quot;lt&quot;:&quot;Apie slapukus&quot;}\">\n        Apie slapukus      <\/div>\n          <\/div>\n    <div class=\"cookiescript_fsd_tabs_content\">\n      <div id=\"cookiescript_declarationwrap\" data-cs-maintab-content=\"declaration\">\n              <\/div>\n      <div id=\"cookiescript_aboutwrap\" class=\"cookiescript_hidden\" data-cs-maintab-content=\"aboutcookies\">\n        <span data-cs-i18n-text=\"{&quot;lt&quot;:&quot;Slapukai yra ma\\u017ei tekstiniai failai, kuriuos \\u012f j\\u016bs\\u0173 kompiuter\\u012f \\u012fdeda j\\u016bs\\u0173 lankomos svetain\\u0117s. Svetain\\u0117se naudojami slapukai, siekiant pad\\u0117ti vartotojams efektyviai nar\\u0161yti ir atlikti tam tikras funkcijas. Slapukus, kuri\\u0173 reikia, kad svetain\\u0117 tinkamai veikt\\u0173, leid\\u017eiama nustatyti be j\\u016bs\\u0173 leidimo. Visi kiti slapukai turi b\\u016bti patvirtinti, kad juos b\\u016bt\\u0173 galima nustatyti nar\\u0161ykl\\u0117je.&lt;br \\\/&gt;\\r\\n&lt;br \\\/&gt;\\r\\nPrivatumo politikos puslapyje bet kuriuo metu galite pakeisti savo sutikim\\u0105 d\\u0117l slapuk\\u0173 naudojimo.&quot;}\">\n          Slapukai yra ma\u017ei tekstiniai failai, kuriuos \u012f j\u016bs\u0173 kompiuter\u012f \u012fdeda j\u016bs\u0173 lankomos svetain\u0117s. Svetain\u0117se naudojami slapukai, siekiant pad\u0117ti vartotojams efektyviai nar\u0161yti ir atlikti tam tikras funkcijas. Slapukus, kuri\u0173 reikia, kad svetain\u0117 tinkamai veikt\u0173, leid\u017eiama nustatyti be j\u016bs\u0173 leidimo. Visi kiti slapukai turi b\u016bti patvirtinti, kad juos b\u016bt\u0173 galima nustatyti nar\u0161ykl\u0117je.<br \/>\r\n<br \/>\r\nPrivatumo politikos puslapyje bet kuriuo metu galite pakeisti savo sutikim\u0105 d\u0117l slapuk\u0173 naudojimo.        <\/span>\n                        <div style=\"display: none;\" data-cs-consent-key-box=\"cookie-script\">\n          <span data-cs-i18n-text=\"{&quot;lt&quot;:&quot;Slapuk\\u0173 sutikimo ID&quot;}\">\n            Slapuk\u0173 sutikimo ID          <\/span>:\n          <span data-cs-consent-key=\"cookie-script\"><\/span>\n        <\/div>\n      <\/div>\n          <\/div>\n    <div class=\"cookiescript_fsd_footer\">\n      <div id=\"cookiescript_buttons\">\n        <div id=\"cookiescript_accept\" tabindex=\"0\" role=\"button\" data-cs-i18n-text=\"{&quot;lt&quot;:&quot;A\\u0161 sutinku&quot;}\">\n          A\u0161 sutinku        <\/div>\n        <div id=\"cookiescript_reject\" tabindex=\"0\" role=\"button\" data-cs-i18n-text=\"{&quot;lt&quot;:&quot;A\\u0161 nesutinku&quot;}\">\n          A\u0161 nesutinku        <\/div>\n        <div id=\"cookiescript_save\" tabindex=\"0\" role=\"button\" data-cs-i18n-text=\"{&quot;lt&quot;:&quot;I\\u0161saugoti ir u\\u017edaryti&quot;}\">\n          I\u0161saugoti ir u\u017edaryti        <\/div>\n      <\/div>\n              <div class=\"cookiescript_fsd_reportby\"  role=\"contentinfo\">\n            Cookie <a id=\"cookiescript_fsd_reportlink\"  href=\"https:\/\/cookie-script.com\/cookie-report?identifier=f472ea6774c82a9e91072387ee04c5d5\" target=\"_blank\" aria-label=\"report, opens a new window\">report<\/a> created by <a href=\"https:\/\/cookie-script.com\" id=\"cookiescript_fsd_cookiescriptlink\" title=\"CookieScript Consent Management Platform\" target=\"_blank\" aria-label=\"CookieScript Consent Management Platform, opens a new window\">CookieScript<\/a>\n        <\/div>\n          <\/div>\n  <\/div>\n  \n<\/div>\n";
    var cookieConsentName = 'CookieScriptConsent';
    var expireDays = 30;
    var currentUrl = window.location.href;
    var cookieId = '87535e6549447f08ecc25b51d950a58a';
    var scrollFired = false;
    var groupedCookies = [];
    var groupedResetCookies = [];
    var groupedStorages = [];
    var allCookieNames = [];
    var allCategory = [];
    var isPresentStrictly = 0;
    var domainHost = 'wordpress.com';
    var subDomainParent = '';
    var removeNameCookies = [];
    var removeCookies = {};
    var removeStorages = [];
    var applyGoogleConsentModeAfterLoad = false;
    var applyFacebookConsentModeAfterLoad = false;
    var applyMicrosoftConsentModeAfterLoad = false;
    var cmpId = '0';
    var iabSdkUrl = '';
    var iabVendorsIds = [];
    var googleVendorsIds = null;
    var iabLegIntPurposes = [];
    var iabText = null;
    var iabTextTranslations = null;
    var waitCollectConsents = false;
    var allowAnalyticsCookies = [];
    var pushGaAnonymizeIp = false;
    var isBuildIABView = false;
    var defLangCode = 'lt';
    var isAddEventListerForOutLanguageSelect = false;
    var delay = Number(0);
    var pushDefaultGoogleConsentMode = false;
    var pushDefaultMicrosoftConsentMode = false;
    var loadApply = false;
    var currentPlugin = null;
    var cookieSameSite = '';
    var googleConsentEnabled = Boolean('');
    var shopifyEventsEnabled = Boolean('')
    var showEvent = 'load'
    var showReadyState = ["complete"]    /* Private function */

    var _acceptAllAction = function() {
          var analyticsType = 'acceptall';
      var cookiesCategoriesForTrack = _cookiesCategoriesWithoutStrict(allCategory);
      var isFirstActionPresent = _isHasCookieAction();

      _writeInnerCookieParam('action', 'accept');
            _allowCookies();
      _setReportPagesCheckboxes(allCategory);
      _resetCookies(allCategory);
      _resetStorages(allCategory);
      _callShopifyApi(true, allCategory);
      _writeInnerCookieParam('categories', JSON.stringify(cookiesCategoriesForTrack));
            _updateFacebookConsentMode(true);
      _updateGoogleConsentMode(true);
      _updateMicrosoftConsentMode(true);
      _updateMicrosoftClarity(true);

      _sendCollectConsents('accept', cookiesCategoriesForTrack.join(','));
      if(isFirstActionPresent) {
        _sendAnalytics(analyticsType, '');
      } else {
        _sendAnalytics('first'+ analyticsType, '');
      }
      _setConsentCheckbox(true);
      _showBadge();
      _dispatchAcceptAllEvent();
      _setCrossDomainConsent()
      _reloadPage();

      _iabCMP('selectAll')
        }

    var _acceptAction = function(allowCategory, loadGPC) {
              var isFirstActionPresent = _isHasCookieAction();
      var cookiesCategoriesForTrack = _cookiesCategoriesWithoutStrict(allowCategory);
      if (allowCategory.length === allCategory.length) {
        _allowCookies();
        _updateFacebookConsentMode(true);
        _updateGoogleConsentMode(true);
        _updateMicrosoftConsentMode(true);
        _updateMicrosoftClarity(true);
      } else {
        _allowCookies(allowCategory);
        _updateFacebookConsentMode(true, allowCategory);
        _updateGoogleConsentMode(true, allowCategory);
        _updateMicrosoftConsentMode(true, allowCategory);
        _updateMicrosoftClarity(true, allowCategory);
      }
      _callShopifyApi(true, allowCategory);
      _resetCookies(allowCategory);
      _resetStorages(allowCategory);

      // Remove cookies that now allow
      _rejectCookies(allowCategory);
      // Remove storages that now allow
      _rejectStorages(allowCategory);
      if (cookiesCategoriesForTrack.length > 0) {
        _writeInnerCookieParam('action', 'accept');
        _writeInnerCookieParam('categories', JSON.stringify(cookiesCategoriesForTrack));
        _sendCollectConsents('accept', cookiesCategoriesForTrack.join(','));
        if(isFirstActionPresent) {
          _sendAnalytics('accept', cookiesCategoriesForTrack.join(','));
        } else {
          _sendAnalytics('firstaccept', cookiesCategoriesForTrack.join(','));
        }
      } else {
        _writeInnerCookieParam('action', 'reject');
        _writeInnerCookieParam('categories', []);
        _sendCollectConsents('reject', '');
        if(isFirstActionPresent) {
          _sendAnalytics('reject', '');
        } else {
          _sendAnalytics('firstreject', '');
        }
      }

      if(loadGPC !== 'undefined' && loadGPC === true) {
        return;
      }

      _iabCMP('setOnlyChecked')
      _setConsentCheckbox(allowCategory.length === allCategory.length);
      _showBadge();
      _dispatchAcceptEvent(allowCategory);
      _setCrossDomainConsent()
      _reloadPage();
            }

    var _rejectAllAction = function () {
          var isFirstActionPresent = _isHasCookieAction();
      if(isFirstActionPresent) {
        _sendAnalytics('reject', '');
      } else {
        _sendAnalytics('firstreject', '');
      }
      _writeInnerCookieParam('action', 'reject');
      _writeInnerCookieParam('categories', JSON.stringify([]));
      _sendCollectConsents('reject', '');
      _rejectCookies();
      _rejectStorages();
      _iabCMP('rejectAll');
      _setConsentCheckbox(false);
      _showBadge();
      _dispatchRejectEvent();
      _setCrossDomainConsent()
      _callShopifyApi(false);
      _reloadPage();
      _updateFacebookConsentMode(false);
      _updateGoogleConsentMode(false);
      _updateMicrosoftConsentMode(false);
      _updateMicrosoftClarity(false);

        }

    var _loadCheckboxValues = function (previousUIValue) {
            if(typeof previousUIValue !== 'undefined') {
        _setCheckboxesByCategories(previousUIValue);
        return
      }

                  if (_isAcceptCookieAction()) {
        var categories = _readCategoriesCheckboxesFromCookies();
        _setCheckboxesByCategories(categories);
      }
      
          }

    var _changeSelectedLanguageForLanguageSelector = function (code) {
            return false;
          }

    var _applyTranslationByCodeLang = function (code, options) {
      
      if (options === undefined) {
        options = {};
      }
      var currentLanguage = code
      if (code === 'def_cookie_lang') {
        currentLanguage = defLangCode;
      }

      var translateTextElementsNodes = options['nodeScope'] ? options['nodeScope'].querySelectorAll('[data-cs-i18n-text]') : document.querySelectorAll('[data-cs-i18n-text]');
      var translateUrlElementsNodes = options['nodeScope'] ? options['nodeScope'].querySelectorAll('[data-cs-i18n-url]') : document.querySelectorAll('[data-cs-i18n-url]');
      var translateTableLabelElementsNodes = options['nodeScope'] ? options['nodeScope'].querySelectorAll('[data-cs-i18n-table-label]') : document.querySelectorAll('[data-cs-i18n-table-label]');
      var translateTextElements;
      var translateUrlElements;
      var translateTableLabelElements;
      if (typeof translateTextElementsNodes !== 'undefined') {
        translateTextElements = Array.prototype.slice.call(translateTextElementsNodes);
        for (var it = 0; it < translateTextElements.length; it++) {
          var elementText = translateTextElements[it];
          try {
            var translateText = JSON.parse(elementText.getAttribute('data-cs-i18n-text'));
            if (translateText && translateText[currentLanguage] && translateText[currentLanguage].length > 0) {
              elementText.innerHTML = translateText[currentLanguage].replace(/&#39;/g, "'");
              if (elementText.getAttribute('data-cs-i18n-read')) {
                elementText.setAttribute('data-cs-i18n-read', translateText[currentLanguage]);
              }
            } else if (translateText && translateText[defLangCode] && translateText[defLangCode].length > 0) {
              elementText.innerHTML = translateText[defLangCode].replace(/&#39;/g, "'");
              if (elementText.getAttribute('data-cs-i18n-read')) {
                elementText.setAttribute('data-cs-i18n-read', translateText[defLangCode]);
              }
            }
          } catch (e) {
          }
        }
      }

      if (typeof translateUrlElementsNodes !== 'undefined') {
        translateUrlElements = Array.prototype.slice.call(translateUrlElementsNodes);
        for (var iu = 0; iu < translateUrlElements.length; iu++) {
          var elementUrl = translateUrlElements[iu];
          try {
            var translateUrl = JSON.parse(elementUrl.getAttribute('data-cs-i18n-url'));
            if (translateUrl && translateUrl[currentLanguage] && translateUrl[currentLanguage].length > 0) {
              elementUrl.setAttribute('href', translateUrl[currentLanguage]);
            } else if (translateUrl && translateUrl[defLangCode] && translateUrl[defLangCode].length > 0) {
              elementUrl.setAttribute('href', translateUrl[defLangCode]);
            }
          } catch (e) {
          }
        }
      }

      if (typeof translateTableLabelElementsNodes !== 'undefined') {
        translateTableLabelElements = Array.prototype.slice.call(translateTableLabelElementsNodes);

        for (var itl = 0; itl < translateTableLabelElements.length; itl++) {
          var elementTableLabel = translateTableLabelElements[itl];
          try {
            var translateTableLabel = JSON.parse(elementTableLabel.getAttribute('data-cs-i18n-table-label'));
            if (translateTableLabel && translateTableLabel[currentLanguage] && translateTableLabel[currentLanguage].length > 0) {
              elementTableLabel.setAttribute('label', translateTableLabel[currentLanguage]);
            } else if (translateTableLabel && translateTableLabel[defLangCode] && translateTableLabel[defLangCode].length > 0) {
              elementTableLabel.setAttribute('label', translateTableLabel[defLangCode]);
            }
          } catch (e) {
          }
        }
      }
      _iabCMP('applyTranslations', currentLanguage);
      _this.currentLang = currentLanguage;

          }

    var _applyTranslation = function (nodeScope) {
            _this.currentLang = "lt";
      return false;
          }

    var _addLabelToReportTable = function () {
      var tables = document.querySelectorAll('table[data-cs-table-report="cookiescript"]')
      Array.prototype.slice.call(tables).forEach(function (table) {
        var thEls = table.querySelectorAll('thead th');
        var tdLabels = [];
        var tdTranslateForLabels = [];
        Array.prototype.slice.call(thEls).forEach(function (element) {
          tdLabels.push(element.innerText);
          tdTranslateForLabels.push(element.getAttribute('data-cs-i18n-text'));
        });
        var trEls = table.querySelectorAll('tbody tr');
        Array.prototype.slice.call(trEls).forEach(function (trEl) {
          Array.prototype.slice.call(trEl.children).forEach(function (td, ndx) {
            td.setAttribute('label', tdLabels[ndx])
            td.setAttribute('data-cs-i18n-table-label', tdTranslateForLabels[ndx])
          });
        });
      });
    }

    var _setFocusFirst = function () {
      document.addEventListener('keydown', function(event) {
        if (event.key === 'Tab') {
          var container = document.getElementById('cookiescript_injected');
          if (container) {
            event.preventDefault();
            event.stopPropagation();
            container.focus();
          }
        }
      }, {once: true});
    }

    var _focusRestrict = function (event) {
            return false;
          }

    var _addListenerFocusRestrict = function () {
            return false;
          }

    var _removeListenerFocusRestrict = function () {
            return false;
          }

    var _showBanner = function () {
      _hideBadge()
      var banner = document.querySelector('[data-cs-id="cookiescript_injected"]');
      if (banner) {
        setTimeout(function () {
          _fadeIn(banner, 200, _setFocusFirst)
        }, 200);
        _addListenerFocusRestrict(); // block focus on banner if have param
        _addNoScrollStyles();
      } else {
        setTimeout(function () {
          _addBanner()
        }, 150);
      }

          }

    var _hideBanner = function (delay) {
      var banner = document.querySelector('[data-cs-id="cookiescript_injected"]');
      var fsdBanner = document.getElementById('cookiescript_injected_fsd');
      if (banner) {
        _fadeOut(banner, delay || 200);
        _hideManage();
      }

      if (fsdBanner) {
        _fadeOut(fsdBanner, 200, function () {
          fsdBanner.parentNode.removeChild(fsdBanner);
        });
      }

            _removeListenerFocusRestrict();
      _removeNoScrollStyles();
    }

    var _showBadge = function () {
      
            var badge = document.getElementById('cookiescript_badge');
      if (badge) {
        setTimeout(function () {
          _fadeIn(badge, 200)
        }, 200);
      } else {
        _addBadge();
      }
          }

    var _hideBadge = function (delay) {
      
            var badge = document.getElementById('cookiescript_badge');
      if (badge) {
        _fadeOut(badge, delay || 200);
      }
          }

    var _showManage = function () {
            var content = document.getElementById('cookiescript_cookietablewrap');
      if (content && content.classList.contains('cookiescript_hidden')) {
        content.classList.remove('cookiescript_hidden');
      }
      var banner = document.getElementById('cookiescript_injected');
      if (banner) {
        banner.classList.add('hascookiereport');
      }
      _changeTitleManageButton(true);

      
          }

    var _hideManage = function () {
            var content = document.getElementById('cookiescript_cookietablewrap');
      if (content && !content.classList.contains('cookiescript_hidden')) {
        content.classList.add('cookiescript_hidden');
      }
      var banner = document.getElementById('cookiescript_injected');
      if (banner) {
        banner.classList.remove('hascookiereport');
      }
      _changeTitleManageButton(false);

                }

    var _changeTitleManageButton = function (isHide) {
            var showTitleEl = document.querySelector('#cookiescript_manage_wrap span[data-cs-show-title="cookie-script"]');
      var hideTitleEl = document.querySelector('#cookiescript_manage_wrap span[data-cs-hide-title="cookie-script"]');
      if (showTitleEl && hideTitleEl) {
        if (isHide) {
          _fadeOut(showTitleEl, 1);
          _fadeIn(hideTitleEl, 1);
        } else {
          _fadeOut(hideTitleEl, 1);
          _fadeIn(showTitleEl, 1);
        }
      }
          }

    var _addEventForEnterSpace = function(selector) {
      _addEvent(selector, 'keydown', function (event) {
        if (event.key === " " || event.key === "Enter" || event.key === "Spacebar") {
          event.preventDefault();
          event.currentTarget.click();
        }
      }, true)
    }

    var _tabClickEvent = function (event, nameTabAttr, nameTabContentAttr) {
      var target = event.target || event.srcElement;
      var typeTab = target.getAttribute(nameTabAttr);
      if (typeTab && typeTab.length > 0) {
        var tabsContent = document.querySelectorAll('div[' + nameTabContentAttr + ']');
        if (tabsContent) {
          for (var i = 0; i < tabsContent.length; i++) {
            var tabContent = tabsContent[i];
            var tabContentType = tabContent.getAttribute(nameTabContentAttr);
            var isNowActive = tabContentType && tabContentType === typeTab
            var tab = document.querySelector('div[' + nameTabAttr + '="' + tabContentType + '"]');
            if (tab) {
              tab.classList.remove('cookiescript_active');
              isNowActive && tab.classList.add('cookiescript_active');
            }
            tabContent.classList.add('cookiescript_hidden');
            isNowActive && tabContent.classList.remove('cookiescript_hidden');

          }
        }
      }
    }

    var _showConsentKey = function () {
            var consentKeyBox = document.querySelector('[data-cs-consent-key-box="cookie-script"]');
      var consentKey = document.querySelector('[data-cs-consent-key="cookie-script"]');
      if (consentKeyBox && consentKey) {
        var key = _readInnerCookieParam('key');
        if (key && typeof key === 'string' && key.length > 0) {
          consentKey.innerText = key;
          consentKeyBox.style.display = '';
        }
      }
          }

    var _showFullScreenManage = function () {
            var banner_element = document.querySelector('[data-cs-id="cookiescript_injected"]');
      var valueFromBanner;
      if(_isHasSmallBannerCheckbox()) {
        valueFromBanner = _readCategoriesCheckboxesFromUI();
      }
      if (banner_element) {
        banner_element.parentNode.removeChild(banner_element);
      }
      _addFsdBanner(valueFromBanner)
          }

    var _addSwitchesEvents = function () {
      var switches = _categoriesSwitches()

      var checkedSwitch = function (el) {
        el.classList.remove("mdc-switch--unselected")
        el.classList.add("mdc-switch--selected")
      }

      var uncheckedSwitch = function (el) {
        el.classList.remove("mdc-switch--selected")
        el.classList.add("mdc-switch--unselected")
      }

      _addEvent(switches, 'click', function (e) {
        var el = e.currentTarget;
        var checked;
        var value = el.getAttribute('data-cs-switch');
        if (el.classList.contains('mdc-switch--selected')) {
          uncheckedSwitch(el)
          checked = false;
        } else {
          checkedSwitch(el)
          checked = true;
        }

        var checkbox = document.querySelector('input[data-cookiescript="checkbox-input"][value="' + value + '"]');
        if (value === 'strict') {
          checkbox.checked = true;
        } else {
          checkbox.checked = checked;
        }

        

      }, true)

      var checkboxes = _categoriesCheckboxes();
      _addEvent(checkboxes, 'change', function (e) {
        var checkbox = e.currentTarget;
        switches.forEach(function (switchElm) {
          if (checkbox.value === switchElm.getAttribute('data-cs-switch')) {
            if (checkbox.checked) {
              checkedSwitch(switchElm)
            } else {
              uncheckedSwitch(switchElm)
            }
          }
        });
      }, true)
    }

    var _addCommonListerEventsForBanner = function () {
      var saveButton = document.getElementById('cookiescript_save');
      var acceptButton = document.getElementById('cookiescript_accept');
      var rejectButton = document.getElementById('cookiescript_reject');
      var closeButton = document.getElementById('cookiescript_close');

      _addEvent(saveButton, 'click', function () {
        _this.acceptAction();
      })
      _addEvent(saveButton, 'keydown', function (event) {
        if (event.key === " " || event.key === "Enter" || event.key === "Spacebar") {
          event.preventDefault();
          saveButton.click()
        }
      })

      _addEvent(acceptButton, 'click', function () {
        _this.acceptAllAction();
      })
      _addEvent(acceptButton, 'keydown', function (event) {
        if (event.key === " " || event.key === "Enter" || event.key === "Spacebar") {
          event.preventDefault();
          acceptButton.click()
        }
      })

      _addEvent(rejectButton, 'click', function () {
        _this.rejectAllAction();
      })
      _addEvent(rejectButton, 'keydown', function (event) {
        if (event.key === " " || event.key === "Enter" || event.key === "Spacebar") {
          event.preventDefault();
          rejectButton.click()
        }
      })

      _addEvent(document.getElementById('cookiescript_readmore'), 'click', function () {
        _sendAnalytics('readmore', '');
      })

      _addEvent(closeButton, 'click', function () {
                _hideBanner();
        _showBadge();
        _sendAnalytics('close', '');
        _dispatchCloseEvent();
              })

      _addEvent(closeButton, 'keydown', function (event) {
        if (event.key === " " || event.key === "Enter" || event.key === "Spacebar") {
          event.preventDefault();
          closeButton.click()
        }
      })
      var mainTabSelector = document.querySelectorAll('div[data-cs-maintabs="cookiescript"] > div');

      _addEvent(mainTabSelector, 'click', function (event) {
        _tabClickEvent(event, 'data-cs-maintab', 'data-cs-maintab-content');
      }, true)
      _addEventForEnterSpace(mainTabSelector)

      _showConsentKey();
      window.addEventListener('CookieScriptConsentKeyUpdate', _showConsentKey);

      
          }

    var _addListerEventsForBanner = function () {
      
      var checkboxes = _categoriesCheckboxes();

      var callbackEvent = function () {
        var acceptButton = document.getElementById('cookiescript_accept');
        var saveButton = document.getElementById('cookiescript_save');
        if (!acceptButton.classList.contains('cookiescript_hidden')) {
          acceptButton.classList.add('cookiescript_hidden');
          acceptButton.classList.add('cookiescript_bigger');
          saveButton.classList.add('cookiescript_bigger');
          setTimeout(function () {
            acceptButton.style.display = 'none';
            saveButton.style.display = 'inline-block';
            saveButton.classList.remove('cookiescript_bigger');
          }, 100);
        }
      }

      for (var i = 0; i < checkboxes.length; i++) {
        var checkBox = checkboxes[i];
        _addEvent(checkBox, 'click', function (e) {
          callbackEvent();
          
        })
      }

      
      
            var showMangeButton = document.getElementById('cookiescript_manage_wrap');

      _addEvent(showMangeButton, 'click', function () {
                _showFullScreenManage();
              })

      _addEvent(showMangeButton, 'keydown', function (event) {
        if (event.key === " " || event.key === "Enter" || event.key === "Spacebar") {
          event.preventDefault();
          showMangeButton.click()
        }
      })

      var tabSelector = document.querySelectorAll('div[data-cs-tabs="cookiescript"] > div')
      _addEvent(tabSelector, 'click', function (event) {
        _tabClickEvent(event, 'data-cs-tab', 'data-cs-tab-content');
      }, true)
      _addEventForEnterSpace(tabSelector)

      _addListenerFocusRestrict();
          }

    var _addListerEventsForFsdBanner = function () {
            _addSwitchesEvents()
            var cookieInfoControlSelector = document.querySelectorAll('[data-cs-cookies-info-control]');
      _addEvent(cookieInfoControlSelector, 'click', function (e) {
        var el = e.currentTarget;
        var value = el.getAttribute('data-cs-cookies-info-control');
        var content = document.querySelector('[data-cs-cookies-info="' + value + '"]');

        if (el.classList.contains('active')) {
          content.classList.add('cookiescript_hidden')
          el.querySelector('[data-cs-cookies-open-text]').classList.remove('cookiescript_hidden');
          el.querySelector('[data-cs-cookies-close-text]').classList.add('cookiescript_hidden');
          el.classList.remove('active')
        } else {
          content.classList.remove('cookiescript_hidden')
          el.querySelector('[data-cs-cookies-open-text]').classList.add('cookiescript_hidden');
          el.querySelector('[data-cs-cookies-close-text]').classList.remove('cookiescript_hidden');
          el.classList.add('active')
        }
      }, true)
      _addEventForEnterSpace(cookieInfoControlSelector)

      //IAB
      if (!isBuildIABView) {
        _iabCMPBuildView();
        isBuildIABView = true;
      }
    }

    var _addFsdBanner = function (previousUIValue) {
            _appendHtml(document.body, fullScreenDetailsHtml)
      _applyTranslation();
      _addLabelToReportTable();
      var fullScreenDetails = document.getElementById('cookiescript_injected_fsd');
      _fadeIn(fullScreenDetails, 200);

      _addCommonListerEventsForBanner()
      _addListerEventsForFsdBanner()

      _loadCheckboxValues(previousUIValue);
      _changeSelectedLanguageForLanguageSelector(_this.currentLang)
      _addNoScrollStyles(true);

                }

    var _addBanner = function (container) {
      _appendHtml(container ? container : document.body, html);
      _applyTranslation();
      _addLabelToReportTable();
      var banner = document.getElementById('cookiescript_injected');
      _fadeIn(banner, 200, _setFocusFirst);

      _addCommonListerEventsForBanner()
      _addListerEventsForBanner()
      _loadCheckboxValues();
      _addNoScrollStyles();

          }

    var _addBadge = function () {
      if (badgeHtml.length > 0) {
        _appendHtml(document.body, badgeHtml);
        var badge = document.getElementById('cookiescript_badge');
        setTimeout(function () {
          _applyTranslation(badge);
          _fadeIn(badge, 200)
        }, 200);

        _addEvent(badge, 'click', function () {
          _showBanner();
        })

        _addEvent(badge, 'keydown', function (event) {
          if (event.key === " " || event.key === "Enter" || event.key === "Spacebar") {
            event.preventDefault();
            badge.click()
          }
        })

              }
    }

    var _addNoScrollStyles = function (important) {
          }

    var _removeNoScrollStyles = function () {
          }

    var _iabCMPBuildView = function () {
            return false;
          }

    var _removeSelfHtml = function () {
      var css_element = document.querySelector('style[data-type="cookiescriptstyles"]');
      var banner_element = document.querySelector('[data-cs-id="cookiescript_injected"]');
      var badge_element = document.getElementById('cookiescript_badge');
      var banner_fsd_element = document.getElementById('cookiescript_injected_fsd');
      if (banner_element) {
        banner_element.parentNode.removeChild(banner_element);
      }
      if (banner_fsd_element) {
        banner_fsd_element.parentNode.removeChild(banner_fsd_element);
      }
      if (badge_element) {
        badge_element.parentNode.removeChild(badge_element);
      }
      if (css_element) {
        css_element.parentNode.removeChild(css_element);
      }
      
      _removeListenerFocusRestrict()
    }

    var _setAltForIframes = function () {
      var iframeNodes = document.querySelectorAll('iframe[data-cookiescript="accepted"]');
      var iframes = Array.prototype.slice.call(iframeNodes);
      if (iframes.length > 0) {
        for (var i = 0; i < iframes.length; i++) {
          var iframe = iframes[i];
          if (!iframe.getAttribute('src')) {
            var alt = iframe.getAttribute('alt') || '';
            var imgAlt = iframe.getAttribute('data-alt-img');
            var writeParam = alt;
            if (imgAlt) {
              writeParam = '<img alt="' + alt + '" src="' + imgAlt + '" />'
            }
            var ifrm = (iframe.contentWindow) ? iframe.contentWindow : (iframe.contentDocument.document) ? iframe.contentDocument.document : iframe.contentDocument;
            ifrm.document.open();
            ifrm.document.write(writeParam);
            ifrm.document.close();
          }
        }
      }
    }

    // manage-consent-on-cookie-policy
    var _setConsentCheckbox = function (value) {
      var checkBox = document.getElementById('csconsentcheckbox');
      if (checkBox) {
        checkBox.checked = value;
      }
    }

    // manage-consent-on-cookie-policy
    var _setConsentCheckboxAndLinkEvent = function () {
      var checkBox = document.getElementById('csconsentcheckbox');
      _addEvent(checkBox, 'change', function (event) {
        var target = event.target || event.srcElement
        if (target.checked) {
          _this.acceptAllAction();
        } else {
          _this.rejectAllAction();
        }
      })

      var link = document.getElementById('csconsentlink');
      _addEvent(link, 'click', function () {
        _showBanner();
      })

      var linkByClass = document.getElementsByClassName('csconsentlink');
      _addEvent(linkByClass, 'click', function () {
        _showBanner();
      }, true)
    }

    var _setScrollEvent = function () {
            return false;
          }

    var _callHideAfterEffect = function () {
            return false;
          }

    var _callAcceptCookiesAfterEffect = function () {
            return false;
          }

    var _callShowOncePageEffect = function () {
            return false;
          }

    var _categoriesSwitches = function () {
      var switchNodes = document.querySelectorAll('[data-cs-switch]');
      if (typeof switchNodes !== 'undefined') {
        return Array.prototype.slice.call(switchNodes);
      }
      return [];
    }

    var _categoriesCheckboxes = function () {
      var checkboxNodes = document.querySelectorAll('input[data-cookiescript="checkbox-input"]');
      if (typeof checkboxNodes !== 'undefined') {
        return Array.prototype.slice.call(checkboxNodes);
      }
      return [];
    }

    var _isHasSmallBannerCheckbox = function () {
      var checkboxNodes = document.querySelectorAll('input[data-cookiescript="checkbox-input"]');
      if (typeof checkboxNodes !== 'undefined' && checkboxNodes.length > 0) {
        return true;
      }
      return false;
    }

    var _cookiesCategoriesWithoutStrict = function (categories) {
      var array = [];
      for (var i = 0; i < categories.length; i++) {
        if (categories[i] !== 'strict') {
          array.push(categories[i]);
        }
      }
      return array;
    }

    var _setAllCheckboxesValue = function (value) {
      var checkboxes = _categoriesCheckboxes();
      for (var i = 0; i < checkboxes.length; i++) {
        var checkbox = checkboxes[i];
        if (checkbox.value === 'strict') {
          checkbox.checked = true;
        } else {
          checkbox.checked = value;
        }

        _dispatchEvent('change', checkbox)
      }
    }

    var _setCheckboxesByCategories = function (categories) {
      var checkboxes = _categoriesCheckboxes();
      for (var i = 0; i < checkboxes.length; i++) {
        var checkbox = checkboxes[i];
        if (checkbox.value === 'strict' || _includes(categories, checkbox.value)) {
          checkbox.checked = true;
        } else {
          checkbox.checked = false;
        }
        _dispatchEvent('change', checkbox)
      }
    }

    var _setReportPagesCheckboxes = function (categories) {
      if (typeof CookieScriptReport !== 'undefined' && CookieScriptReport.instance) {
        CookieScriptReport.instance.setStateCheckboxes(categories)
      }
    }

    var _readCategoriesCheckboxesFromUI = function () {
      var allowCategories = [];
      var checkboxes = _categoriesCheckboxes();
      for (var i = 0; i < checkboxes.length; i++) {
        var checkbox = checkboxes[i];
        if (checkbox.checked || checkbox.value === 'strict') {
          allowCategories.push(checkbox.value)
        }
      }
      return _uniqueArray(allowCategories);
    }

    var _dispatchDOMContentLoadedEvent = function () {
      _dispatchEvent('DOMContentLoaded', window.document)
    }

    var _dispatchAcceptAllEvent = function () {
      _this.onAcceptAll();
      _dispatchCustomEvent('CookieScriptAcceptAll');
      _dispatchCustomEvent('CookieScriptCurrentState', _this.currentState());
      if (typeof allCategory !== 'undefined' && allCategory.length > 0) {
        _dispatchCookieScriptConsentUpdated(allCategory)
        for (var i = 0; i < allCategory.length; i++) {
          _dispatchCategoryEvent(allCategory[i]);
        }
      } else {
        _dispatchCategoryEvent('all');
        _dispatchCookieScriptConsentUpdated([])
      }
    }

    var _dispatchAcceptEvent = function (categories) {
      var data = {categories: _uniqueArray(categories)}
      _this.onAccept(data);
      _dispatchCustomEvent('CookieScriptAccept', data);
      _dispatchCustomEvent('CookieScriptCurrentState', _this.currentState());
      _dispatchCookieScriptConsentUpdated(categories)
      for (var i = 0; i < categories.length; i++) {
        _dispatchCategoryEvent(categories[i]);
      }
    }

    var _dispatchRejectEvent = function () {
      _this.onReject();
      _dispatchCustomEvent('CookieScriptReject');
      _dispatchCustomEvent('CookieScriptCurrentState', _this.currentState());
      _dispatchCategoryEvent('strict')
      _dispatchCookieScriptConsentUpdated(['strict'])
    }

    var _dispatchCloseEvent = function () {
      _this.onClose();
      _dispatchCustomEvent('CookieScriptClose');
    }

    var _dispatchCategoryEvent = function (category) {
            var eventName = 'CookieScriptCategory-' + category;
      if (_includes(_this.dispatchEventNames, eventName)) return;

      _this.dispatchEventNames.push(eventName);
      _this.dispatchEventNames = _uniqueArray(_this.dispatchEventNames);
      _dispatchCustomEvent(eventName);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event': eventName
      });
          }

    var _dispatchCookieScriptConsentUpdated = function(categories) {
              var listCategories = categories.join(',')
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event': 'CookieScriptConsentUpdated[' + listCategories + ']'
        });
            }

    var _dispatchCookieScriptGoogleConsentUpdated = function() {
            window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event': 'CookieScriptGoogleConsentUpdated'
      });
          }

    var _dispatchCustomEvent = function (eventName, data) {
            try {
        var event;
        if (typeof (Event) === 'function') {
          event = new CustomEvent(eventName, {bubbles: true, cancelable: true, detail: data});
        } else {
          event = document.createEvent('CustomEvent');
          event.initCustomEvent(eventName, true, true, data);
        }
        window.document.dispatchEvent(event);
      } catch (e) {
        _log('Warning: You browser not support dispatch event');
      }
          }

    var _dispatchEvent = function (eventName, element) {
      try {
        var event;
        if (typeof (Event) === 'function' && Event.prototype.hasOwnProperty('target')) {
          event = new Event(eventName, {bubbles: true, cancelable: true});
        } else {
          event = document.createEvent('Event');
          event.initEvent(eventName, true, true);
        }
        element.dispatchEvent(event);
      } catch (e) {
        _log('Warning: You browser not support dispatch event');
      }
    }

    var _fadeIn = function (element, duration, callback) {
      var opacityElement = _getStyle(element, 'opacity');
      var maxOpacity = opacityElement ? opacityElement : 1
      element.style.opacity = 0;
      element.style.display = '';
      var last = +new Date();
      var tick = function () {
        element.style.opacity = +element.style.opacity + (new Date() - last) / duration;
        last = +new Date();
        if (+element.style.opacity < maxOpacity) {
          (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
        } else {
          element.style.opacity = '';
          if (callback !== undefined) {
            callback()
          }
        }
      };
      tick();
    }

    var _fadeOut = function (element, duration, callback) {
      var opacityElement = _getStyle(element, 'opacity');
      element.style.opacity = opacityElement ? opacityElement : 1;
      var last = +new Date();
      var tick = function () {
        element.style.opacity = +element.style.opacity - (new Date() - last) / duration;
        last = +new Date();
        if (+element.style.opacity > 0) {
          (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
        } else {
          element.style.display = 'none';
          element.style.opacity = '';
          if (callback !== undefined) {
            callback()
          }
        }
      };
      tick();
    }

    var _includes = function (container, value) {
      var returnValue = false;
      var pos = container.indexOf(value);
      if (pos >= 0) {
        returnValue = true;
      }
      return returnValue;
    }

    var _appendNodeAfterAndRemove = function (selector, node) {
      if(selector) {
        selector.insertAdjacentElement('afterend', node);
        selector.parentNode.removeChild(selector);
      }
    }

    var _appendAfterAndRemove = function (selector, text) {
      if(selector) {
        selector.insertAdjacentHTML('afterend', text);
        selector.parentNode.removeChild(selector);
      }
    }

    var _appendHtml = function (selector, text) {
      if(selector) {
        selector.insertAdjacentHTML('beforeend', text);
      }
    }

    var _uniqueArray = function (array) {
      var uniqArray = [];
      for (var i = 0; i < array.length; i++) {
        if (uniqArray.indexOf(array[i]) === -1 && array[i] !== '') {
          uniqArray.push(array[i]);
        }
      }
      return uniqArray;
    }

    var _log = function (e) {
      console && ('function' == typeof console.warn ? console.warn(e) : console.log && console.log(e));
    }


    // Use this function for add listener event, because IE6-8 not support addEventListener
    var _addEvent = function (element, type, fn, multi) {
      var addEvent = function (element, type, fn) {
        if (!element) return;
        try {
          if (element.attachEvent) {
            element['e' + type + fn] = fn;
            element[type + fn] = function () {
              element['e' + type + fn](window.event);
            }
            element.attachEvent('on' + type, element[type + fn]);
          } else {
            element.addEventListener(type, fn, false);
          }
        } catch (e) {
        }
      }

      if (multi && element && element.length > 0) {
        for (var i = 0; i < element.length; i++) {
          addEvent(element[i], type, fn)
        }
      } else {
        addEvent(element, type, fn)
      }
    }

    // Use this function for add listener event, because IE6-8 not support removeEventListener
    var _removeEvent = function (element, type, fn, multi) {
      var removeEvent = function (element, type, fn) {
        if (!element) return;
        if (element.detachEvent) {
          element.detachEvent('on' + type, element[type + fn]);
          element[type + fn] = null;
        } else {
          element.removeEventListener(type, fn, false);
        }
      }

      if (multi && element && element.length > 0) {
        for (var i = 0; i < element.length; i++) {
          removeEvent(element[i], type, fn)
        }
      } else {
        removeEvent(element, type, fn)
      }
    }

    var _getStyle = function (el, prop) {
      if (typeof getComputedStyle !== 'undefined') {
        return getComputedStyle(el, null).getPropertyValue(prop);
      } else {
        return el.currentStyle[prop];
      }
    }

    var _sendAnalytics = function (action, categories) {
      
          }

        //Only real

    var _cookieConsentName = function () {
      var script = document.querySelector('script[data-cs-cookiename]');
      if (script) {
        return script.getAttribute('data-cs-cookiename');
      }
      return cookieConsentName;
    }

    var _needUseGtag = function () {
      window.dataLayer = window.dataLayer || [];
      window.gtag =  window.gtag || function () {
        dataLayer.push(arguments);
      }
    }

    var _pushGaAnonymizeIp = function () {
            return false;
          }

    var _applyCurrentStateConsentMode = function (isGranted, categories) {
      if (!applyGoogleConsentModeAfterLoad) {
        if(isGranted) {
          if (categories) {
            _updateGoogleConsentMode(true, categories);
          } else {
            _updateGoogleConsentMode(true);
          }
        } else {
          _updateGoogleConsentMode(false)
        }

        if (window.gtag) {
          applyGoogleConsentModeAfterLoad = true;
        }
      }

      if (!applyMicrosoftConsentModeAfterLoad) {
        if(isGranted) {
          if (categories) {
            _updateMicrosoftConsentMode(true, categories);
          } else {
            _updateMicrosoftConsentMode(true);
          }
        } else {
          _updateMicrosoftConsentMode(false)
        }
        applyMicrosoftConsentModeAfterLoad = true;
      }

      if (!applyFacebookConsentModeAfterLoad && document.readyState === 'complete') {
        if(isGranted) {
          if (categories) {
            _updateFacebookConsentMode(true, categories);
          } else {
            _updateFacebookConsentMode(true);
          }
        } else {
          _updateFacebookConsentMode(false)
        }

        if (window.fbq) {
          applyFacebookConsentModeAfterLoad = true;
        }
      }
    }

    var _isApplyGoogleConsentModeFromTemplate = function() {
      var apply = false;
      if(window.CookieScriptData.useGoogleTemplate) {
        if(window.google_tag_data && window.google_tag_data.ics) {
          apply = window.google_tag_data.ics.usedUpdate
        }
      }
      return apply;
    }

    var _setDefaultGoogleConsentMode = function (value) {
      if(googleConsentEnabled || window.CookieScriptData.useGoogleTemplate) {
        if(!pushDefaultGoogleConsentMode) {
          var isTagManagerDefault = false
          var isDataLayerDefault = false
          if(window.google_tag_data && window.google_tag_data.ics) {
            isTagManagerDefault = window.google_tag_data.ics.usedDefault === true
          }
          if (window.dataLayer) {
            for (let i = 0; i < window.dataLayer.length; i++) {
              if(window.dataLayer[i]) {
                if(window.dataLayer[i][0] === 'consent' && window.dataLayer[i][1] === 'default') {
                  isDataLayerDefault = true
                }
              }
            }
          }

          if(isTagManagerDefault || isDataLayerDefault) {
            return
          }
          _updateGoogleConsentMode(value, undefined, 'default');
          pushDefaultGoogleConsentMode = true;
        }
      }
    }

    var _setDefaultMicrosoftConsentMode = function (value) {
        return false;
        }

    //For check permission if user use Google tag manager(this need if add new types without update template)
    var _readGoogleConsentTypeFromTagManager = function() {
      if(googleConsentEnabled || window.CookieScriptData.useGoogleTemplate) {
        if (window.google_tag_data && window.google_tag_data.ics && window.google_tag_data.ics.entries) {
          var types = Object.keys(window.google_tag_data.ics.entries);
          if (types.length > 0) {
            return types;
          }
          return false;
        }
        return false;
      }
      return false;
    }

    var _setGoogleDeveloperId = function () {
      if(googleConsentEnabled || window.CookieScriptData.useGoogleTemplate) {
        _needUseGtag();
        if (window.gtag) {
          gtag("set", "developer_id.dMmY1Mm", true)
        }
      }
    }

    var _enableShopifyApi = function () {
      _fillCurrentPluginVariable();
      if(shopifyEventsEnabled || (currentPlugin && currentPlugin === 'shopify')) {
        if(window.Shopify && window.Shopify.loadFeatures) {
          window.Shopify.loadFeatures(
            [{ name: 'consent-tracking-api', version: '0.1'}],
            function (error) {},
          );
        }
      }
    }

    var _callShopifyApi = function(allow, categories) {
      _fillCurrentPluginVariable();
      if(shopifyEventsEnabled || (currentPlugin && currentPlugin === 'shopify')) {
        if(window.Shopify && window.Shopify.customerPrivacy && window.Shopify.customerPrivacy.setTrackingConsent) {
          var _data = {
            "analytics": false,
            "marketing": false,
            "preferences": false,
            "sale_of_data" : false
          }
          if(allow) {
            if(categories) {
              _data = {
                "analytics": _includes(categories, 'performance'),
                "marketing": _includes(categories, 'targeting'),
                "preferences": _includes(categories, 'functionality'),
                "sale_of_data" : _includes(categories, 'targeting')
              }
            } else {
              _data = {
                "analytics": true,
                "marketing": true,
                "preferences": true,
                "sale_of_data" : true
              }
            }

          }
          window.Shopify.customerPrivacy.setTrackingConsent(_data, function () {});
        }
      }
    }

    var _callApplyCurrentCookiesState = function (withoutDispatchEvent) {
            _setDefaultGoogleConsentMode(false);
      _setDefaultMicrosoftConsentMode(false);
      
      _applyCurrentCookiesState(withoutDispatchEvent);
      //Sometimes need waiting
      var timeout = delay === 0 || delay > 500 ? 500 : delay;
      setTimeout(function () {
        _applyCurrentCookiesState(withoutDispatchEvent);
      }, timeout);
    }

    var _applyCurrentCookiesState = function (withoutDispatchEvent) {
      if(_isApplyGoogleConsentModeFromTemplate()) {
        applyGoogleConsentModeAfterLoad = true;
      }

      var loadAllow = function (outerCategories) {
                var categories = typeof outerCategories === 'undefined' ? allCategory : outerCategories;
        if (categories.length === allCategory.length) {
          _allowCookies();
          _applyCurrentStateConsentMode(true);
        } else {
          _allowCookies(categories);
          _applyCurrentStateConsentMode(true, categories)
        }
        _callShopifyApi(true, categories);
        if(!withoutDispatchEvent) {
          _dispatchCookieScriptConsentUpdated(categories);
          for (var i = 0; i < categories.length; i++) {
            _dispatchCategoryEvent(categories[i]);
          }
        }

        //Call this because need allow first-party cookie by category
        _rejectCookies(categories);
        _rejectStorages(categories);
              }

      var loadReject = function () {
        _rejectCookies();
        _rejectStorages();
        _callShopifyApi(false);
        if(_isHasCookieAction()) {
          _applyCurrentStateConsentMode(false);
        }
                _allowCookies(['strict']);
              }

      _pushGaAnonymizeIp();

      if (_isCookieScannerRequest()) {
        _forceAllowAll();
        return true;
      }

      if (_isHasCookieAction()) {
        if (_isAcceptCookieAction()) {
          var categories = _readCategoriesCheckboxesFromCookies();
          loadAllow(categories);
          return true;
        } else {
          loadReject();
          if(!withoutDispatchEvent) {
            _dispatchCategoryEvent('strict');
            _dispatchCookieScriptConsentUpdated(['strict']);
          }
          return true;
        }
      } else {
                loadReject();
                return true;
      }
    }

    var _reloadPage = function () {
            return false;
          }

    var _allowCookies = function (categories) {
      var attribute = categories && categories.length > 0
        ? '[data-cookiescript="accepted"][data-cookiecategory]'
        : '[data-cookiescript="accepted"]';

      _changeImgTags(attribute, categories);
      _changeScriptTags(attribute, categories);
      _changeIframeTags(attribute, categories);
      _changeEmbedTags(attribute, categories);
      _changeObjectTags(attribute, categories);
      _changeLinksTags(attribute, categories);
      _hideNoticeElements(categories);
    }

    var _rejectCookies = function (allowCategories) {
      var cookies = _cookiesApi.get();
      for (var cookie in cookies) {
        if (cookie === _cookieConsentName() || _isCookieNecessary(cookie) || _isCookiesAllow(cookie, allowCategories) || _isAnalyticCookie(cookie)) {
          continue;
        }
        removeNameCookies.push(cookie);
        removeCookies[cookie] = cookies[cookie];

        _cookiesApi.remove(cookie);
        if (_cookiesApi.get(cookie) !== 'undefined') {
          var domainParts = window.location.hostname.split(".");
          while (domainParts.length > 0 && _cookiesApi.get(cookie) !== 'undefined') {
            var possibleDomain = domainParts.join('.');
            var pathParts = location.pathname.split('/');

            var possiblePath = '/'
            _cookiesApi.remove(cookie, {path: possiblePath, domain: ""});
            _cookiesApi.remove(cookie, {path: possiblePath, domain: possibleDomain});
            _cookiesApi.remove(cookie, {path: possiblePath, domain: '.' + possibleDomain});

            while (pathParts.length > 0 && _cookiesApi.get(cookie) !== 'undefined') {
              possiblePath = pathParts.join('/');
              _cookiesApi.remove(cookie, {path: possiblePath, domain: ""});
              _cookiesApi.remove(cookie, {path: possiblePath, domain: possibleDomain});
              _cookiesApi.remove(cookie, {path: possiblePath, domain: '.' + possibleDomain});
              pathParts.pop();
            }
            domainParts.shift();
          }
        }
      }
    }

    var _resetCookies = function (categories) {
            return false;
          }

    //Remove only storages that now present after scan
    var _rejectStorages = function (allowCategories) {
            return false;
          }

    var _resetStorages = function(categories) {
            return false;
          }

    var _forceAllowAll = function (options) {
      if (options === undefined) {
        options = {console: true}
      }
      var dbCookieTypes = ["strict","performance","targeting","functionality","unclassified"];
      _writeInnerCookieParam('action', 'accept');

            var cookiesCategoriesForTrack = _cookiesCategoriesWithoutStrict(allCategory);
      _writeInnerCookieParam('categories', JSON.stringify(cookiesCategoriesForTrack));
      
      _allowCookies();
      _resetCookies();
      _resetStorages();
      _applyCurrentStateConsentMode(true);
      _callShopifyApi(true, dbCookieTypes);

      for (var i = 0; i < dbCookieTypes.length; i++) {
        _dispatchCategoryEvent(dbCookieTypes[i]);
      }
      _dispatchCategoryEvent('all');
      if (options.console) {
        _log('_forceAllow - TRUE')
      }
    }

    var _hideNoticeElements = function (categories) {
      var elements = document.querySelectorAll('[data-cookienotice]');
      for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        if (categories && categories.length > 0) {
          var dataCategoryVal = element.getAttribute('data-cookienotice')
          if (dataCategoryVal) {
            categories.forEach(function (category) {
              dataCategoryVal = dataCategoryVal.replace(category, '').trim();
            })
            if (dataCategoryVal.length > 0) {
              continue;
            }
          }
        }
        element.style.display = 'none';
      }
    }

    var _changeImgTags = function (attribute, categories) {
      var imgTags = document.querySelectorAll('img' + attribute);
      if (imgTags) {
        for (var i = 0; i < imgTags.length; i++) {
          var imgTag = imgTags[i];
          if (categories && categories.length > 0) {
            var dataCategoryVal = imgTag.getAttribute('data-cookiecategory');
            if (dataCategoryVal) {
              categories.forEach(function (category) {
                dataCategoryVal = dataCategoryVal.replace(category, '').trim();
              })
              if (dataCategoryVal.length > 0) {
                continue;
              }
            }
          }

          imgTag.setAttribute('src', imgTag.getAttribute('data-src'));
          imgTag.removeAttribute('data-cookiescript');
        }
      }
    }

    var _changeScriptTags = function (attribute, categories) {
      var isDispatchDOMContentLoadedEvent = false;
      var scriptsTags = document.querySelectorAll('script' + '[type="text/plain"]' + attribute);
      if (scriptsTags) {
        for (var i = 0; i < scriptsTags.length; i++) {
          var scriptsTag = scriptsTags[i];
          if (categories && categories.length > 0) {
            var dataCategoryVal = scriptsTag.getAttribute('data-cookiecategory');
            if (dataCategoryVal) {
              categories.forEach(function (category) {
                dataCategoryVal = dataCategoryVal.replace(category, '').trim();
              })
              if (dataCategoryVal.length > 0) {
                continue;
              }
            }
          }

          if (scriptsTag.getAttribute('data-reload') === 'true') {
            isDispatchDOMContentLoadedEvent = true
          }

          var newScriptTag = document.createElement('script');
          newScriptTag.innerHTML = scriptsTag.innerHTML;
          var attributes = Array.prototype.slice.call(scriptsTag.attributes);
          attributes.forEach(function (attr) {
            newScriptTag.setAttribute(attr.name, attr.value);
          })
          newScriptTag.setAttribute('type', 'text/javascript');
          newScriptTag.removeAttribute('data-cookiescript');
          _appendNodeAfterAndRemove(scriptsTag, newScriptTag)
        }
      }
      if (isDispatchDOMContentLoadedEvent) {
        _dispatchDOMContentLoadedEvent();
      }
    }

    var _changeIframeTags = function (attribute, categories) {
      var iframes = document.querySelectorAll('iframe' + attribute);
      if (iframes) {
        for (var i = 0; i < iframes.length; i++) {
          var iframe = iframes[i];
          if (categories && categories.length > 0) {
            var dataCategoryVal = iframe.getAttribute('data-cookiecategory');
            if (dataCategoryVal) {
              categories.forEach(function (category) {
                dataCategoryVal = dataCategoryVal.replace(category, '').trim();
              })
              if (dataCategoryVal.length > 0) {
                continue;
              }
            }
          }

          iframe.setAttribute('src', iframe.getAttribute('data-src'));
          iframe.removeAttribute('data-cookiescript');
        }
      }
    }

    var _changeEmbedTags = function (attribute, categories) {
      var embedTags = document.querySelectorAll('embed' + attribute);
      if (embedTags) {
        for (var i = 0; i < embedTags.length; i++) {
          var embedTag = embedTags[i];
          if (categories && categories.length > 0) {
            var dataCategoryVal = embedTag.getAttribute('data-cookiecategory');
            if (dataCategoryVal) {
              categories.forEach(function (category) {
                dataCategoryVal = dataCategoryVal.replace(category, '').trim();
              })
              if (dataCategoryVal.length > 0) {
                continue;
              }
            }
          }

          embedTag.setAttribute('src', embedTag.getAttribute('data-src'));
          embedTag.removeAttribute('data-cookiescript');
          var outerHtml = embedTag.outerHTML;
          _appendAfterAndRemove(embedTag, outerHtml)
        }
      }
    }

    var _changeObjectTags = function (attribute, categories) {
      var objectTags = document.querySelectorAll('object' + attribute);
      if (objectTags) {
        for (var i = 0; i < objectTags.length; i++) {
          var objectTag = objectTags[i];
          if (categories && categories.length > 0) {
            var dataCategoryVal = objectTag.getAttribute('data-cookiecategory');
            if (dataCategoryVal) {
              categories.forEach(function (category) {
                dataCategoryVal = dataCategoryVal.replace(category, '').trim();
              })
              if (dataCategoryVal.length > 0) {
                continue;
              }
            }
          }

          objectTag.setAttribute('data', objectTag.getAttribute('data-data'));
          objectTag.removeAttribute('data-cookiescript');
          var outerHtml = objectTag.outerHTML;
          _appendAfterAndRemove(objectTag, outerHtml)
        }
      }
    }

    var _changeLinksTags = function (attribute, categories) {
      var linkTags = document.querySelectorAll('link' + attribute);
      if (linkTags) {
        for (var i = 0; i < linkTags.length; i++) {
          var linkTag = linkTags[i];
          if (categories && categories.length > 0) {
            var dataCategoryVal = linkTag.getAttribute('data-cookiecategory');
            if (dataCategoryVal) {
              categories.forEach(function (category) {
                dataCategoryVal = dataCategoryVal.replace(category, '').trim();
              })
              if (dataCategoryVal.length > 0) {
                continue;
              }
            }
          }

          linkTag.setAttribute('href', linkTag.getAttribute('data-href'));
          linkTag.removeAttribute('data-cookiescript');
        }
      }
    }

    var _isCookieNecessary = function (cookie) {
      var necessaryCookies = [];
      for (var i = 0; i < necessaryCookies.length; i++) {
        var necessaryCookie = necessaryCookies[i];
        if (necessaryCookie.regexp) {
          var regexp = _regexParser(necessaryCookie.name)
          if (cookie.match(regexp)) {
            return true;
          }
        } else {
          if (cookie === necessaryCookie.name) {
            return true;
          }
        }
      }
      return false;
    }

    var _isCookiesAllow = function (cookie, allowCategories) {
            var categories = ['strict'];
      if (typeof allowCategories !== 'undefined') {
        categories = allowCategories.slice();
        categories.push('strict');
        categories = _uniqueArray(categories);
      }
      
      for (var i = 0; i < categories.length; i++) {
        var cNames = groupedCookies[categories[i]];
        if (cNames) {
          if (_includes(cNames, cookie) || _isPatternCookie({cNames: cNames, cookieName: cookie})) {
            return true;
          }
        }
      }
      return false;
          }

    var _isAnalyticCookie = function (cookie) {
            return false;
          }

    var _isPatternCookie = function (options) {
      var cNames = options.cNames
      var cookieName = options.cookieName
      var onlyCheckPattern = !!options.onlyCheckPattern

      var patterns = [{"pattern":"^[a-f0-9]{32}$","name":"[abcdef0123456789]{32}"},{"pattern":"^PrestaShop-[a-f0-9]{32}$","name":"PrestaShop-[abcdef0123456789]{32}"},{"pattern":"^LF_session_[a-f0-9]{32}$","name":"LF_session_[abcdef0123456789]{32}"},{"pattern":"^cid_[a-f0-9]{32}$","name":"cid_[abcdef0123456789]{32}"},{"pattern":"^wp_woocommerce_session_[a-f0-9]{32}$","name":"wp_woocommerce_session_[abcdef0123456789]{32}"},{"pattern":"^visa_1_[a-f0-9]{32}$","name":"visa_1_[abcdef0123456789]{32}"},{"pattern":"^yith_wcwl_session_[a-f0-9]{32}$","name":"yith_wcwl_session_[abcdef0123456789]{32}"},{"pattern":"^mp_[a-f0-9]{32}_mixpanel$","name":"mp_[abcdef0123456789]{32}_mixpanel"},{"pattern":"^ps[a-f0-9]{24}$","name":"ps[abcdef0123456789]{24}"}];
      for (var i = 0; i < patterns.length; i++) {
        var pattern = patterns[i]['pattern'];
        var regex = new RegExp(pattern, 'i')

        if (regex.test(cookieName)) {
          if (onlyCheckPattern) {
            return true;
          } else {
            if (_includes(cNames, patterns[i]['name'])) {
              return true;
            }
          }
        }
      }
      return false;
    }

    var _isAcceptCookieAction = function () {
      var actionValue = _readInnerCookieParam('action');
      return Boolean(actionValue && actionValue === 'accept');
    }

    var _isAcceptCookieActionWithAllCategory = function () {
      var actionValue = _readInnerCookieParam('action');
            var categories = _readCategoriesCheckboxesFromCookies();
      return Boolean(actionValue && actionValue === 'accept' && categories.length === allCategory.length);
          }

    var _isHasCookieAction = function () {
      var actionValue = _readInnerCookieParam('action');
      return Boolean(actionValue && (actionValue === 'accept' || actionValue === 'reject'));
    }

    var _isCookieScannerRequest = function () {
      return _cookiesApi.get('CookieScriptScanner')
    }

    var _readCategoriesCheckboxesFromCookies = function () {
      var cookiesCategories = _readInnerCookieParam('categories');
      var defaultValue = [];
      if (isPresentStrictly) {
        defaultValue = ['strict'];
      }

      if (cookiesCategories) {
        try {
          var array = JSON.parse(cookiesCategories)
          if (isPresentStrictly) {
            array.push('strict');
          }
          return _uniqueArray(array);
        } catch (e) {
          return defaultValue;
        }
      }
      return defaultValue;
    }

    var _getCurrentDescription = function () {
      var element = document.querySelector('span[data-cs-desc-box="true"]');
      if (element) {
        return element.getAttribute('data-cs-i18n-read');
      }
      return '';
    }

    var _request = function (params) {
      try {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', params.url);
        xhr.onload = function () {
          if (xhr.status === 200) {
            try {
              var data = JSON.parse(xhr.responseText)
              params.done(data)
            } catch (e) {
              params.done(xhr.responseText)
            }

          } else {
            _log('ERROR: Request failed.  Returned status for ' + url + ' of ' + xhr.status)
          }
        };
        xhr.send();
      } catch (e) {
        _log('ERROR: Yor browser not support request')
      }
    }

    var _getCookieSameSiteSetting  = function () {
      var value = null;
      if(cookieSameSite && cookieSameSite.length > 0) {
        value = cookieSameSite;
      }
      var sameSiteAttr = document.querySelector('script[data-cs-samesite]');
      if (sameSiteAttr) {
        var sameSiteValue = sameSiteAttr.getAttribute('data-cs-samesite');
        if(sameSiteValue) {
          value = sameSiteValue;
        }
      }
      return value ? value.toLowerCase() : value;
    }

    var _writeInnerCookieParam = function (key, value) {
      var cookie_value = _readInnerCookie();
      cookie_value[key] = value;
      if(key === 'action' && _this.consentTime !== 0) {
        cookie_value['consenttime'] = _this.consentTime;
      }

      try {
        var newValue = _formatCookieValue(JSON.stringify(cookie_value));
        _writeInnerCookie(newValue);
      } catch (e) {
        _log('Error: Write ' + cookieName + 'value =>' + e);
      }
    }

    var _writeInnerCookie = function (newValue) {
      var options = {expires: Number(expireDays), domain: _domainForInnerCookie};
      var sameSiteValue = _getCookieSameSiteSetting();
      if (sameSiteValue) {
        options.sameSite = sameSiteValue;
        if (sameSiteValue === 'none') {
          options.secure = true;
        }
      }
      _cookiesApi.set(_cookieConsentName(), newValue, options);
    }

    var _readInnerCookieParam = function (key) {
      var cookie_value = _readInnerCookie();
      return cookie_value[key];
    }

    var _readInnerCookie = function () {
      var value = _cookiesApi.get(_cookieConsentName(), {domain: _domainForInnerCookie});
      try {
                return JSON.parse(value);
      } catch (e) {
        return {};
      }
    }

    var _formatCookieValue = function (value) {
            return value;
          }

    var _domainForInnerCookie = function () {
            return null
          }()

    var _cookiesApi = function () {
      /*! js-cookie v3.0.0-rc.0 | MIT */
      function assign(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            target[key] = source[key];
          }
        }
        return target
      }

      var defaultConverter = {
        read: function (value) {
          return value.replace(/%3B/g, ';')
        },
        write: function (value) {
          return value.replace(/;/g, '%3B')
        }
      };

      function init(converter, defaultAttributes) {
        function set(key, value, attributes) {
          if (typeof document === 'undefined') {
            return
          }

          attributes = assign({}, defaultAttributes, attributes);

          if (typeof attributes.expires === 'number') {
            var dateExp = new Date();
            dateExp.setTime(dateExp.getTime() + attributes.expires * 864e5)
            attributes.expires = dateExp;
          }
          if (attributes.expires) {
            attributes.expires = attributes.expires.toUTCString();
          }

          key = defaultConverter.write(key).replace(/=/g, '%3D');

          value = converter.write(String(value), key);

          var stringifiedAttributes = '';
          for (var attributeName in attributes) {
            if (!attributes[attributeName]) {
              continue
            }

            stringifiedAttributes += '; ' + attributeName;

            if (attributes[attributeName] === true) {
              continue
            }

            stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
          }

          return (document.cookie = key + '=' + value + stringifiedAttributes)
        }

        function get(key) {
          if (typeof document === 'undefined' || (arguments.length && !key)) {
            return
          }

          // To prevent the for loop in the first place assign an empty array
          // in case there are no cookies at all.
          var cookies = document.cookie ? document.cookie.split('; ') : [];
          var jar = {};
          for (var i = 0; i < cookies.length; i++) {
            var parts = cookies[i].split('=');
            var value = parts.slice(1).join('=');
            var foundKey = defaultConverter.read(parts[0]).replace(/%3D/g, '=');
            jar[foundKey] = converter.read(value, foundKey);

            if (key === foundKey) {
              break
            }
          }

          return key ? jar[key] : jar
        }

        return Object.create(
          {
            set: set,
            get: get,
            remove: function (key, attributes) {
              set(
                key,
                '',
                assign({}, attributes, {
                  expires: -1
                })
              );
            },
            withAttributes: function (attributes) {
              return init(this.converter, assign({}, this.attributes, attributes))
            },
            withConverter: function (converter) {
              return init(assign({}, this.converter, converter), this.attributes)
            }
          },
          {
            attributes: {value: Object.freeze(defaultAttributes)},
            converter: {value: Object.freeze(converter)}
          }
        )
      }

            var secure = window.location.protocol === 'https:';
      

      return init(defaultConverter, {path: '/', secure: secure});
    }()

    var _regexParser = function (input) {

      // Validate input
      if (typeof input !== "string") {
        return input
      }

      // Parse input
      var m = input.match(/(\/?)(.+)\1([a-z]*)/i);

      // Invalid flags
      if (m[3] && !/^(?!.*?(.).*?\1)[gmixXsuUAJ]+$/.test(m[3])) {
        return RegExp(input);
      }

      // Create the regular expression
      return new RegExp(m[2], m[3]);
    };

    var _getUrlQueryParameterByName = function (name, url) {
      name = name.replace(/[\[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    var _loadCookieValueFromUrlArgs = function () {
            var cookieName = _cookieConsentName();
      var value = _getUrlQueryParameterByName(cookieName, window.location.href);
      if (value) {
        try {
          value = _formatCookieValue(value);
          _writeInnerCookie(value)
        } catch (e) {
          _log('Error: Write(_loadCookieValueFromUrlArgs) ' + cookieName + 'value =>' + e);
        }
      }
          }

    var _isGA4AnalyticsHowScript = function () {
      var scripts = document.querySelectorAll('script');
      var ga4ConfigRegex = /gtag\(\s*['"]config['"]\s*,\s*['"]G-[A-Z0-9-]+['"]\s*\)/i;
      var present = false;
      for (var i = 0; i < scripts.length; i++) {
        var script = scripts[i];
        if (ga4ConfigRegex.test(script.innerHTML)) {
          present = true;
          break;
        }
      }
      return present;
    }

    var _isBot = function() {
      var botPattern = /bot|googlebot|crawler|spider|robot|crawling/i;
      if(botPattern.test(navigator.userAgent)) {
        return true;
      }
      if(navigator.webdriver) {
        return true;
      }
      if(navigator.languages.length === 0) {
        return true;
      }

      return false;
    }

    var _throwError = function (msg) {
      throw msg;
    }

    var _isAuth = function () {
            var scriptAllowUrl = 'cookie-script.com/s/87535e6549447f08ecc25b51d950a58a.js';
      var scriptTags = document.getElementsByTagName('script');
      for (var i = 0; i < scriptTags.length; i++) {
        var src = scriptTags[i].getAttribute('src');
        if (src && src.indexOf(scriptAllowUrl) >= 0) {
          return true;
        }
      }
      _throwError('not allowed use of Cookie-Script');
          }

    var _sendCollectConsents = function (action, categories) {
            return false;
          };

    var _updateGoogleConsentMode = function (isGranted, allowCategories, updateType) {
      if(googleConsentEnabled || window.CookieScriptData.useGoogleTemplate) {
        _needUseGtag();
        if (typeof updateType === 'undefined') {
          updateType = 'update';
        }

        if (window.gtag) {
          var adCategory = 'targeting';
          var analyticsCategory = 'performance';
          var adPersonalizationCategory = 'targeting';
          var adUserDataCategory = 'targeting';
          var functionalityCategory = 'functionality';
          var personalizationCategory = 'functionality';
          var securityCategory = 'functionality';
          var typesFromTagManager = _readGoogleConsentTypeFromTagManager();

          var isApplyByCategory = function (category, allow) {
            if(category === 'strict') {
              return true;
            }

            if(allow) {
              if (typeof allowCategories !== 'undefined') {
                return _includes(allowCategories, category)
              } else {
                return true;
              }
            }
            return false;
          }

          var info = {
            'ad_storage': isApplyByCategory(adCategory, isGranted) ? 'granted' : 'denied',
            'analytics_storage': isApplyByCategory(analyticsCategory, isGranted) ? 'granted' : 'denied',
          }

          if (typesFromTagManager) {
            if (_includes(typesFromTagManager, 'ad_personalization')) {
              info.ad_personalization = isApplyByCategory(adPersonalizationCategory, isGranted) ? 'granted' : 'denied';
            }
            if (_includes(typesFromTagManager, 'ad_user_data')) {
              info.ad_user_data = isApplyByCategory(adUserDataCategory, isGranted) ? 'granted' : 'denied';
            }
          } else {
            info.ad_personalization = isApplyByCategory(adPersonalizationCategory, isGranted) ? 'granted' : 'denied';
            info.ad_user_data = isApplyByCategory(adUserDataCategory, isGranted) ? 'granted' : 'denied';
          }

          if (functionalityCategory !== 'ignore') {
            info.functionality_storage = isApplyByCategory(functionalityCategory, isGranted) ? 'granted' : 'denied';
          }

          if (personalizationCategory !== 'ignore') {
            info.personalization_storage = isApplyByCategory(personalizationCategory, isGranted) ? 'granted' : 'denied';
          }

          if (securityCategory !== 'ignore') {
            info.security_storage = isApplyByCategory(securityCategory, isGranted) ? 'granted' : 'denied';
          }

          gtag('consent', updateType, info);
          if(updateType === 'update') {
            _dispatchCookieScriptGoogleConsentUpdated()
          }
        }
      }
    };

    var _updateFacebookConsentMode = function (isGranted, allowCategories) {
            return false;
          };

    var  _updateMicrosoftConsentMode = function(isGranted, allowCategories, updateType) {
          return false;
        }

    var  _updateMicrosoftClarity = function(allow, allowCategories) {
          return false;
        }

    var _addIabSDK = function (isHiddenUI) {
          }

    var _iabCMP = function (method, params) {
            return false;
          }

    var _setGoogleConsentMappingToCookie = function () {
      if(googleConsentEnabled || window.CookieScriptData.useGoogleTemplate) {
        var adCategory = 'targeting';
        var analyticsCategory = 'performance';
        var adPersonalizationCategory = 'targeting';
        var adUserDataCategory = 'targeting';
        var functionalityCategory = 'functionality';
        var personalizationCategory = 'functionality';
        var securityCategory = 'functionality';

        var mapObject = {};
        var types = _readGoogleConsentTypeFromTagManager();
        if (types) {
          for (var i = 0; i < types.length; i++) {
            var type = types[i];
            switch (type) {
              case 'ad_storage':
                mapObject.ad_storage = adCategory;
                break;
              case 'analytics_storage':
                mapObject.analytics_storage = analyticsCategory;
                break;
              case 'ad_personalization':
                mapObject.ad_personalization = adPersonalizationCategory;
                break;
              case 'ad_user_data':
                mapObject.ad_user_data = adUserDataCategory;
                break;
              case 'functionality_storage':
                mapObject.functionality_storage = functionalityCategory;
                break;
              case 'personalization_storage':
                mapObject.personalization_storage = personalizationCategory;
                break;
              case 'security_storage':
                mapObject.security_storage = securityCategory;
                break;
            }
          }
        } else {
          mapObject = {
            ad_storage: adCategory,
            analytics_storage: analyticsCategory,
            ad_personalization: adPersonalizationCategory,
            ad_user_data: adUserDataCategory,
            functionality_storage: functionalityCategory,
            personalization_storage: personalizationCategory,
            security_storage: securityCategory
          };
        }

        _writeInnerCookieParam('googleconsentmap', mapObject);
      }
    }

    var _withdrawConsent = function () {
      var cookieConsentTime = Number(_readInnerCookieParam('consenttime'))
      if(cookieConsentTime) {
        var cookieName = _cookieConsentName();
        if(Number(_this.consentTime) > cookieConsentTime) {
          _cookiesApi.remove(cookieName)
          var domainParts = window.location.hostname.split(".");
          while (domainParts.length > 0 && _cookiesApi.get(cookieName) !== 'undefined') {
            var possibleDomain = domainParts.join('.');
            var pathParts = location.pathname.split('/');

            var possiblePath = '/'
            _cookiesApi.remove(cookieName, {path: possiblePath, domain: ""});
            _cookiesApi.remove(cookieName, {path: possiblePath, domain: possibleDomain});
            _cookiesApi.remove(cookieName, {path: possiblePath, domain: '.' + possibleDomain});

            while (pathParts.length > 0 && _cookiesApi.get(cookieName) !== 'undefined') {
              possiblePath = pathParts.join('/');
              _cookiesApi.remove(cookieName, {path: possiblePath, domain: ""});
              _cookiesApi.remove(cookieName, {path: possiblePath, domain: possibleDomain});
              _cookiesApi.remove(cookieName, {path: possiblePath, domain: '.' + possibleDomain});
              pathParts.pop();
            }
            domainParts.shift();
          }
        }
      }
    }

    var _setCrossDomainConsent = function () {
            return false;
          }

    var _verifyGoogleConsentMode = function () {
      if(googleConsentEnabled || window.CookieScriptData.useGoogleTemplate) {
        if(!window.CookieScriptData.isVerifyGoogleConsentMode) {
          var defaultConsentIndex = null;
          var configIndex = null;
          var gtmJsEventIndex = null;
          if (window.dataLayer) {
            for (let i = 0; i < window.dataLayer.length; i++) {
              if(window.dataLayer[i]) {
                if(window.dataLayer[i][0] === 'consent' && window.dataLayer[i][1] === 'default') {
                  defaultConsentIndex = i
                } else if(window.dataLayer[i][0] === 'config') {
                  configIndex = i
                } else if(window.dataLayer[i]['event'] && window.dataLayer[i]['event'] === 'gtm.js') {
                  gtmJsEventIndex = i
                }
              }
            }
          }
          if (defaultConsentIndex !== null) {
            if (configIndex !== null) {
              if (defaultConsentIndex < configIndex) {
                window.CookieScriptData.isVerifyGoogleConsentMode = true;
              }
            } else if(gtmJsEventIndex !== null) {
              if (defaultConsentIndex < gtmJsEventIndex) {
                window.CookieScriptData.isVerifyGoogleConsentMode = true;
              }
            }
          }
        }
      }
    };

    var _modifyBannerHtml = function() {
      var ignoreReadCrossDomain = Boolean(document.querySelector('script[data-cs-ignore-read-crossdomain="true"]'));
      if(ignoreReadCrossDomain) {
        var parser = new DOMParser();
        var _newDocHtml = parser.parseFromString(html, 'text/html');
        var crossDomainElm = _newDocHtml.querySelector('.cookiescript_cross_domain');
        if (crossDomainElm) {
          crossDomainElm.remove();
          html = _newDocHtml.body.innerHTML;
        }
        if(fullScreenDetailsHtml.length > 0) {
          var _newDocFullScreenHtml = parser.parseFromString(fullScreenDetailsHtml, 'text/html');
          var crossFullScreenDomainElm = _newDocFullScreenHtml.querySelector('.cookiescript_cross_domain');
          if (crossFullScreenDomainElm) {
            crossFullScreenDomainElm.remove();
            fullScreenDetailsHtml = _newDocFullScreenHtml.body.innerHTML;
          }
        }
      }
    };

    var _loadInitWithCheckCrossDomainConsent = function () {
            _loadInit();
          }

    var _loadInit = function () {
      if(loadApply){
        return;
      }
      _verifyGoogleConsentMode();
      _enableShopifyApi();
      _this.initTime = new Date().toString();
      var restrictDomainAttr = document.querySelector('script[data-cs-restrict-domain="true"]');
      if (restrictDomainAttr) {
        var currentDomain = window.location.host.replace(/^www\./, '');
        if (currentDomain !== domainHost) {
          _forceAllowAll({console: false});
          return;
        }
      }

      var _applyAfterDocumentStateComplete = function () {
      
        // Maybe need apply cookie state when all script load
        if (!_isCookieScannerRequest()) {
          _callApplyCurrentCookiesState();
        }
      }
      if(document.readyState === 'complete') {
        _applyAfterDocumentStateComplete();
      } else {
        window.addEventListener('load', function () {
          _applyAfterDocumentStateComplete();
        });
      }

      //if user need delay show banner (init_delay)
      setTimeout(function () {
        _loadCookieValueFromUrlArgs() //if url query has cookieName param, then set cookie
        _modifyBannerHtml();
        _removeSelfHtml();
        _appendHtml(document.body, css);

        if (_isAcceptCookieActionWithAllCategory()) {
          _setConsentCheckbox(true)
        }

        if (_isHasCookieAction()) {
          _addBadge();
        } else {
          if (!_callShowOncePageEffect()) {
            if(_readInnerCookieParam('bannershown') !== 1) {
              _sendAnalytics('firstshown', '')
                          }

            _addBanner();
            _callHideAfterEffect();
            _callAcceptCookiesAfterEffect();
          }
        }

        _setAltForIframes();
        _setConsentCheckboxAndLinkEvent();
        _setScrollEvent();
        _dispatchCustomEvent('CookieScriptLoaded');
        _dispatchCustomEvent('CookieScriptCurrentState', _this.currentState());
      }, delay);
      loadApply = true;
    };

    var _loadGPC = function () {
          };

    var _fillCurrentPluginVariable = function() {
      if(currentPlugin) {
        return;
      }
      var script = document.querySelector('script[data-cs-plugin]');
      if (script) {
        currentPlugin = script.getAttribute('data-cs-plugin');
      }
    };

    
    var _demoClickEvent = function () {
            return false;
          }

    

    (function () {
      if (window.CookieScript.instance) return;
            _loadGPC();
      _withdrawConsent();
      _setGoogleConsentMappingToCookie();
      _setGoogleDeveloperId();
              _setDefaultGoogleConsentMode(false);
        _setDefaultMicrosoftConsentMode(false);
      
      _addIabSDK(_isHasCookieAction());
      _fillCurrentPluginVariable();
      //_isAuth();
      //Apply cookie state when init script
      _callApplyCurrentCookiesState(true);
      //DOMContentLoaded
        if (_includes(showReadyState, document.readyState)) {
        _loadInitWithCheckCrossDomainConsent();
      } else {
        window.addEventListener(showEvent, _loadInitWithCheckCrossDomainConsent);
      }
          }())
  };

  
  

  window.CookieScript.init = function () {
        if (window.CookieScript.instance) {
      return CookieScript.instance;
    }

    window.CookieScript.instance = new CookieScript();
    return CookieScript.instance;
      }
  window.CookieScript.init()
}

//0