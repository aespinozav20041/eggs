import React from 'react';
import { View, Text, Button } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../providers/AuthProvider';

export default function VerificationScreen() {
  const { t } = useTranslation();
  const { user, resendVerification, reloadUser, logout } = useAuth();
  return (
    <View style={{ padding: 16 }}>
      <Text>{t('verify')}</Text>
      <Text>{user?.email}</Text>
      <Button title={t('resend')} onPress={resendVerification} />
      <Button title={t('send')} onPress={reloadUser} />
      <Button title={t('logout')} onPress={logout} />
    </View>
  );
}
