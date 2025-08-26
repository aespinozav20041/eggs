import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../providers/AuthProvider';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import * as AppleAuthentication from 'expo-apple-authentication';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

WebBrowser.maybeCompleteAuthSession();

type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  Forgot: undefined;
};

interface Props {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Login'>;
}

export default function LoginScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { login, googleSignIn, appleSignIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const idToken = response.authentication?.idToken;
      if (idToken) {
        googleSignIn(idToken);
      }
    }
  }, [response, googleSignIn]);

  const handleApple = async () => {
    try {
      const res = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        ],
      });
      if (res.identityToken) {
        await appleSignIn(res.identityToken);
      }
    } catch (e) {
      // ignore
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text>{t('login')}</Text>
      <TextInput
        placeholder={t('email')}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ borderWidth: 1, marginBottom: 8 }}
      />
      <TextInput
        placeholder={t('password')}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 8 }}
      />
      <Button title={t('login')} onPress={() => login(email, password)} />
      <Button title="Google" disabled={!request} onPress={() => promptAsync()} />
      <Button title="Apple" onPress={handleApple} />
      <Button title={t('register')} onPress={() => navigation.navigate('Register')} />
      <Button title={t('forgot')} onPress={() => navigation.navigate('Forgot')} />
    </View>
  );
}
