
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useFuncoes, Viagem } from "../components/funcoes_lista";
import { useEffect, useState } from "react";

export default function Detalhe() {
  const { id } = useLocalSearchParams();
  const { carregarLista } = useFuncoes();

  const [viagem, setViagem] = useState<Viagem | null>(null);

  useEffect(() => {
    const buscarViagem = async () => {
      const viagens = await carregarLista();

      const encontrada = viagens.find(
        (item) => item.id === Number(id)
      );

      setViagem(encontrada || null);
    };

    buscarViagem();
  }, [id]);

  if (!viagem) {
    return (
      <View style={styles.container}>
        <Text style={styles.erro}>
          Viagem não encontrada.
        </Text>

        <Pressable
          style={styles.botao}
          onPress={() => router.back()}
        >
          <Text style={styles.textoBotao}>Voltar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        Detalhes da viagem
      </Text>

      <View style={styles.card}>

        <Text style={styles.local}>
          {viagem.local}
        </Text>

        <Text style={styles.info}>
          Data de ida: {viagem.dataDeIda}
        </Text>

        <Text style={styles.info}>
          Data de volta: {viagem.dataDeVolta}
        </Text>

        <Text style={styles.info}>
          Quantidade de pessoas: {viagem.qtdPessoas}
        </Text>

        <View style={styles.linha} />

        <Text style={styles.info}>
          Hotel: {viagem.nomeHotel}
        </Text>

        <Text style={styles.info}>
          Valor do hotel: R$ {viagem.valorHotel.toFixed(2)}
        </Text>

        <Text style={styles.info}>
          Transporte: {viagem.nomeTransporte}
        </Text>

        <Text style={styles.info}>
          Valor do transporte: R$ {viagem.valorTransporte.toFixed(2)}
        </Text>

        <View style={styles.linha} />

        <Text style={styles.total}>
          Valor total: R$ {viagem.valor.toFixed(2)}
        </Text>

      </View>

      <Pressable
        style={styles.botao}
        onPress={() => router.back()}
      >
        <Text style={styles.textoBotao}>
          Voltar
        </Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    width: "100%",
    backgroundColor: "#0177ff",
    borderRadius: 12,
    padding: 20,
  },

  local: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
  },

  info: {
    color: "white",
    fontSize: 16,
    marginBottom: 8,
  },

  total: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },

  linha: {
    height: 1,
    backgroundColor: "white",
    opacity: 0.7,
    marginVertical: 12,
  },

  botao: {
    width: 200,
    height: 45,
    backgroundColor: "#011A43",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  textoBotao: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  erro: {
    fontSize: 18,
  },
});
