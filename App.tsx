import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import AppProviders from './src/providers/AppProviders';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppProviders>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </AppProviders>
=======
import './src/i18n';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomeScreen from './src/screens/HomeScreen';
import { useThemeStore } from './src/store/theme';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

export default function App() {
  const theme = useThemeStore((s) => s.theme);
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
