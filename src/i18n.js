import i18n from "i18next";
import XHR from "i18next-xhr-backend";

import translationEng from "./locales/en.json";
import translationPt from "./locales/pt.json";

i18n.use(XHR).init({
  lng: "en",
  //debug: true,
  fallbackLng: "en", // use en if detected lng is not available

  keySeparator: false, // we do not use keys in form messages.welcome

  interpolation: {
    escapeValue: false, // react already safes from xss
  },

  resources: {
    en: {
      translations: translationEng,
    },
    pt: {
      translations: translationPt,
    },
  },

  // have a common namespace used around the full app
  ns: ["translations"],
  defaultNS: "translations",
  react: {
    useSuspense: false,
  },
  // do not load a fallback
  //fallbackLng: false
});

export default i18n;
