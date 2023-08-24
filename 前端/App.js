import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler';
import AuthStack from "./routes/AuthStack";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App({navigation}) {
  return (
    <NavigationContainer>
      <AuthStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
