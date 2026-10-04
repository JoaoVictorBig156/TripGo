import React, { useState, useCallback } from "react";

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";

import {
  router,
  useFocusEffect,
} from "expo-router";

import {
  useFuncoes,
  Viagem,
} from "../components/funcoes_lista";

export default function Index() {
  const { carregarLista } = useFuncoes();

  const [viagens, setViagens] = useState<Viagem[]>([]);

  useFocusEffect(
    useCallback(() => {
      const inicializar = async () => {
        const dadosRecuperados = await carregarLista();
        setViagens(dadosRecuperados);
      };

      inicializar();
    }, [])
  );

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

          <Text style={styles.semViagens}>
            Nenhuma viagem cadastrada ainda.
          </Text>

        ) : (

          viagens.map((viagem) => (

            <Pressable
              key={viagem.id}
              style={styles.viagemCadastrada}
              onPress={() =>
                router.push({
                  
                  pathname: "/Detalhes",
                  params: {
                    id: viagem.id.toString(),
                  },
                })
              }
            >

              <View>

                <Text
                  style={[
                    styles.localizacao,
                    styles.detalhe,
                  ]}
                >
                  {viagem.local}
                </Text>

                <Text style={styles.detalhe}>
                  {viagem.dataDeIda} - {viagem.dataDeVolta}
                </Text>

                <View style={styles.linha} />

                <Text style={styles.detalhe}>
                  <Text style={styles.negrito}>
                    Hotel:
                  </Text>{" "}
                  {viagem.nomeHotel}
                </Text>

                <Text style={styles.detalhe}>
                  <Text style={styles.negrito}>
                    Transporte:
                  </Text>{" "}
                  {viagem.nomeTransporte}
                </Text>

              </View>

              <View style={styles.posicaoValor}>

                <Text style={styles.valor}>
                  <Text style={styles.negrito}>
                    Valor Total:
                  </Text>{" "}
                  R$ {viagem.valor.toFixed(2)}
                </Text>

              </View>

            </Pressable>

          ))

        )}

      </View>

      <View style={styles.botao}>

        <Pressable
          style={styles.estiloBotao}
          onPress={() => router.push("/Lista")}
        >

          <Text style={styles.botaoTextoAdicionar}>
            Adicionar
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
  },

  imagem: {
    width: 80,
    height: 80,
    borderRadius: 24,
    borderWidth: 0.8,
  },

  posicaoCadastros: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 600,
  },

  semViagens: {
    color: "#666",
    fontSize: 16,
  },

  viagemCadastrada: {
    backgroundColor: "#0177ff",
    borderRadius: 12,
    width: 300,
    margin: 5,
    height: 180,
    flexDirection: "column",
    paddingTop: 10,
  },

  localizacao: {
    fontSize: 25,
  },

  detalhe: {
    color: "white",
    marginHorizontal: 10,
    marginBottom: 5,
  },

  negrito: {
    fontWeight: "bold",
  },

  linha: {
    width: 280,
    height: 1,
    backgroundColor: "white",
    marginHorizontal: 10,
    opacity: 0.8,
    marginVertical: 5,
  },

  posicaoValor: {
    alignItems: "flex-end",
    height: 75,
    justifyContent: "flex-end",
  },

  valor: {
    color: "white",
    fontSize: 20,
    marginRight: 10,
  },

  botao: {
    alignItems: "center",
  },

  estiloBotao: {
    height: 40,
    width: 250,
    backgroundColor: "#011A43",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  botaoTextoAdicionar: {
    color: "white",
    fontSize: 20,
  },

});
