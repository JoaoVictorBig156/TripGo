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
                     Detalhes da viagem à Curitiba:
                    </Text>
                    <Text style={[styles.detalhesTexto,styles.coloracaoTexto]}>
                     Uma viagem inesquecivel à Curitiba onde o viajante ira ficar, de 17/07/26 à 19/07/26, hospedado no Hotel
                     Campina do Sirena experienciando as mais belas vistas e as mais incriveis atrações que se pode imaginar. Chegará a 
                     seu destino por meio de um navio e voltara pelo mesmo.
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

