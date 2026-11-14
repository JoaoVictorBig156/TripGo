
import { Stack } from 'expo-router';
import { DatabaseProvider } from '../components/DatabaseProvider';

export default function Layout() {
  return (
    <DatabaseProvider>
      <Stack />
    </DatabaseProvider>
  );
}
