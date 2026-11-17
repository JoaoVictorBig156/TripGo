import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';
import { ActivityIndicator, Text, View } from 'react-native';
import { criarTabelas } from './banco';
import { cores } from './tema';

const BancoContext = createContext<SQLite.SQLiteDatabase | null>(null);

export function DatabaseProvider({ children }: { children: React.ReactNode }) {
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    let ativo = true;

    async function iniciarBanco() {
      try {
        const banco = await SQLite.openDatabaseAsync('tripgo.db');
        await criarTabelas(banco);

        if (ativo) setDb(banco);
      } catch (error) {
        console.error('Erro ao inicializar o SQLite:', error);
        if (ativo) setErro(true);
      }
    }

    iniciarBanco();
    return () => {
      ativo = false;
    };
  }, []);

  if (erro) {
    return (
      <View style={estilos.tela}>
        <Text style={estilos.texto}>Erro ao abrir o banco de dados.</Text>
      </View>
    );
  }

  if (!db) {
    return (
      <View style={estilos.tela}>
        <ActivityIndicator size="large" color={cores.destaque} />
        <Text style={estilos.texto}>Carregando banco de dados...</Text>
      </View>
    );
  }

  return <BancoContext.Provider value={db}>{children}</BancoContext.Provider>;
}

export function useBanco() {
  const banco = useContext(BancoContext);
  if (!banco) throw new Error('Banco de dados não inicializado.');
  return banco;
}

const estilos = {
  tela: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    backgroundColor: cores.fundo,
  },
  texto: {
    color: cores.textoSuave,
    marginTop: 12,
  },
};
