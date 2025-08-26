import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('expo-localization', () => ({ locale: 'en-US' }));
import i18n from '../i18n';

i18n.changeLanguage('en');

const mockRegister = jest.fn();

jest.mock('../providers/AuthProvider', () => ({
  useAuth: () => ({
    user: null,
    initializing: false,
    login: jest.fn(),
    register: mockRegister,
    logout: jest.fn(),
    resetPassword: jest.fn(),
    googleSignIn: jest.fn(),
    appleSignIn: jest.fn(),
    resendVerification: jest.fn(),
    reloadUser: jest.fn(),
  }),
}));

import RegisterScreen from '../screens/RegisterScreen';

describe('RegisterScreen', () => {
  it('submits registration', () => {
    const { getByPlaceholderText, getAllByText } = render(
      <NavigationContainer>
        <RegisterScreen navigation={{ navigate: jest.fn() } as any} />
      </NavigationContainer>
    );
    fireEvent.changeText(getByPlaceholderText(/email/i), 'b@b.com');
    fireEvent.changeText(getByPlaceholderText(/password/i), 'secret');
    fireEvent.press(getAllByText(/register/i)[1]);
    expect(mockRegister).toHaveBeenCalledWith('b@b.com', 'secret');
  });
});
