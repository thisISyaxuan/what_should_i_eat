import {StyleSheet, Text, View,Image,SafeAreaView,TouchableOpacity} from 'react-native';
import { globalStyles } from '../../styles/global';
import { useNavigation } from "@react-navigation/native";
export default function Home() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
    <TouchableOpacity style={styles.btn}>
        <Image style={{ width: 35, height:35 }} source={require('../../assets/images/coin.png')}/>
        <Text>899</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.btn2} onPress={() => navigation.navigate("限時翻倍")}>
        <Image style={{ width: 50, height: 50 }} source={require('../../assets/images/dice.png')}/>
        <Text>限時獎勵</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.collect} onPress={() => navigation.navigate("精靈圖鑑")}>
       <Image style={{ width: 50, height: 50 }} source={require('../../assets/images/babybook.png')}/>
        <Text>精靈圖鑑</Text>
    </TouchableOpacity>
    <View style={styles.circle}>
        <Image style={{width:250,resizeMode:'contain'}} source={require("../../assets/images/baby/baby0/6.png")}/>
    </View>
    </SafeAreaView>
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
  btn:{
    //flexDirection:'row',
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn2:{
    position: 'absolute',
    top: 100,
    left: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  collect:{
    position: 'absolute',
    top: 10,
    right: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
