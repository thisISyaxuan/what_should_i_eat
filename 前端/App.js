import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import AuthStack from "./routes/AuthStack";
import AsyncStorage from '@react-native-async-storage/async-storage';

// ...

import { useEffect } from "react";
export default function App() {
  useEffect(() => {
    // 在 app 啟動時檢查是否有 token
    checkTokenAndAutoLogin();
  }, []);

  const checkTokenAndAutoLogin = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        // 導航到主頁面，因為有可用的 token
        navigation.navigate("ButtomTabStack"); // 假設這個堆疊的名稱是 "ButtomTabStack"
      }
    } catch (error) {
      console.error("Error checking token:", error);
    }
  };

  return (
    <NavigationContainer>
      <AuthStack />
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
