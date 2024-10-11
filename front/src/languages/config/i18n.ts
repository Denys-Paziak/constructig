import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ru from "../ru/translation.json";
import es from "../es/translation.json";
import en from "../en/translation.json";

i18n.use(initReactI18next).init({
  debug: false,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    ru: {
      translation: ru,
    },
    es: {
      translation: es,
    },
    en: {
      translation: en,
    },
  },
});

export default i18n;
