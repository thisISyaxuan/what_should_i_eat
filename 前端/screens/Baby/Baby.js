import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

export default function Baby() {
  const navigation = useNavigation();
  const [hasSignedIn, setHasSignedIn] = useState(false); // 初始設置為未簽到

  const handleSignIn = () => {
    setHasSignedIn(true); // 當按下按鈕時，設置為已簽到
  };

  return (
    <ImageBackground source={require('../../assets/images/Background.jpg')} style={styles.container}>
      <TouchableOpacity style={styles.btn}>
        <Image style={{ width: 35, height: 35 }} source={require('../../assets/images/coin.png')} />
        <Text>800</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.collect} onPress={() => navigation.navigate("精靈圖鑑")}>
        <Image style={{ width: 50, height: 50 }} source={require('../../assets/images/babybook.png')} />
        <Text>精靈圖鑑</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.signIn} 
        onPress={handleSignIn} 
        disabled={hasSignedIn}
      >
        <Image style={{ width: 50, height: 50, opacity: hasSignedIn ? 0.5 : 1 }} source={require('../../assets/todolist.png')} />
        <Text>今日簽到</Text>
      </TouchableOpacity>
      
      <View style={styles.circle}>
        <Image style={{ width: 250, resizeMode: 'contain' }} source={require("../../assets/images/baby/baby0/6.png")} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  circle: {
    width: 300,
    height: 300,
    borderRadius: 50,
    marginRight: 10,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  btn: {
    position: 'absolute',
    top: 30,
    left: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signIn: {
    position: 'absolute',
    top: 20,
    right: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  collect: {
    position: 'absolute',
    top: 130,
    right: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  collecttwo: {
    position: 'absolute',
    top: 280,
    right: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
