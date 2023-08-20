import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler';
import AuthStack from "./routes/AuthStack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";

export default function App({navigation}) {
  const [userToken, setUserToken] = useState(null);
  

  return (
    <NavigationContainer>
      <AuthStack screenProps={{userToken}} />
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
