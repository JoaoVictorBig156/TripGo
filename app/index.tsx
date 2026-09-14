import React from "react";

import { useState, useCallback } from "react";

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView
} from "react-native";
import {
  router,
  useFocusEffect
} from "expo-router";
import { useFuncoes, Viagem } from "../components/funcoes_lista"

export default function Index() {

  const { carregarLista } = useFuncoes();
  const [viagens, setViagens] = useState<Viagem[]>([]);

  useFocusEffect(useCallback(() => {
    const inicializar = async () => {
      const dadosRecuperados = await carregarLista();
      setViagens(dadosRecuperados);
    };

    inicializar();
  }, []));

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require("../assets/images/Captura_de_tela_2026-08-28_215933-removebg-preview.png")}
          style={styles.imagem}
        />
      </View>

      <View style={styles.posicaoCadastros}>
        {viagens.length === 0 ? (
          <Text style={{ color: "#666", fontSize: 16 }}>
            Nenhuma viagem cadastrada ainda.
          </Text>
        ) : (
          viagens.map((viagem) => (

            <View key={viagem.id} style={styles.viagemCadastrada}>
              <View>
                <Text style={[styles.localizacao, styles.detalhe]}>{viagem.local}</Text>
                <Text style={styles.detalhe}>26/08/26-29/08/26</Text>
                <View style={styles.linha}></View>
                <Text style={styles.detalhe}>
                  <Text style={styles.negrito}>Hotel</Text>: Santa Teresa............................R$440.00
                </Text>
                <Text style={styles.detalhe}>
                  <Text style={styles.negrito}>Transporte</Text>: Aviao............................R$3000.00
                </Text>

              </View>
              <View style={styles.posicaoValor}>
                <Text style={styles.valor}>
                  <Text style={styles.negrito}>Valor Total</Text>
                  : R$ 3440.00
                </Text>
              </View>
            </View>

          ))
        )}


      </View>
      <View style={styles.botao}>
        <Pressable
          style={styles.estiloBotao}
          onPress={() => router.push("/Lista")}>
          <Text style={styles.botaoTextoAdicionar}>Adicionar</Text>
        </Pressable>
      </View>

    </View>
  );



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  localizacao: {
    fontSize: 25,
  },
  detalhe: {
    color: "white",
    marginInline: 10,
  },
  viagemCadastrada: {
    backgroundColor: "#0177ff",
    borderRadius: 12,
    width: 300,
    margin: 5,
    height: 180,
    flexDirection: "column",

  },
  posicaoCadastros: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 600,
  },
  negrito: {
    fontWeight: 500,
  },
  valor: {
    color: "white",
    fontSize: 25,
    marginInlineEnd: 10,

  },
  posicaoValor: {
    alignItems: "flex-end",
    height: 75,
    justifyContent: "flex-end",
  },
  linha: {
    width: 280,
    height: 1,
    backgroundColor: "white",
    marginInlineStart: 10,
    opacity: 0.80,
  },
  titulo: {
    alignItems: "center",
  },
  estiloTitulo: {
    fontSize: 30,
    fontWeight: 500,
  },
  estiloBotao: {
    height: 40,
    width: 250,
    backgroundColor: '#011A43',
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  botaoTextoAdicionar: {
    color: "white",
    fontSize: 20,
  },
  imagem: {
    width: 80,
    height: 80,
    borderRadius: 24,
    borderWidth: 0.8,
  },
  botao: {
    alignItems: "center",
  }


})
