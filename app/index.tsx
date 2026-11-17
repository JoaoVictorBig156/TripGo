
import React, { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import { useBanco } from "../components/DatabaseProvider";
import { listarViagensComTotal } from "../components/banco";
import { cores } from "../components/tema";

type ViagemComTotal = {
  id: number;
  local: string;
  data_ida: string;
  data_volta: string;
  valor_total: number;
};

function formatarMoeda(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function Inicio() {
  const db = useBanco();
  const [viagens, setViagens] = useState<ViagemComTotal[]>([]);

  useFocusEffect(
    useCallback(() => {
      try {
        setViagens(listarViagensComTotal(db));
      } catch (error) {
        console.error("Erro ao listar viagens:", error);
        Alert.alert("Erro", "Não foi possível carregar as viagens.");
      }
    }, [db])
  );

  function renderItem({ item }: { item: ViagemComTotal }) {
    return (
      <Pressable
        style={({ pressed }) => [
          estilos.cartao,
          pressed && estilos.cartaoPressionado,
        ]}
        onPress={() =>
          router.push({
            pathname: "/Passeios",
            params: { id: String(item.id) },
          })
        }
      >
        <View style={estilos.topo}>
          <Text style={estilos.local} numberOfLines={1}>
            {item.local}
          </Text>

          <Text style={estilos.valor}>
            {formatarMoeda(item.valor_total)}
          </Text>
        </View>

        <View style={estilos.base}>
          <View>
            <Text style={estilos.rotulo}>Ida</Text>
            <Text style={estilos.data}>{item.data_ida}</Text>
          </View>

          <View>
            <Text style={estilos.rotulo}>Volta</Text>
            <Text style={estilos.data}>{item.data_volta}</Text>
          </View>

          <Text style={estilos.detalhes}>{"Detalhes >"}</Text>
        </View>
      </Pressable>
    );
  }

  return (
    <View style={estilos.tela}>
      <FlatList
        data={viagens}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={estilos.conteudo}
        ItemSeparatorComponent={() => (
          <View style={estilos.separador} />
        )}
        ListHeaderComponent={
          <Text style={estilos.secao}>
            Viagens cadastradas
          </Text>
        }
        ListEmptyComponent={
          <Text style={estilos.vazio}>
            Você ainda não cadastrou nenhuma viagem. Toque em
            "Criar nova viagem" para começar.
          </Text>
        }
        ListFooterComponent={
          <Pressable
            style={({ pressed }) => [
              estilos.criar,
              pressed && estilos.cartaoPressionado,
            ]}
            onPress={() => router.push("/Lista")}
          >
            <Text style={estilos.criarTexto}>
              + Criar nova viagem
            </Text>
          </Pressable>
        }
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  conteudo: {
    padding: 16,
    paddingBottom: 40,
    flexGrow: 1,
  },
  secao: {
    color: cores.destaque,
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 12,
  },
  vazio: {
    color: cores.textoSuave,
    fontSize: 15,
    lineHeight: 22,
  },
  separador: {
    height: 12,
  },
  cartao: {
    backgroundColor: cores.cartao,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 14,
    padding: 16,
  },
  cartaoPressionado: {
    opacity: 0.85,
  },
  topo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  local: {
    flex: 1,
    color: cores.branco,
    fontSize: 18,
    fontWeight: "700",
  },
  valor: {
    color: cores.destaque,
    fontSize: 18,
    fontWeight: "700",
  },
  base: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 28,
    marginTop: 20,
  },
  rotulo: {
    color: cores.textoSuave,
    fontSize: 12,
  },
  data: {
    color: cores.destaque,
    fontSize: 15,
    fontWeight: "700",
    marginTop: 2,
  },
  detalhes: {
    marginLeft: "auto",
    color: cores.destaque,
    fontSize: 13,
  },
  criar: {
    alignSelf: "center",
    marginTop: 28,
    backgroundColor: cores.cabecalho,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 24,
  },
  criarTexto: {
    color: cores.branco,
    fontSize: 16,
    fontWeight: "700",
  },
});
