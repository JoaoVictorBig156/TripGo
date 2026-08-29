import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  ImageBackground,
} from "react-native";
import{funcoes} from "./funcoes_lista"
import{styles} from "./estilizacao_Lista"


export default function Lista() {
  const {local,
    setLocal,
    qtdPessoas,
    setQtdPessoas,
    nomeHotel,
    setHotel,
    valorHotel,
    setValorHotel,
    nomeTransporte,
    setTransporte,
    valorTransporte,
    setValorTransporte,
    dataDeIda,
    setDataIda,
    dataDeVolta,
    setDataVolta,
    viagens,
    setViagens,
    formularioIniciado,
    setFormulario,
    adicionarItem,
    excluirItem} = funcoes();
 
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
          value={qtdPessoas}
          onChangeText={setQtdPessoas}
          onFocus={() => setFormulario(true)}
          placeholder="Quantidade de Pessoas"
          keyboardType="numeric"
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
      <ImageBackground
        source={require("../assets/images/Captura_de_tela_2026-08-28_215933-removebg-preview.png")}
        style={styles.fundoLista}
        imageStyle={styles.imagemFundo}
        resizeMode="contain">
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
              <View style={styles.linha}>
                <Text style={styles.detalhes}>
                  Quantidade de Pessoas: {viagem.qtdPessoas}
                </Text>
              </View>

              <Text style={[styles.valorTotal, styles.detalhes]}>
                <Text style={styles.negrito}>Valor Total:</Text> R$ {viagem.valor.toFixed(2)}
              </Text>
            </View>
          )}
        />
      </ImageBackground>

    </View>



  );


}
