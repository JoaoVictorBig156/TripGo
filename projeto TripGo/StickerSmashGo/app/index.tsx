import { View,StyleSheet} from "react-native";
import Lista from "../components/Lista";

export default function Index() {
  return (
    <View style={styles.container}>
      <Lista />
    </View>
  );
}
const styles = StyleSheet.create({
  container:{
    flex:1,
  }
})
