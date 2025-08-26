import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../providers/AuthProvider';

export default function ForgotPasswordScreen() {
  const { t } = useTranslation();
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');

  return (
    <View style={{ padding: 16 }}>
      <Text>{t('forgot')}</Text>
      <TextInput
        placeholder={t('email')}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ borderWidth: 1, marginBottom: 8 }}
      />
      <Button title={t('send')} onPress={() => resetPassword(email)} />
    </View>
  );
}
