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
  );
}
