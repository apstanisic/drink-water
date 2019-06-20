import Settings, { SettingsItems } from "./Settings";
// @ts-ignore
import en from "../appRes/lang/en.json";
// @ts-ignore
import sr from "../appRes/lang/sr.json";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

/**
 * Language texts
 */
const allLangTexts = { en, sr };

/**
 * Get text value for given key and language
 * @param textKey Name of the text part, eg. header.logo.smaller
 * @param lang Lang in which to search
 */
const translate = (textKey: string, lang: "en" | "nl") => {
  const langData = allLangTexts[lang];
  return textKey.split(".").reduce((o: any, i: any) => o[i], langData);
};

/**
 * Get text value for given key, lang is taken from settings
 * @param textKey Name of the text part, eg. header.logo.smaller
 */
export const _t = (textKey: string) => {
  const language = Settings.getItem(SettingsItems.language);
  return translate(textKey, language);
};

/**
 * Default export is basic translate
 */
export default translate;

const language = Settings.getItem(SettingsItems.language);
console.log(language);

i18n

  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources: {
      en: { translation: en },
      sr: { translation: sr }
    },
    lng: language,
    fallbackLng: "en",
    debug: true,

    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  });

// export { i18n };
