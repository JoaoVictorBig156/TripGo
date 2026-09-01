import {
    View,
    Text,
    StyleSheet
} from "react-native";
export default function Gerenciamento2() {

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.detalhesViagem}>
                        <Text style={[styles.titulo,styles.coloracaoTexto]}>
                     Detalhes da viagem ao Belo Holorizonte:
                    </Text>
                    <Text style={[styles.detalhesTexto,styles.coloracaoTexto]}>
                     Uma viagem inesquecivel ao Belo Horizonte onde o viajante ira ficar, de 23/08/26 à 30/08/26, hospedado no Hotel
                     Tulip Inn experienciando as mais belas vistas e as mais incriveis atrações que se pode imaginar. Chegará a 
                     seu destino por meio de um carro e voltara pelo mesmo.
                    </Text>
                </View>
            </View>

        </View>
    )


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    detalhesViagem: {
        backgroundColor:"#0177ff",
        borderRadius:12,
        height:200,
        margin:5,
    },
    titulo:{
    fontSize:20,
    marginInline:10,
    },
    coloracaoTexto:{
    color:'white',
    },
    detalhesTexto:{
    marginInline:10,
    },
})

