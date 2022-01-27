import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./locales/en/transitionEN.json";
import translationPT from "./locales/pt/transitionPT.json";
import translationHI from "./locales/hin/transitionHIN.json";

const resources = {
    en: {
        translation: translationEN
    },
    hin: {
        translation: translationHI
    },
    pt: {
        translation: translationPT
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        keySeperator: false,

        initerpolation: {
            escapeValue: false
        }
    });


export default i18n