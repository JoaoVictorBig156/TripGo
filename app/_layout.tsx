import { SQLiteProvider } from 'expo-sqlite';
import { Stack } from 'expo-router';
import { criarTabelas } from '../components/banco';

export default function Layout() {
  return (
    <SQLiteProvider
      databaseName="tripgo.db"
      onInit={criarTabelas}
    >
      <Stack />
    </SQLiteProvider>
  );
}
