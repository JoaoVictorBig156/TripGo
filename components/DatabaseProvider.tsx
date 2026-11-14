
import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';
import { View, Text, ActivityIndicator } from 'react-native';
import { criarTabelas } from './banco';

const BancoContext = createContext<SQLite.SQLiteDatabase | null>(null);

export function DatabaseProvider({ children }: { children: React.ReactNode }) {
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    async function iniciarBanco() {
      try {
        // Abre o banco de dados
        const banco = await SQLite.openDatabaseAsync('tripgo.db');

        // Cria as tabelas
        await criarTabelas(banco);

        setDb(banco);
      } catch (error) {
        console.error('Erro ao abrir o banco:', error);
        setErro(true);
      }
    }

    iniciarBanco();
  }, []);

  if (erro) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Erro ao abrir o banco de dados.</Text>
      </View>
    );
  }

  if (!db) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Carregando banco de dados...</Text>
      </View>
    );
  }

  return (
    <BancoContext.Provider value={db}>
      {children}
    </BancoContext.Provider>
  );
}

export function useBanco() {
  const banco = useContext(BancoContext);

  if (!banco) {
    throw new Error('Banco de dados não inicializado.');
  }

  return banco;
}
