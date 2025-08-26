import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

const resources = {
  en: {
    translation: {
      hello: 'Hello World',
      changeTheme: 'Change Theme',
      changeLang: 'Change Language',
      loading: 'Loading...'
    },
  },
  es: {
    translation: {
      hello: 'Hola Mundo',
      changeTheme: 'Cambiar Tema',
      changeLang: 'Cambiar Idioma',
      loading: 'Cargando...'
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: Localization.locale.startsWith('es') ? 'es' : 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
