import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView ,TouchableOpacity,Button} from "react-native";

export default function ForgotPWD({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
    <Text> Forgot password </Text>

    </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button:{

  }
});
