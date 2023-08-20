import { StyleSheet, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import AuthStack from "./routes/AuthStack";

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
      <AuthStack />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
