/* NearSpotio — Cookie consent + Google Analytics 4 loader
   Strategy: GA4 is only loaded AFTER the user actively accepts the "analytics"
   category. Before that, no gtag script is requested, no cookies are set. */
(function () {
  'use strict';

  var GA_ID = 'G-K7J4NGKHWG';
  var gaLoaded = false;

  function loadGA() {
    if (gaLoaded) return;
    gaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID, {
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
  }

  function clearGACookies() {
    var host = location.hostname;
    var domains = ['', '.' + host, host];
    var names = ['_ga', '_gid', '_gat', '_ga_' + GA_ID.replace('G-', '')];
    names.forEach(function (n) {
      domains.forEach(function (d) {
        document.cookie = n + '=; Max-Age=0; path=/' + (d ? '; domain=' + d : '');
      });
    });
  }

  var htmlLang = (document.documentElement.lang || 'en').toLowerCase();
  var defaultLang = htmlLang.indexOf('de') === 0 ? 'de' : 'en';

  CookieConsent.run({
    guiOptions: {
      consentModal: { layout: 'box', position: 'bottom center', equalWeightButtons: true },
      preferencesModal: { layout: 'box', position: 'right', equalWeightButtons: true }
    },
    categories: {
      necessary: { readOnly: true, enabled: true },
      analytics: {
        autoClear: { cookies: [{ name: /^_ga/ }, { name: '_gid' }, { name: '_gat' }] }
      }
    },
    onConsent: function () {
      if (CookieConsent.acceptedCategory('analytics')) loadGA();
    },
    onChange: function () {
      if (CookieConsent.acceptedCategory('analytics')) {
        loadGA();
      } else {
        clearGACookies();
        if (gaLoaded) location.reload();
      }
    },
    language: {
      default: defaultLang,
      translations: {
        de: {
          consentModal: {
            title: 'Wir verwenden Cookies',
            description: 'Diese Website verwendet nur technisch notwendige Cookies. Zusätzlich möchten wir mit <strong>Google Analytics</strong> anonymisierte Nutzungsstatistiken erheben, um die Seite zu verbessern. Deine Einwilligung ist freiwillig und kann jederzeit widerrufen werden.',
            acceptAllBtn: 'Alle akzeptieren',
            acceptNecessaryBtn: 'Alle ablehnen',
            showPreferencesBtn: 'Einstellungen',
            footer: '<a href="/privacy/">Datenschutz</a><a href="/impressum/">Impressum</a>'
          },
          preferencesModal: {
            title: 'Cookie-Einstellungen',
            acceptAllBtn: 'Alle akzeptieren',
            acceptNecessaryBtn: 'Alle ablehnen',
            savePreferencesBtn: 'Auswahl speichern',
            closeIconLabel: 'Schließen',
            sections: [
              {
                title: 'Verwendung von Cookies',
                description: 'Wir verwenden Cookies, um die Grundfunktionen der Website zu gewährleisten und mit deiner Einwilligung die Nutzung zu analysieren. Mehr Informationen findest du in unserer <a href="/privacy/">Datenschutzerklärung</a>.'
              },
              {
                title: 'Technisch notwendig',
                description: 'Diese Cookies sind für den Betrieb der Website erforderlich (z. B. Theme-Einstellung, Speichern deiner Cookie-Auswahl) und können nicht deaktiviert werden.',
                linkedCategory: 'necessary'
              },
              {
                title: 'Statistik (Google Analytics)',
                description: 'Google Analytics 4 erhebt pseudonyme Nutzungsstatistiken (Seitenaufrufe, Sitzungen, ungefährer Standort auf Länder-/Regionsebene). Anbieter: Google Ireland Limited. IP-Adresse wird anonymisiert, Google Signals ist deaktiviert, keine Werbepersonalisierung. Aufbewahrungsdauer: 2 Monate. Datenübermittlung in die USA erfolgt auf Basis des EU-US Data Privacy Framework.',
                linkedCategory: 'analytics',
                cookieTable: {
                  headers: { name: 'Name', domain: 'Domain', desc: 'Zweck', exp: 'Dauer' },
                  body: [
                    { name: '_ga', domain: 'google-analytics.com', desc: 'Unterscheidung einzelner Nutzer', exp: '2 Jahre' },
                    { name: '_ga_*', domain: 'google-analytics.com', desc: 'Sitzungszustand für GA4', exp: '2 Jahre' }
                  ]
                }
              },
              {
                title: 'Weitere Informationen',
                description: 'Bei Fragen zu unserer Cookie-Richtlinie und deinen Wahlmöglichkeiten kontaktiere uns per E-Mail (siehe <a href="/impressum/">Impressum</a>).'
              }
            ]
          }
        },
        en: {
          consentModal: {
            title: 'We use cookies',
            description: 'This website uses only strictly necessary cookies. In addition, we would like to use <strong>Google Analytics</strong> to collect anonymised usage statistics to improve the site. Your consent is voluntary and can be withdrawn at any time.',
            acceptAllBtn: 'Accept all',
            acceptNecessaryBtn: 'Reject all',
            showPreferencesBtn: 'Preferences',
            footer: '<a href="/privacy/">Privacy</a><a href="/impressum/">Imprint</a>'
          },
          preferencesModal: {
            title: 'Cookie preferences',
            acceptAllBtn: 'Accept all',
            acceptNecessaryBtn: 'Reject all',
            savePreferencesBtn: 'Save preferences',
            closeIconLabel: 'Close',
            sections: [
              {
                title: 'Cookie usage',
                description: 'We use cookies to provide the core functionality of the website and, with your consent, to analyse usage. For more information, see our <a href="/privacy/">privacy policy</a>.'
              },
              {
                title: 'Strictly necessary',
                description: 'These cookies are required for the website to function (e.g. theme setting, storing your cookie choice) and cannot be disabled.',
                linkedCategory: 'necessary'
              },
              {
                title: 'Statistics (Google Analytics)',
                description: 'Google Analytics 4 collects pseudonymous usage statistics (page views, sessions, approximate location at country/region level). Provider: Google Ireland Limited. IP addresses are anonymised, Google Signals is disabled, ad personalisation is off. Retention: 2 months. Transfers to the US are covered by the EU-US Data Privacy Framework.',
                linkedCategory: 'analytics',
                cookieTable: {
                  headers: { name: 'Name', domain: 'Domain', desc: 'Purpose', exp: 'Duration' },
                  body: [
                    { name: '_ga', domain: 'google-analytics.com', desc: 'Distinguishes individual users', exp: '2 years' },
                    { name: '_ga_*', domain: 'google-analytics.com', desc: 'Session state for GA4', exp: '2 years' }
                  ]
                }
              },
              {
                title: 'More information',
                description: 'For questions about our cookie policy and your choices, contact us by email (see <a href="/impressum/">imprint</a>).'
              }
            ]
          }
        }
      }
    }
  });
})();
