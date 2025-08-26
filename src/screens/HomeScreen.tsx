import React from 'react';
import { View, Text, Button } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useUIStore } from '../store/ui';
import i18n from '../i18n';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

export default function HomeScreen() {
  const { t } = useTranslation();
  const theme = useUIStore((s) => s.theme);
  const toggleTheme = useUIStore((s) => s.toggleTheme);
  const toggleLang = () => i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
  const { data, isLoading } = useQuery({
    queryKey: ['todo'],
    queryFn: async () => (await api.get('/todos/1')).data,

import { useThemeStore } from '../store/theme';
import i18n from '../i18n';
import { useQuery } from '@tanstack/react-query';

export default function HomeScreen() {
  const { t } = useTranslation();
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const toggleLang = () => i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
  const { data, isLoading } = useQuery({
    queryKey: ['todo'],
    queryFn: async () => (await fetch('https://jsonplaceholder.typicode.com/todos/1')).json(),

  });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{t('hello')}</Text>
      <Text>{isLoading ? t('loading') : data?.title}</Text>
      <Button title={t('changeTheme')} onPress={toggleTheme} />
      <Button title={t('changeLang')} onPress={toggleLang} />
      <Text>Theme: {theme}</Text>
    </View>
  );
}
