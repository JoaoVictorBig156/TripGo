import {
  View,
  Text,
  StyleSheet
} from "react-native";


export default function Index() {
  

  return (
    <View style={styles.container}>
      <View style={styles.titulo}>
      </View>
      <View style={styles.posicaoCadastros}>
        <View style={styles.viagemCadastrada}>
          <View>
            <Text style={[styles.localizacao, styles.detalhe]}>Rio de Janeiro</Text>
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
        
        <View style={styles.viagemCadastrada}>
          <View>
            <Text style={[styles.localizacao, styles.detalhe]}>Belo Horizonte</Text>
            <Text style={styles.detalhe}>23/08/26-30/08/26</Text>
            <View style={styles.linha}></View>
            <Text style={styles.detalhe}>
              <Text style={styles.negrito}>Hotel</Text>: Tulip Inn Bauru........................R$650.00
            </Text>
            <Text style={styles.detalhe}>
              <Text style={styles.negrito}>Transporte</Text>: Carro............................R$334.00
            </Text>

          </View>
          <View style={styles.posicaoValor}>
            <Text style={styles.valor}>
              <Text style={styles.negrito}>Valor Total</Text>
              : R$ 984.00
            </Text>
          </View>



        </View>
        <View style={styles.viagemCadastrada}>
          <View>
            <Text style={[styles.localizacao, styles.detalhe]}>Curitiba</Text>
            <Text style={styles.detalhe}>14/07/26-19/07/26</Text>
            <View style={styles.linha}></View>
            <Text style={styles.detalhe}>
              <Text style={styles.negrito}>Hotel</Text>: Campina do Sirena...............................200.00
            </Text>
            <Text style={styles.detalhe}>
              <Text style={styles.negrito}>Transporte</Text>: Navio............................R$3678.00
            </Text>

          </View>
          <View style={styles.posicaoValor}>
            <Text style={styles.valor}>
              <Text style={styles.negrito}>Valor Total</Text>
              : R$ 3878.00
            </Text>
          </View>



        </View>
      </View>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: 200,
    flexDirection: "column",

  },
  posicaoCadastros: {
   flexDirection:"column",
   alignItems:"center",
  },
  negrito: {
    fontWeight: 500,
  },
  valor: {
    color: "white",
    fontSize: 25,
    marginInlineEnd:10,

  },
  posicaoValor: {
    alignItems: "flex-end",
    height: 75,
    justifyContent: "flex-end",
  },
  linha:{
  width:280,
  height:1,
  backgroundColor:"white",
  marginInlineStart:10,
  opacity:0.80,
  },
  titulo:{
    alignItems:"center",
  },
  estiloTitulo:{
  fontSize:30,
  fontWeight:500,
  },
})
