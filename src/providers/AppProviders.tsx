import React from 'react';
import '../i18n';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from '@tanstack/react-query';
import { useUIStore } from '../store/ui';
import { handleApiError } from '../lib/api';

import { AuthProvider } from './AuthProvider';


export const queryClient = new QueryClient({
  queryCache: new QueryCache({ onError: handleApiError }),
  mutationCache: new MutationCache({ onError: handleApiError }),

  defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false, gcTime: 0 } },

  defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false, cacheTime: 0 } },

});

interface Props {
  children: React.ReactNode;
}

export default function AppProviders({ children }: Props) {
  const theme = useUIStore((s) => s.theme);
  return (
    <QueryClientProvider client={queryClient}>

      <AuthProvider>
        <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
          {children}
        </NavigationContainer>
      </AuthProvider>

      <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
        {children}
      </NavigationContainer>

    </QueryClientProvider>
  );
}
