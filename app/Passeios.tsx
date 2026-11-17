import React, { useCallback, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import { useBanco } from '../components/DatabaseProvider';

import {
  listarViagens,
  listarPasseios,
  adicionarPasseio,
  atualizarPasseio,
  excluirPasseio,
  calcularTotal,
} from '../components/banco';

// Tipos dos dados

type Viagem = {
  id: number;
  local: string;
  data_ida: string;
  data_volta: string;
};

type Passeio = {
  id: number;
  id_viagem: number;
  titulo: string;
  descricao: string | null;
  data: string | null;
  valor: number;
};

export default function Passeios() {
  const db = useBanco();
  const router = useRouter();

  const { id } = useLocalSearchParams<{ id: string | string[] }>();

  const idViagem = Number(Array.isArray(id) ? id[0] : id);

  // Estados

  const [viagem, setViagem] = useState<Viagem | null>(null);
  const [passeios, setPasseios] = useState<Passeio[]>([]);
  const [total, setTotal] = useState(0);
  const [carregando, setCarregando] = useState(true);

  // Campos do formulário

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [valor, setValor] = useState('');

  const [idEdicao, setIdEdicao] = useState<number | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Carregar dados da viagem e dos passeios

  const carregarDados = useCallback(() => {
    try {
      if (!Number.isInteger(idViagem) || idViagem <= 0) {
        setViagem(null);
        setPasseios([]);
        setTotal(0);
        return;
      }

      const viagens = listarViagens(db);

      const viagemEncontrada = viagens.find(
        (item: Viagem) => item.id === idViagem
      );

      setViagem(viagemEncontrada ?? null);

      const lista = listarPasseios(db, idViagem);

      setPasseios(lista);
      setTotal(calcularTotal(db, idViagem));
    } catch (error) {
      console.error('Erro ao carregar os dados:', error);
      Alert.alert('Erro', 'Não foi possível carregar os passeios.');
    } finally {
      setCarregando(false);
    }
  }, [db, idViagem]);

  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [carregarDados])
  );

  // Limpar formulário

  function limparFormulario() {
    setTitulo('');
    setDescricao('');
    setData('');
    setValor('');
    setIdEdicao(null);
    setMostrarFormulario(false);
  }

  // Salvar ou atualizar passeio

  function salvarPasseio() {
    if (!titulo.trim()) {
      Alert.alert('Atenção', 'Informe o título do passeio.');
      return;
    }

    const valorNumerico = Number(valor.replace(',', '.'));

    if (valor.trim() !== '' && (!Number.isFinite(valorNumerico) || valorNumerico < 0)) {
      Alert.alert('Atenção', 'Informe um valor válido.');
      return;
    }

    try {
      if (idEdicao !== null) {
        atualizarPasseio(
          db,
          idEdicao,
          titulo.trim(),
          descricao.trim(),
          data.trim(),
          valorNumerico || 0
        );

        Alert.alert('Sucesso', 'Passeio atualizado!');
      } else {
        adicionarPasseio(
          db,
          idViagem,
          titulo.trim(),
          descricao.trim(),
          data.trim(),
          valorNumerico || 0
        );

        Alert.alert('Sucesso', 'Passeio cadastrado!');
      }

      limparFormulario();
      carregarDados();
    } catch (error) {
      console.error('Erro ao salvar passeio:', error);
      Alert.alert('Erro', 'Não foi possível salvar o passeio.');
    }
  }

  // Preparar edição

  function editarPasseio(passeio: Passeio) {
    setTitulo(passeio.titulo);
    setDescricao(passeio.descricao ?? '');
    setData(passeio.data ?? '');
    setValor(String(passeio.valor));
    setIdEdicao(passeio.id);
    setMostrarFormulario(true);
  }

  // Excluir passeio

  function removerPasseio(idPasseio: number) {
    Alert.alert(
      'Excluir passeio',
      'Deseja realmente excluir este passeio?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            try {
              excluirPasseio(db, idPasseio);
              carregarDados();
              Alert.alert('Sucesso', 'Passeio excluído!');
            } catch (error) {
              console.error('Erro ao excluir passeio:', error);
              Alert.alert('Erro', 'Não foi possível excluir o passeio.');
            }
          },
        },
      ]
    );
  }

  // Formatação de valores

  function formatarMoeda(valor: number) {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  // Tela de carregamento

  if (carregando) {
    return (
      <View style={styles.containerCarregando}>
        <ActivityIndicator size="large" color="#0177ff" />
        <Text style={styles.textoCarregando}>Carregando viagem...</Text>
      </View>
    );
  }

  // Viagem não encontrada

  if (!viagem) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Viagem não encontrada.</Text>

        <Pressable
          style={styles.botaoVoltar}
          onPress={() => router.back()}
        >
          <Text style={styles.textoBotao}>Voltar</Text>
        </Pressable>
      </View>
    );
  }

  // Página principal

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
      showsVerticalScrollIndicator={false}
    >
      {/* Cabeçalho */}

      <View style={styles.cabecalho}>
        <Text style={styles.logo}>TRIPGO</Text>

        <Text style={styles.tituloViagem}>
          {viagem.local}
        </Text>

        <Text style={styles.datas}>
          {viagem.data_ida} até {viagem.data_volta}
        </Text>

        <Pressable
          style={styles.botaoVoltar}
          onPress={() => router.back()}
        >
          <Text style={styles.textoBotao}>Voltar às viagens</Text>
        </Pressable>
      </View>

      {/* Resumo */}

      <View style={styles.resumo}>
        <View style={styles.resumoItem}>
          <Text style={styles.resumoNumero}>
            {passeios.length}
          </Text>

          <Text style={styles.resumoTexto}>
            Passeios cadastrados
          </Text>
        </View>

        <View style={styles.linhaVertical} />

        <View style={styles.resumoItem}>
          <Text style={styles.resumoNumero}>
            {formatarMoeda(total)}
          </Text>

          <Text style={styles.resumoTexto}>
            Total gasto
          </Text>
        </View>
      </View>

      {/* Lista de passeios */}

      <View style={styles.secao}>
        <Text style={styles.tituloSecao}>
          Meus passeios
        </Text>

        {passeios.length === 0 ? (
          <View style={styles.vazio}>
            <Text style={styles.vazioTitulo}>
              Nenhum passeio cadastrado
            </Text>

            <Text style={styles.vazioTexto}>
              Adicione seu primeiro passeio para organizar sua viagem.
            </Text>
          </View>
        ) : (
          passeios.map((passeio) => (
            <View style={styles.cardPasseio} key={passeio.id}>
              <View style={styles.cardTopo}>
                <Text style={styles.nomePasseio}>
                  {passeio.titulo}
                </Text>

                <Text style={styles.valorPasseio}>
                  {formatarMoeda(passeio.valor)}
                </Text>
              </View>

              {passeio.descricao ? (
                <Text style={styles.descricao}>
                  {passeio.descricao}
                </Text>
              ) : null}

              {passeio.data ? (
                <Text style={styles.dataPasseio}>
                  Data: {passeio.data}
                </Text>
              ) : null}

              <View style={styles.acoes}>
                <Pressable
                  style={styles.botaoEditar}
                  onPress={() => editarPasseio(passeio)}
                >
                  <Text style={styles.textoAcao}>
                    Editar
                  </Text>
                </Pressable>

                <Pressable
                  style={styles.botaoExcluir}
                  onPress={() => removerPasseio(passeio.id)}
                >
                  <Text style={styles.textoAcao}>
                    Excluir
                  </Text>
                </Pressable>
              </View>
            </View>
          ))
        )}
      </View>

      {/* Formulário */}

      {mostrarFormulario && (
        <View style={styles.formulario}>
          <Text style={styles.tituloSecao}>
            {idEdicao !== null ? 'Editar passeio' : 'Novo passeio'}
          </Text>

          <Text style={styles.label}>Título do passeio</Text>

          <TextInput
            style={styles.input}
            placeholder="Ex: Visita ao museu"
            value={titulo}
            onChangeText={setTitulo}
          />

          <Text style={styles.label}>Descrição</Text>

          <TextInput
            style={[styles.input, styles.inputDescricao]}
            placeholder="Descreva o passeio"
            value={descricao}
            onChangeText={setDescricao}
            multiline
          />

          <Text style={styles.label}>Data</Text>

          <TextInput
            style={styles.input}
            placeholder="Ex: 20/12/2026"
            value={data}
            onChangeText={setData}
          />

          <Text style={styles.label}>Valor (R$)</Text>

          <TextInput
            style={styles.input}
            placeholder="Ex: 150,00"
            value={valor}
            onChangeText={setValor}
            keyboardType="decimal-pad"
          />

          <Pressable
            style={styles.botaoSalvar}
            onPress={salvarPasseio}
          >
            <Text style={styles.textoBotao}>
              {idEdicao !== null ? 'Salvar alterações' : 'Cadastrar passeio'}
            </Text>
          </Pressable>

          <Pressable
            style={styles.botaoCancelar}
            onPress={limparFormulario}
          >
            <Text style={styles.textoCancelar}>
              Cancelar
            </Text>
          </Pressable>
        </View>
      )}

      {/* Botão adicionar */}

      {!mostrarFormulario && (
        <Pressable
          style={styles.botaoAdicionar}
          onPress={() => setMostrarFormulario(true)}
        >
          <Text style={styles.textoBotao}>
            + Adicionar passeio
          </Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

// Estilos da página

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FA',
  },

  conteudo: {
    paddingBottom: 35,
  },

  containerCarregando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F6FA',
  },

  textoCarregando: {
    marginTop: 12,
    fontSize: 16,
    color: '#011A43',
  },

  cabecalho: {
    backgroundColor: '#011A43',
    padding: 25,
    paddingTop: 45,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  logo: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 3,
    marginBottom: 25,
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#011A43',
    textAlign: 'center',
    marginBottom: 15,
  },

  tituloViagem: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  datas: {
    color: '#D5E4FF',
    fontSize: 14,
  },

  botaoVoltar: {
    alignSelf: 'flex-start',
    marginTop: 20,
    backgroundColor: '#0177ff',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  resumo: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    margin: 18,
    padding: 20,
    borderRadius: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 3,
  },

  resumoItem: {
    flex: 1,
    alignItems: 'center',
  },

  resumoNumero: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#0177ff',
  },

  resumoTexto: {
    fontSize: 12,
    color: '#667085',
    marginTop: 6,
    textAlign: 'center',
  },

  linhaVertical: {
    width: 1,
    height: 45,
    backgroundColor: '#E0E5ED',
    marginHorizontal: 10,
  },

  secao: {
    paddingHorizontal: 18,
    marginTop: 8,
  },

  tituloSecao: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#011A43',
    marginBottom: 15,
  },

  vazio: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
  },

  vazioTitulo: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#011A43',
    marginBottom: 8,
  },

  vazioTexto: {
    fontSize: 14,
    color: '#667085',
    textAlign: 'center',
    lineHeight: 21,
  },

  cardPasseio: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 15,
    marginBottom: 14,
    elevation: 2,
  },

  cardTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
    gap: 10,
  },

  nomePasseio: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#011A43',
  },

  valorPasseio: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0177ff',
  },

  descricao: {
    fontSize: 14,
    color: '#667085',
    marginBottom: 8,
    lineHeight: 20,
  },

  dataPasseio: {
    fontSize: 13,
    color: '#667085',
    marginBottom: 12,
  },

  acoes: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },

  botaoEditar: {
    flex: 1,
    backgroundColor: '#0177ff',
    padding: 11,
    borderRadius: 8,
    alignItems: 'center',
  },

  botaoExcluir: {
    flex: 1,
    backgroundColor: '#D92D20',
    padding: 11,
    borderRadius: 8,
    alignItems: 'center',
  },

  textoAcao: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },

  formulario: {
    backgroundColor: '#FFFFFF',
    margin: 18,
    padding: 20,
    borderRadius: 15,
    elevation: 2,
  },

  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#011A43',
    marginBottom: 7,
    marginTop: 12,
  },

  input: {
    backgroundColor: '#F3F6FA',
    borderWidth: 1,
    borderColor: '#DCE3ED',
    borderRadius: 9,
    padding: 13,
    fontSize: 15,
    color: '#011A43',
  },

  inputDescricao: {
    minHeight: 85,
    textAlignVertical: 'top',
  },

  botaoSalvar: {
    backgroundColor: '#0177ff',
    padding: 15,
    borderRadius: 10,
    marginTop: 22,
  },

  botaoCancelar: {
    padding: 13,
    alignItems: 'center',
    marginTop: 5,
  },

  textoCancelar: {
    color: '#667085',
    fontWeight: 'bold',
    fontSize: 14,
  },

  botaoAdicionar: {
    backgroundColor: '#0177ff',
    marginHorizontal: 18,
    marginTop: 5,
    marginBottom: 25,
    padding: 16,
    borderRadius: 12,
  },
});
