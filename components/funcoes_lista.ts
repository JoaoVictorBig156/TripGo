import { useState } from "react";

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
export function funcoes(){
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
      dataDeVolta,
      qtdPessoas: Number(qtdPessoas)

    };

    setViagens([...viagens, novaViagem]);
    setLocal("");
    setHotel("");
    setValorHotel("");
    setTransporte("");
    setValorTransporte("");
    setDataIda("");
    setDataVolta("");
    setQtdPessoas(""),
      setFormulario(false);
  }
  function excluirItem(idSelecionado: number) {
    setViagens((viagensAtuais) => viagensAtuais.filter((viagem) => viagem.id !== idSelecionado))


  }
 return{
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
    excluirItem
 }
   

 ;
}