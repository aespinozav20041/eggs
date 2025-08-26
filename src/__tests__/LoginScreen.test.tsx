import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('expo-localization', () => ({ locale: 'en-US' }));
import i18n from '../i18n';

i18n.changeLanguage('en');

jest.mock('expo-auth-session/providers/google', () => ({
  useAuthRequest: () => [null, null, jest.fn()],
}));

jest.mock('expo-web-browser', () => ({ maybeCompleteAuthSession: jest.fn() }));

jest.mock('expo-apple-authentication', () => ({
  signInAsync: jest.fn(),
  AppleAuthenticationScope: { EMAIL: 'EMAIL', FULL_NAME: 'FULL_NAME' },
}));

const mockLogin = jest.fn();

jest.mock('../providers/AuthProvider', () => ({
  useAuth: () => ({
    user: null,
    initializing: false,
    login: mockLogin,
    register: jest.fn(),
    logout: jest.fn(),
    resetPassword: jest.fn(),
    googleSignIn: jest.fn(),
    appleSignIn: jest.fn(),
    resendVerification: jest.fn(),
    reloadUser: jest.fn(),
  }),
}));

import LoginScreen from '../screens/LoginScreen';

describe('LoginScreen', () => {
  it('submits credentials', () => {
    const { getByPlaceholderText, getAllByText } = render(
      <NavigationContainer>
        <LoginScreen navigation={{ navigate: jest.fn() } as any} />
      </NavigationContainer>
    );
    fireEvent.changeText(getByPlaceholderText(/email/i), 'a@a.com');
    fireEvent.changeText(getByPlaceholderText(/password/i), 'secret');
    fireEvent.press(getAllByText(/login/i)[1]);
    expect(mockLogin).toHaveBeenCalledWith('a@a.com', 'secret');
  });
});
