
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export async function solicitarPermissaoNotificacoes(): Promise<boolean> {
  if (Platform.OS !== 'android') {
    return false;
  }

  await Notifications.setNotificationChannelAsync('viagens', {
    name: 'Notificações de viagens',
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#2881ee',
    sound: 'default',
  });

  const permissaoAtual = await Notifications.getPermissionsAsync();

  let status = permissaoAtual.status;

  if (status !== 'granted') {
    const permissaoSolicitada =
      await Notifications.requestPermissionsAsync();

    status = permissaoSolicitada.status;
  }

  console.log('Permissão de notificações:', status);

  return status === 'granted';
}

export async function notificarViagem(local: string): Promise<void> {
  const identificador =
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Viagem cadastrada com sucesso!',
        body: `Sua viagem para ${local} foi adicionada ao TripGo.`,
        sound: 'default',
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 1,
        channelId: 'viagens',
      },
    });

  console.log('Notificação agendada:', identificador);
}
