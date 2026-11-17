import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';
import { View, Text, ActivityIndicator } from 'react-native';
import { criarTabelas } from './banco';
import { cores } from './tema';

const BancoContext = createContext<SQLite.SQLiteDatabase | null>(null);

// Só o visual das telas de carregamento/erro mudou (fundo escuro)
const estiloTela = {
  flex: 1,
  justifyContent: 'center' as const,
  alignItems: 'center' as const,
  backgroundColor: cores.fundo,
};

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
      <View style={estiloTela}>
        <Text style={{ color: cores.branco }}>Erro ao abrir o banco de dados.</Text>
      </View>
    );
  }

  if (!db) {
    return (
      <View style={estiloTela}>
        <ActivityIndicator size="large" color={cores.destaque} />
        <Text style={{ color: cores.textoSuave, marginTop: 12 }}>
          Carregando banco de dados...
        </Text>
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
