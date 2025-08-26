import React from 'react';
import { View, Text, Button } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useUIStore } from '../store/ui';
import i18n from '../i18n';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { useAuth } from '../providers/AuthProvider';

export default function HomeScreen() {
  const { t } = useTranslation();
  const theme = useUIStore((s) => s.theme);
  const toggleTheme = useUIStore((s) => s.toggleTheme);
  const toggleLang = () => i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
  const { data, isLoading } = useQuery({
    queryKey: ['todo'],
    queryFn: async () => (await api.get('/todos/1')).data,
  });
  const { logout, user } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{t('hello')}</Text>
      <Text>{isLoading ? t('loading') : data?.title}</Text>
      <Button title={t('changeTheme')} onPress={toggleTheme} />
      <Button title={t('changeLang')} onPress={toggleLang} />
      <Button title={t('logout')} onPress={logout} />
      <Text>{user?.email}</Text>
      <Text>Theme: {theme}</Text>
    </View>
  );
}
