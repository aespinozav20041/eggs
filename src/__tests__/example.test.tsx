import React from 'react';
import { render } from '@testing-library/react-native';

jest.mock('expo-localization', () => ({ locale: 'en-US' }));

import App from '../../App';
import '../i18n';

test('renders greeting', () => {
  const { getByText } = render(<App />);
  expect(getByText(/Hello World|Hola Mundo/)).toBeTruthy();
});
