import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

const resources = {
  en: {
    translation: {
      hello: 'Hello World',
      changeTheme: 'Change Theme',
      changeLang: 'Change Language',

      loading: 'Loading...',
      email: 'Email',
      password: 'Password',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      forgot: 'Forgot Password?',
      send: 'Send',
      verify: 'Verify your email',
      resend: 'Resend Email',

      loading: 'Loading...'

    },
  },
  es: {
    translation: {
      hello: 'Hola Mundo',
      changeTheme: 'Cambiar Tema',
      changeLang: 'Cambiar Idioma',

      loading: 'Cargando...',
      email: 'Correo',
      password: 'Contraseña',
      login: 'Iniciar sesión',
      register: 'Registrarse',
      logout: 'Cerrar sesión',
      forgot: '¿Olvidaste tu contraseña?',
      send: 'Enviar',
      verify: 'Verifica tu correo',
      resend: 'Reenviar correo',

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
