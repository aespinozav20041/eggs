import React from 'react';
import { render } from '@testing-library/react-native';

jest.mock('expo-localization', () => ({ locale: 'en-US' }));
jest.mock('../lib/api', () => ({
  api: { get: () => Promise.resolve({ data: { title: 'test' } }) },
  handleApiError: jest.fn(),
}));

jest.mock('../providers/AuthProvider', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useAuth: () => ({ user: { emailVerified: true }, initializing: false }),
}));

jest.mock('../screens/LoginScreen', () => () => null);
jest.mock('../screens/RegisterScreen', () => () => null);
jest.mock('../screens/ForgotPasswordScreen', () => () => null);
jest.mock('../screens/VerificationScreen', () => () => null);

import App from '../../App';
import '../i18n';
import { queryClient } from '../providers/AppProviders';

afterAll(() => {
  queryClient.clear();
});

test('renders greeting', () => {
  const { getByText } = render(<App />);
  expect(getByText(/Hello World|Hola Mundo/)).toBeTruthy();
});
