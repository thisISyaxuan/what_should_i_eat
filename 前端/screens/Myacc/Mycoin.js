import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { View,Text,StyleSheet } from "react-native";

export default function Mycoin() {
    const navigation = useNavigation();
    return (
      <View style={styles.container}>
        <Text>Mycoins screen</Text>
      </View>
    );
  };
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
      },
      text:{
        fontSize:50,
      }
});
