import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";

type Viagem = {
  id: number;
  local: string;
  valor: number;
  nomeHotel: string
  valorHotel: number;
  nomeTransporte: string;
  valorTransporte: number;
  dataDeIda: string;
  dataDeVolta: string;
};

export default function Lista() {
  const [local, setLocal] = useState("");
  const [nomeHotel, setHotel] = useState("");
  const [valorHotel, setValorHotel] = useState("");
  const [nomeTransporte, setTransporte] = useState("");
  const [valorTransporte, setValorTransporte] = useState("");
  const [dataDeIda, setDataIda] = useState("");
  const [dataDeVolta, setDataVolta] = useState("");
  const [viagens, setViagens] = useState<Viagem[]>([]);
  let proximoId: number = 1;
  const total: number = Number(valorTransporte) + Number(valorHotel);
  const lista: number[] = viagens.map((viagem) => viagem.id);

  if (viagens.length > 0) {
    let maior: number = lista[0];
    for (let i = 0; i < lista.length; i++) {

      if (lista[i] > maior) {
        maior = lista[i];
      }

    }
    proximoId = maior + 1;
  }


  function adicionarItem() {

    const novaViagem: Viagem = {
      id: proximoId,
      local,
      valor: total,
      nomeHotel,
      valorHotel: Number(valorHotel),
      nomeTransporte,
      valorTransporte: Number(valorTransporte),
      dataDeIda,
      dataDeVolta

    };

    setViagens([...viagens, novaViagem]);
    setLocal("");
    setHotel("");
    setValorHotel("");
    setTransporte("");
    setValorTransporte("");
    setDataIda("");
    setDataVolta("");
  }

  return (<View>
    <View style={styles.caixasDePerguntas}>
      <TextInput
        style={styles.input}
        value={local}
        onChangeText={setLocal}
        placeholder="Local"
      />

      <TextInput
        style={styles.input}
        value={nomeHotel}
        onChangeText={setHotel}
        placeholder="Hotel"
      />

      <TextInput
        style={styles.input}
        value={valorHotel}
        onChangeText={setValorHotel}
        placeholder="preco hotel"
        keyboardType="numeric"

      />

      <TextInput
        style={styles.input}
        value={nomeTransporte}
        onChangeText={setTransporte}
        placeholder="Transporte"
      />

      <TextInput
        style={styles.input}
        value={valorTransporte}
        onChangeText={setValorTransporte}
        placeholder="preco transporte"
        keyboardType="numeric"

      />

      <TextInput
        style={styles.input}
        value={dataDeIda}
        onChangeText={setDataIda}
        placeholder="Data de Ida"
      />

      <TextInput
        style={styles.input}
        value={dataDeVolta}
        onChangeText={setDataVolta}
        placeholder="Data de Volta"
      />
    </View>
    <View style={styles.posicaoBotao} >
      <Pressable
        style={styles.botao}
        onPress={adicionarItem}
      >
        <Text style={styles.texto}>
          Adicionar
        </Text>
      </Pressable>
    </View>


    <FlatList
      data={viagens}
      keyExtractor={(viagem) => viagem.id.toString()}
      contentContainerStyle={styles.listaViagens}
      renderItem={({ item: viagem }) => (
        <View style={styles.registro}>
          <Text style={[styles.local, styles.texto]}>
            {viagem.local}
          </Text>

          <Text style={[styles.data, styles.texto]}>
            {viagem.dataDeIda} - {viagem.dataDeVolta}
          </Text>

          <View style={styles.linha}>
            <Text style={[styles.detalhes, styles.texto]}>
              <Text style={styles.negrito}>Hotel: </Text>
              {viagem.nomeHotel}
            </Text>

            <Text style={[styles.detalhes, styles.texto]}>
              Valor: R$ {viagem.valorHotel.toFixed(2)}
            </Text>
          </View>

          <View style={styles.linha}>
            <Text style={[styles.detalhes, styles.texto]}>
              <Text style={styles.negrito}>Transporte: </Text>
              {viagem.nomeTransporte}
            </Text>

            <Text style={[styles.detalhes, styles.texto]}>
              Valor: R$ {viagem.valorTransporte.toFixed(2)}
            </Text>
          </View>

          <Text style={[styles.valorTotal, styles.texto]}>
            <Text style={styles.negrito}>Valor Total:</Text> R$ {viagem.valor.toFixed(2)}
          </Text>
        </View>
      )}
    />
  </View>



  );


}
const styles = StyleSheet.create({
  listaViagens:{
  gap:10,
  },
  caixasDePerguntas: {
    gap: 10,
    backgroundColor: "blue",
    flexWrap:"nowrap",
  },
  input: {
    backgroundColor: "white",
    borderColor: "black",
    borderRadius: 12,
  },
  texto: {
    color: "white",
  },
  botao: {
    backgroundColor: "red",
    width: 100,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  posicaoBotao:{
  alignItems:"center",
  },
  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  registro: {
    backgroundColor: "blue",
    borderRadius: 12,
  },
  negrito: {
    fontWeight: "bold",
  },
  local: {
    fontSize: 25,
  },
  valorTotal: {
    fontSize: 25,
  },


})
