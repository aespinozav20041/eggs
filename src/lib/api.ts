import axios from 'axios';
import { Alert, Platform, ToastAndroid } from 'react-native';

const showError = (message: string) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.LONG);
  } else {
    Alert.alert('Error', message);
  }
};

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL ?? "https://jsonplaceholder.typicode.com",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    showError(error.message);
    return Promise.reject(error);
  }
);

export const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    showError(error.message);
  } else if (error instanceof Error) {
    showError(error.message);
  } else {
    showError('Unknown error');
  }
};
