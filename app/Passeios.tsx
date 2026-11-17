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

import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import { useBanco } from '../components/DatabaseProvider';
import { cores } from '../components/tema';

import {
  buscarViagemPorId,
  listarPasseios,
  adicionarPasseio,
  atualizarPasseio,
  excluirPasseio,
  excluirViagem,
  atualizarViagem,
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
  const [editarDadosViagem, setEditarDadosViagem] = useState(false);
  const [localEditado, setLocalEditado] = useState('');
  const [idaEditada, setIdaEditada] = useState('');
  const [voltaEditada, setVoltaEditada] = useState('');

  // Carregar dados da viagem e dos passeios

  const carregarDados = useCallback(() => {
    try {
      if (!Number.isInteger(idViagem) || idViagem <= 0) {
        setViagem(null);
        setPasseios([]);
        setTotal(0);
        return;
      }

      const viagemEncontrada = buscarViagemPorId(db, idViagem);

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

  function iniciarEdicaoViagem() {
    if (!viagem) return;
    setLocalEditado(viagem.local);
    setIdaEditada(viagem.data_ida);
    setVoltaEditada(viagem.data_volta);
    setEditarDadosViagem(true);
  }

  function salvarEdicaoViagem() {
    if (!localEditado.trim() || !idaEditada.trim() || !voltaEditada.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos da viagem.');
      return;
    }

    try {
      atualizarViagem(
        db,
        idViagem,
        localEditado.trim(),
        idaEditada.trim(),
        voltaEditada.trim()
      );
      setEditarDadosViagem(false);
      carregarDados();
      Alert.alert('Sucesso', 'Viagem atualizada!');
    } catch (error) {
      console.error('Erro ao atualizar viagem:', error);
      Alert.alert('Erro', 'Não foi possível atualizar a viagem.');
    }
  }

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

  // Excluir a viagem inteira (os passeios são apagados junto, ON DELETE CASCADE)

  function removerViagem() {
    Alert.alert(
      'Excluir viagem',
      'Deseja realmente excluir esta viagem? Os passeios também serão excluídos.',
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
              excluirViagem(db, idViagem);
              router.back();
            } catch (error) {
              console.error('Erro ao excluir viagem:', error);
              Alert.alert('Erro', 'Não foi possível excluir a viagem.');
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
      <View style={styles.containerCentro}>
        <ActivityIndicator size="large" color={cores.destaque} />
        <Text style={styles.textoCarregando}>Carregando viagem...</Text>
      </View>
    );
  }

  // Viagem não encontrada

  if (!viagem) {
    return (
      <View style={styles.containerCentro}>
        <Text style={styles.titulo}>Viagem não encontrada.</Text>

        <Pressable
          style={styles.botaoContorno}
          onPress={() => router.back()}
        >
          <Text style={styles.textoContorno}>Voltar</Text>
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
      keyboardShouldPersistTaps="handled"
    >
      {/* Cabeçalho da viagem */}

      <Text style={styles.titulo}>{viagem.local}</Text>

      {!editarDadosViagem ? (
        <Pressable onPress={iniciarEdicaoViagem} style={styles.linkEditarViagem}>
          <Text style={styles.adicionar}>Editar dados da viagem</Text>
        </Pressable>
      ) : (
        <View style={styles.formulario}>
          <Text style={styles.tituloSecao}>Editar viagem</Text>
          <Text style={styles.label}>Destino</Text>
          <TextInput style={styles.input} value={localEditado} onChangeText={setLocalEditado} placeholder="Destino" placeholderTextColor={cores.textoSuave} />
          <Text style={styles.label}>Data de ida</Text>
          <TextInput style={styles.input} value={idaEditada} onChangeText={setIdaEditada} placeholder="DD/MM/AAAA" placeholderTextColor={cores.textoSuave} />
          <Text style={styles.label}>Data de volta</Text>
          <TextInput style={styles.input} value={voltaEditada} onChangeText={setVoltaEditada} placeholder="DD/MM/AAAA" placeholderTextColor={cores.textoSuave} />
          <Pressable style={styles.botaoPrimario} onPress={salvarEdicaoViagem}>
            <Text style={styles.textoPrimario}>Salvar viagem</Text>
          </Pressable>
          <Pressable style={styles.botaoContorno} onPress={() => setEditarDadosViagem(false)}>
            <Text style={styles.textoContorno}>Cancelar</Text>
          </Pressable>
        </View>
      )}

      <View style={styles.selo}>
        <Text style={styles.seloTexto}>Minha viagem</Text>
      </View>

      <View style={styles.caixa}>
        <Text style={styles.rotulo}>Total dos passeios</Text>
        <Text style={styles.valorGrande}>{formatarMoeda(total)}</Text>
      </View>

      <View style={styles.linhaDatas}>
        <View style={[styles.caixa, styles.metade]}>
          <Text style={styles.rotulo}>Data de ida</Text>
          <Text style={styles.data}>{viagem.data_ida}</Text>
        </View>

        <View style={[styles.caixa, styles.metade]}>
          <Text style={styles.rotulo}>Data de volta</Text>
          <Text style={styles.data}>{viagem.data_volta}</Text>
        </View>
      </View>

      {/* Lista de passeios */}

      <View style={styles.cabecalhoSecao}>
        <Text style={styles.tituloSecao}>Passeios</Text>

        {!mostrarFormulario && (
          <Pressable onPress={() => setMostrarFormulario(true)}>
            <Text style={styles.adicionar}>+ Adicionar</Text>
          </Pressable>
        )}
      </View>

      {passeios.length === 0 ? (
        <Text style={styles.vazio}>
          Nenhum passeio cadastrado. Adicione seu primeiro passeio para
          organizar sua viagem.
        </Text>
      ) : (
        <View style={styles.listaPasseios}>
          {passeios.map((passeio, indice) => (
            <View style={styles.cardPasseio} key={passeio.id}>
              <Pressable
                style={styles.cardConteudo}
                onPress={() => editarPasseio(passeio)}
              >
                <View style={styles.numero}>
                  <Text style={styles.numeroTexto}>{indice + 1}</Text>
                </View>

                <View style={styles.cardTextos}>
                  <Text style={styles.nomePasseio}>{passeio.titulo}</Text>

                  {passeio.descricao ? (
                    <Text style={styles.descricao}>{passeio.descricao}</Text>
                  ) : null}

                  {passeio.data ? (
                    <Text style={styles.descricao}>Data: {passeio.data}</Text>
                  ) : null}
                </View>

                <Text style={styles.valorPasseio}>
                  {formatarMoeda(passeio.valor)}
                </Text>
              </Pressable>

              <Pressable
                hitSlop={10}
                onPress={() => removerPasseio(passeio.id)}
              >
                <Ionicons name="close" size={22} color={cores.perigo} />
              </Pressable>
            </View>
          ))}

          <Text style={styles.dica}>Toque em um passeio para editar.</Text>
        </View>
      )}

      {/* Formulário */}

      {mostrarFormulario && (
        <View style={styles.formulario}>
          <Text style={styles.tituloSecao}>
            {idEdicao !== null ? 'Editar passeio' : 'Adicionar passeio'}
          </Text>

          <Text style={styles.label}>Nome do passeio</Text>

          <TextInput
            style={styles.input}
            placeholder="Ex.: Parque dos Sonhos"
            placeholderTextColor={cores.textoSuave}
            value={titulo}
            onChangeText={setTitulo}
          />

          <Text style={styles.label}>Observação (opcional)</Text>

          <TextInput
            style={[styles.input, styles.inputDescricao]}
            placeholder="Horário, dicas, o que levar..."
            placeholderTextColor={cores.textoSuave}
            value={descricao}
            onChangeText={setDescricao}
            multiline
          />

          <Text style={styles.label}>Data</Text>

          <TextInput
            style={styles.input}
            placeholder="Ex.: 20/12/2026"
            placeholderTextColor={cores.textoSuave}
            value={data}
            onChangeText={setData}
          />

          <Text style={styles.label}>Valor (R$)</Text>

          <TextInput
            style={styles.input}
            placeholder="Ex.: 150,00"
            placeholderTextColor={cores.textoSuave}
            value={valor}
            onChangeText={setValor}
            keyboardType="decimal-pad"
          />

          <Pressable
            style={styles.botaoPrimario}
            onPress={salvarPasseio}
          >
            <Text style={styles.textoPrimario}>
              {idEdicao !== null ? 'Salvar alterações' : 'Salvar passeio'}
            </Text>
          </Pressable>

          <Pressable
            style={styles.botaoContorno}
            onPress={limparFormulario}
          >
            <Text style={styles.textoContorno}>Cancelar</Text>
          </Pressable>
        </View>
      )}

      {/* Excluir viagem */}

      {!mostrarFormulario && (
        <Pressable style={styles.botaoPerigo} onPress={removerViagem}>
          <Text style={styles.textoPerigo}>Excluir viagem</Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

// Estilos da página

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },

  conteudo: {
    padding: 16,
    paddingBottom: 40,
  },

  containerCentro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: cores.fundo,
    gap: 16,
    padding: 20,
  },

  textoCarregando: {
    fontSize: 16,
    color: cores.textoSuave,
  },

  titulo: {
    color: cores.branco,
    fontSize: 28,
    fontWeight: '700',
  },

  selo: {
    alignSelf: 'flex-start',
    backgroundColor: cores.selo,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginTop: 10,
    marginBottom: 16,
  },

  seloTexto: {
    color: cores.branco,
    fontSize: 12,
    fontWeight: '700',
  },

  caixa: {
    backgroundColor: cores.cartao,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 14,
    padding: 14,
  },

  rotulo: {
    color: cores.textoSuave,
    fontSize: 13,
    marginBottom: 6,
  },

  valorGrande: {
    color: cores.destaque,
    fontSize: 28,
    fontWeight: '700',
  },

  linhaDatas: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },

  metade: {
    flex: 1,
  },

  data: {
    color: cores.branco,
    fontSize: 18,
    fontWeight: '700',
  },

  cabecalhoSecao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 26,
    marginBottom: 12,
  },

  tituloSecao: {
    color: cores.destaque,
    fontSize: 20,
    fontWeight: '700',
  },

  adicionar: {
    color: cores.destaque,
    fontSize: 15,
    fontWeight: '700',
  },

  vazio: {
    color: cores.textoSuave,
    fontSize: 15,
    lineHeight: 22,
  },

  listaPasseios: {
    gap: 10,
  },

  cardPasseio: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: cores.cartao,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 14,
    padding: 12,
  },

  cardConteudo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  numero: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: cores.selo,
    alignItems: 'center',
    justifyContent: 'center',
  },

  numeroTexto: {
    color: cores.branco,
    fontSize: 14,
    fontWeight: '700',
  },

  cardTextos: {
    flex: 1,
  },

  nomePasseio: {
    color: cores.branco,
    fontSize: 16,
    fontWeight: '700',
  },

  descricao: {
    color: cores.textoSuave,
    fontSize: 13,
    marginTop: 2,
  },

  valorPasseio: {
    color: cores.destaque,
    fontSize: 14,
    fontWeight: '700',
  },

  dica: {
    color: cores.textoSuave,
    fontSize: 12,
    marginTop: 2,
  },

  linkEditarViagem: {
    alignSelf: 'flex-start',
    marginTop: 8,
    marginBottom: 8,
  },

  formulario: {
    marginTop: 26,
  },

  label: {
    color: cores.textoSuave,
    fontSize: 13,
    marginBottom: 6,
    marginTop: 18,
  },

  input: {
    backgroundColor: cores.cartao,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: cores.branco,
  },

  inputDescricao: {
    minHeight: 100,
    textAlignVertical: 'top',
  },

  botaoPrimario: {
    height: 50,
    borderRadius: 25,
    backgroundColor: cores.destaque,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
  },

  textoPrimario: {
    color: cores.branco,
    fontSize: 16,
    fontWeight: '700',
  },

  botaoContorno: {
    height: 50,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: cores.destaque,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    marginTop: 12,
  },

  textoContorno: {
    color: cores.destaque,
    fontSize: 16,
    fontWeight: '700',
  },

  botaoPerigo: {
    height: 50,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: cores.perigo,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },

  textoPerigo: {
    color: cores.perigo,
    fontSize: 16,
    fontWeight: '700',
  },
});
