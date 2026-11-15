
import React, { useState, useCallback } from "react";

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Alert,
} from "react-native";

import {
  router,
  useFocusEffect,
} from "expo-router";
import { useBanco } from '../components/DatabaseProvider';

import {
  listarViagensComTotal,
  excluirViagem,
} from "../components/banco";

type Viagem = {
  id: number;
  local: string;
  data_ida: string;
  data_volta: string;
  valor_total: number;
};

export default function Index() {
  const db = useBanco();

  const [viagens, setViagens] = useState<Viagem[]>([]);

  // Carregar viagens do banco
  const carregarViagens = useCallback(() => {
    const dados = listarViagensComTotal(db);
    setViagens(dados);
  }, [db]);

  useFocusEffect(
    useCallback(() => {
      carregarViagens();
    }, [carregarViagens])
  );

  // Excluir viagem
  function removerViagem(id: number, local: string) {
    Alert.alert(
      "Excluir viagem",
      `Deseja realmente excluir a viagem para ${local}? Os passeios relacionados também serão excluídos.`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            try {
              excluirViagem(db, id);

              carregarViagens();

              Alert.alert(
                "Sucesso",
                "Viagem excluída com sucesso!"
              );
            } catch (error) {
              Alert.alert(
                "Erro",
                "Não foi possível excluir a viagem."
              );
              console.error(error);
            }
          },
        },
      ]
    );
  }

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

            <View
              key={viagem.id}
              style={styles.viagemCadastrada}
            >

              <Pressable
                onPress={() =>
                  router.push({
                    pathname: "/Passeios",
                    params: {
                      id: viagem.id.toString(),
                    },
                  })
                }
              >

                <Text
                  style={[
                    styles.localizacao,
                    styles.detalhe,
                  ]}
                >
                  {viagem.local}
                </Text>

                <Text style={styles.detalhe}>
                  Ida: {viagem.data_ida}
                </Text>

                <Text style={styles.detalhe}>
                  Volta: {viagem.data_volta}
                </Text>

                <View style={styles.linha} />

                <View style={styles.posicaoValor}>
                  <Text style={styles.valor}>
                    <Text style={styles.negrito}>
                      Total dos passeios:
                    </Text>{" "}
                    R$ {viagem.valor_total.toFixed(2)}
                  </Text>
                </View>

              </Pressable>

              <View style={styles.acoes}>

                <Pressable
                  style={styles.botaoExcluir}
                  onPress={() =>
                    removerViagem(viagem.id, viagem.local)
                  }
                >
                  <Text style={styles.textoExcluir}>
                    Excluir viagem
                  </Text>
                </Pressable>

              </View>

            </View>

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
      padding: 20,
  transform: [{ translateY: -40 }],
  },

  imagem: {
    width: 80,
    height: 80,
    borderRadius: 24,
    borderWidth: 0.8,
    transform: [{ translateY: 40 }],
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
    minHeight: 180,
    paddingTop: 10,
    paddingBottom: 10,
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
    marginTop: 5,
  },

  valor: {
    color: "white",
    fontSize: 17,
    marginRight: 10,
  },

  acoes: {
    alignItems: "flex-end",
    marginHorizontal: 10,
    marginTop: 10,
  },

  botaoExcluir: {
    backgroundColor: "#A82020",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  textoExcluir: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
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
