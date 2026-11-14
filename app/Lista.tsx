
import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";

import { router } from "expo-router";
import { useBanco } from "../components/DatabaseProvider";
import { adicionarViagem } from "../components/banco";

export default function Lista() {
  const db = useBanco();

  const [local, setLocal] = useState("");
  const [dataDeIda, setDataIda] = useState("");
  const [dataDeVolta, setDataVolta] = useState("");
  const [salvando, setSalvando] = useState(false);

  async function adicionarItem() {
    if (
      local.trim() === "" ||
      dataDeIda.trim() === "" ||
      dataDeVolta.trim() === ""
    ) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    if (salvando) return;

    try {
      setSalvando(true);

      await adicionarViagem(
        db,
        local.trim(),
        dataDeIda.trim(),
        dataDeVolta.trim()
      );

      Alert.alert("Sucesso", "Viagem cadastrada!");

      setLocal("");
      setDataIda("");
      setDataVolta("");

      router.back();
    } catch (error) {
      console.error("Erro ao cadastrar viagem:", error);
      Alert.alert("Erro", "Não foi possível cadastrar a viagem.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.caixasDePerguntas}>
        <Text style={styles.titulo}>
          Nova viagem
        </Text>

        <TextInput
          style={styles.input}
          value={local}
          onChangeText={setLocal}
          placeholder="Local de destino"
        />

        <TextInput
          style={styles.input}
          value={dataDeIda}
          onChangeText={setDataIda}
          placeholder="Data de ida (DD/MM/AAAA)"
        />

        <TextInput
          style={styles.input}
          value={dataDeVolta}
          onChangeText={setDataVolta}
          placeholder="Data de volta (DD/MM/AAAA)"
        />
      </View>

      <View style={styles.posicaoBotao}>
        <Pressable
          style={[
            styles.botao,
            salvando && styles.botaoDesativado,
          ]}
          onPress={adicionarItem}
          disabled={salvando}
        >
          <Text style={styles.detalhes}>
            {salvando ? "Salvando..." : "Adicionar viagem"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  caixasDePerguntas: {
    gap: 15,
  },

  titulo: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },

  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },

  posicaoBotao: {
    alignItems: "center",
    marginTop: 25,
  },

  botao: {
    height: 45,
    width: 250,
    backgroundColor: "#011A43",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  botaoDesativado: {
    opacity: 0.6,
  },

  detalhes: {
    color: "white",
    fontSize: 18,
  },
});
