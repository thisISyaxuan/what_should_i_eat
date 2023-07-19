import {StyleSheet, Text, View,Image,SafeAreaView,TouchableOpacity} from 'react-native';
import { globalStyles } from '../../styles/global';
export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
    <TouchableOpacity style={styles.btn}>
        <Image style={{ width: 30, height: 30 }} source={require('../../assets/images/coin.png')}/>
        <Text>899</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.btn2}>
        <Text>限時獎勵</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.collect}>
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
    /*borderWidth: 1,
    borderColor: '#777',
    backgroundColor:'#fcc',*/
    marginRight: 10,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  btn:{
    borderWidth: 1,
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn2:{
    borderWidth: 1,
    position: 'absolute',
    top: 100,
    left: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  collect:{
    borderWidth: 1,
    position: 'absolute',
    top: 10,
    right: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
