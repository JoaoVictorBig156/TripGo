 
import React, { useState } from "react";
 
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
 
import { router } from "expo-router";
import { useBanco } from "../components/DatabaseProvider";
import { adicionarViagem } from "../components/banco";
import { cores } from "../components/tema";
 
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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.caixasDePerguntas}>
        <View>
          <Text style={styles.rotulo}>Local de destino</Text>
          <TextInput
            style={styles.input}
            value={local}
            onChangeText={setLocal}
            placeholder="Ex.: Águas de São Pedro"
            placeholderTextColor={cores.textoSuave}
          />
        </View>
 
        <View>
          <Text style={styles.rotulo}>Data de ida</Text>
          <TextInput
            style={styles.input}
            value={dataDeIda}
            onChangeText={setDataIda}
            placeholder="DD/MM/AAAA"
            placeholderTextColor={cores.textoSuave}
          />
        </View>
 
        <View>
          <Text style={styles.rotulo}>Data de volta</Text>
          <TextInput
            style={styles.input}
            value={dataDeVolta}
            onChangeText={setDataVolta}
            placeholder="DD/MM/AAAA"
            placeholderTextColor={cores.textoSuave}
          />
        </View>
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
 
        <Pressable
          style={styles.botaoCancelar}
          onPress={() => router.back()}
        >
          <Text style={styles.textoCancelar}>Cancelar</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
 
  conteudo: {
    padding: 16,
    paddingBottom: 40,
  },
 
  caixasDePerguntas: {
    gap: 18,
  },
 
  rotulo: {
    color: cores.textoSuave,
    fontSize: 13,
    marginBottom: 6,
  },
 
  input: {
    backgroundColor: cores.cartao,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: cores.branco,
  },
 
  posicaoBotao: {
    marginTop: 32,
    gap: 12,
  },
 
  botao: {
    height: 50,
    backgroundColor: cores.destaque,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
 
  botaoDesativado: {
    opacity: 0.6,
  },
 
  detalhes: {
    color: cores.branco,
    fontSize: 16,
    fontWeight: "700",
  },
 
  botaoCancelar: {
    height: 50,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: cores.destaque,
    alignItems: "center",
    justifyContent: "center",
  },
 
  textoCancelar: {
    color: cores.destaque,
    fontSize: 16,
    fontWeight: "700",
  },
});
 
 
