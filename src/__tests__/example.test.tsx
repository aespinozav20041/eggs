import React from 'react';
import { render } from '@testing-library/react-native';

jest.mock('expo-localization', () => ({ locale: 'en-US' }));
jest.mock('../lib/api', () => ({
  api: { get: () => Promise.resolve({ data: { title: 'test' } }) },
  handleApiError: jest.fn(),
}));

import App from '../../App';
import '../i18n';
import { queryClient } from '../providers/AppProviders';

afterAll(() => {
  queryClient.clear();
});


import App from '../../App';
import '../i18n';
test('renders greeting', () => {
  const { getByText } = render(<App />);
  expect(getByText(/Hello World|Hola Mundo/)).toBeTruthy();
});
