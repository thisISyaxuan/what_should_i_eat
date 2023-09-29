import { StyleSheet, Text, View, Image,ImageBackground, SafeAreaView, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles/global'; // 引入全域樣式
import { useNavigation } from "@react-navigation/native";

// 定義Home函式組件
export default function Baby() {
  const navigation = useNavigation(); // 使用React Navigation的導航功能

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

      <TouchableOpacity style={styles.collecttwo} onPress={() => navigation.navigate("任務清單")}>
        <Image style={{ width: 50, height: 50 }} source={require('../../assets/todolist.png')} />
        <Text>任務清單</Text>
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
    top: 10,
    left: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeli: {
    position: 'absolute',
    top: 100,
    left: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  collect: {
    position: 'absolute',
    top:180,
    right: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  collecttwo: {
    position: 'absolute',
    top:280,
    right: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
