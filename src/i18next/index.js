import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import HOME_EN from '../language/en/home.json'
import HOME_VI from '../language/vi/home.json'

const resources = {
    vi: {
        home: HOME_VI
    },
    en: {
        home: HOME_EN
    }
}

if(!localStorage.getItem("language")) {
        localStorage.setItem("language", JSON.stringify({
        title: "Tiếng Việt",
        code: "vi"
    }))
}

const language = JSON.parse(localStorage.getItem("language"));


i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: language.code,
        ns: ['home'],
        fallbackLng: "vi",
        interpolation: {
            escapeValue: false
        }
    })