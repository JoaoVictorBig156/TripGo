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
  const [formularioIniciado, setFormulario] = useState(false);
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
    setFormulario(false);
  }
  function excluirItem(idSelecionado: number) {
    setViagens((viagensAtuais) => viagensAtuais.filter((viagem) => viagem.id !== idSelecionado))


  }

  return (
    <View style={styles.container}>
      <View style={styles.caixasDePerguntas}>
        <TextInput
          style={styles.input}
          value={local}
          onChangeText={setLocal}
          onFocus={() => setFormulario(true)}
          placeholder="Local"
        />

        <TextInput
          style={styles.input}
          value={nomeHotel}
          onChangeText={setHotel}
          onFocus={() => setFormulario(true)}
          placeholder="Hotel"
        />

        <TextInput
          style={styles.input}
          value={valorHotel}
          onChangeText={setValorHotel}
          onFocus={() => setFormulario(true)}
          placeholder="preco hotel"
          keyboardType="numeric"

        />

        <TextInput
          style={styles.input}
          value={nomeTransporte}
          onChangeText={setTransporte}
          onFocus={() => setFormulario(true)}
          placeholder="Transporte"
        />

        <TextInput
          style={styles.input}
          value={valorTransporte}
          onChangeText={setValorTransporte}
          onFocus={() => setFormulario(true)}
          placeholder="preco transporte"
          keyboardType="numeric"

        />

        <TextInput
          style={styles.input}
          value={dataDeIda}
          onChangeText={setDataIda}
          onFocus={() => setFormulario(true)}
          placeholder="Data de Ida"
        />

        <TextInput
          style={styles.input}
          value={dataDeVolta}
          onChangeText={setDataVolta}
          onFocus={() => setFormulario(true)}
          placeholder="Data de Volta"
        />
      </View>
      <View style={styles.posicaoBotao} >
        <Pressable
          style={[styles.botao, !formularioIniciado && styles.formularioInativo]}
          onPress={adicionarItem}
        >
          <Text style={styles.detalhes}>
            Adicionar
          </Text>
        </Pressable>
      </View>
      <FlatList
        data={viagens}
        style={styles.lista}
        keyExtractor={(viagem) => viagem.id.toString()}
        contentContainerStyle={styles.listaViagens}
        renderItem={({ item: viagem }) => (
          <View style={styles.registro}>
            <View style={styles.linha}>
               <Text style={[styles.local, styles.detalhes]}>
              {viagem.local}
            </Text>
            <Pressable
              onPress={() => excluirItem(viagem.id)}
              style={styles.botaoDeExcluir}>
              <Text style={styles.icone}>🗑️</Text>
            </Pressable>
            </View>
           

            <Text style={styles.detalhes}>
              {viagem.dataDeIda} - {viagem.dataDeVolta}
            </Text>

            <View style={styles.linha}>
              <Text style={styles.detalhes}>
                <Text style={styles.negrito}>Hotel: </Text>
                {viagem.nomeHotel}
              </Text>

              <Text style={styles.detalhes}>
                Valor: R$ {viagem.valorHotel.toFixed(2)}
              </Text>
            </View>

            <View style={styles.linha}>
              <Text style={styles.detalhes}>
                <Text style={styles.negrito}>Transporte: </Text>
                {viagem.nomeTransporte}
              </Text>

              <Text style={styles.detalhes}>
                Valor: R$ {viagem.valorTransporte.toFixed(2)}
              </Text>
            </View>

            <Text style={[styles.valorTotal, styles.detalhes]}>
              <Text style={styles.negrito}>Valor Total:</Text> R$ {viagem.valor.toFixed(2)}
            </Text>
          </View>
        )}
      />
    </View>



  );


}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lista: {
    flex: 1,
    width: "100%",
  },

  listaViagens: {
    gap: 10,
    padding: 10,
  },
  caixasDePerguntas: {
    gap: 10,
    backgroundColor: "blue",
    flexWrap: "wrap",
    justifyContent: "center",
    flexDirection: "row",
  },
  input: {
    backgroundColor: "white",
    borderColor: "black",
    borderRadius: 12,
    width: 175,
  },
  formularioInativo: {
    backgroundColor: "black",
  },
  detalhes: {
    color: "white",
  },
  botao: {
    backgroundColor: "red",
    width: 400,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  botaoDeExcluir:{
  backgroundColor:"red",
  height:35,
  width:35,
  justifyContent:"center",
  alignItems:"center",
  borderRadius:12,
  borderColor:"black",
  borderWidth:2,
  },
  icone:{
    fontSize:15,
  },
  posicaoBotao: {
    alignItems: "center",
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
