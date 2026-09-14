import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_LISTA = '@lista_de_itens';


export type Viagem = {
  id: number;
  local: string;
  valor: number;
  nomeHotel: string
  valorHotel: number;
  nomeTransporte: string;
  valorTransporte: number;
  dataDeIda: string;
  dataDeVolta: string;
  qtdPessoas: number;
};
export function useFuncoes() {
  const [local, setLocal] = useState("");
  const [nomeHotel, setHotel] = useState("");
  const [valorHotel, setValorHotel] = useState("");
  const [nomeTransporte, setTransporte] = useState("");
  const [valorTransporte, setValorTransporte] = useState("");
  const [dataDeIda, setDataIda] = useState("");
  const [dataDeVolta, setDataVolta] = useState("");
  const [qtdPessoas, setQtdPessoas] = useState("");
  const [viagens, setViagens] = useState<Viagem[]>([]);
  const [formularioIniciado, setFormulario] = useState(false);
  let proximoId: number = 1;
  const total: number = Number(valorTransporte) + Number(valorHotel);
  const lista: number[] = viagens.map((viagem) => viagem.id);

  const salvarLista = async (novaViagem: Viagem[]) => {
    try {
      const json = JSON.stringify(novaViagem);
      await AsyncStorage.setItem(CHAVE_LISTA, json);
    } catch (e) {
      console.warn('Erro ao salvar:', e);
    }
  };

  const carregarLista = async (): Promise<Viagem[]> => {
    try {
      const dadosSalvos = await AsyncStorage.getItem(CHAVE_LISTA);

      if (dadosSalvos !== null) {
        return JSON.parse(dadosSalvos);
      }
      return [];
    } catch (e) {
      console.warn('Erro ao carregar:', e);
      return [];
    }
  };

  if (viagens.length > 0) {
    let maior: number = lista[0];
    for (let i = 0; i < lista.length; i++) {

      if (lista[i] > maior) {
        maior = lista[i];
      }

    }
    proximoId = maior + 1;
  }


  const adicionarItem = async () => {
    const novaViagem: Viagem = {
      id: proximoId,
      local,
      valor: total,
      nomeHotel,
      valorHotel: Number(valorHotel),
      nomeTransporte,
      valorTransporte: Number(valorTransporte),
      dataDeIda,
      dataDeVolta,
      qtdPessoas: Number(qtdPessoas)

    };
    const listaNova = [...viagens, novaViagem];

    setViagens(listaNova);
    await salvarLista(listaNova);
    setLocal("");
    setHotel("");
    setValorHotel("");
    setTransporte("");
    setValorTransporte("");
    setDataIda("");
    setDataVolta("");
    setQtdPessoas("");
    setFormulario(false);
  };


  async function excluirItem(idSelecionado: number) {
    const exclusaoDeItem = viagens.filter((viagem) => viagem.id !== idSelecionado)

    setViagens(exclusaoDeItem);
    await salvarLista(exclusaoDeItem);
  }

  return {
    local,
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
    excluirItem,
    carregarLista,
    salvarLista
  }


    ;
}
