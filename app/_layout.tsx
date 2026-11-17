import { Stack } from 'expo-router';
import * as Notifications from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';
import { DatabaseProvider } from '../components/DatabaseProvider';
import { cores } from '../components/tema';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
 
export default function Layout() {
  return (
    <DatabaseProvider>
      <StatusBar style="light" />
 
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: cores.cabecalho },
          headerTintColor: cores.branco,
          headerTitleStyle: { fontWeight: '700' },
          headerShadowVisible: false,
          headerBackButtonDisplayMode: 'minimal',
          contentStyle: { backgroundColor: cores.fundo },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Minhas viagens',
            headerTitleAlign: 'left',
            headerTitleStyle: {
              color: cores.destaque,
              fontSize: 24,
              fontWeight: '700',
            },
          }}
        />
        <Stack.Screen name="Lista" options={{ title: 'Nova viagem' }} />
        <Stack.Screen name="Passeios" options={{ title: 'Detalhes' }} />
      </Stack>
    </DatabaseProvider>
  );
}
 
 
