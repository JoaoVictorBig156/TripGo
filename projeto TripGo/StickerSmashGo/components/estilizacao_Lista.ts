import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lista: {
    flex: 1,
    width: "100%",
  },
  fundoLista: {
    flex: 1,
    width: "100%",

  },
  imagemFundo: {
    opacity: 0.50,
  },
  listaViagens: {
    gap: 10,
    padding: 10,
  },
  caixasDePerguntas: {
    gap: 10,
    backgroundColor: "#0177ff",
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
    backgroundColor: "#3c3c3c",
    opacity: 0.7,
  },
  detalhes: {
    color: "white",
  },
  botao: {
    backgroundColor: "#d80909cc",
    width: 400,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  botaoDeExcluir: {
    backgroundColor: "red",
    height: 35,
    width: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    borderColor: "black",

  },
  icone: {
    fontSize: 15,
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
    backgroundColor: "#0177ff",
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
