import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from 'react-native-gesture-handler';

const AboutMe = () => {
    const navigation = useNavigation();

    return (
      <ScrollView >
        <View style={styles.container}>
            <View style={styles.circle}><Image style={styles.image} source={require('../../assets/images/baby/baby0/6.png')}/></View>
            <Text style={styles.usrtext}> 使用者1號  | 女性 </Text>
        </View>
        <View style={styles.info}>
        <View style={styles.data}>
            <Text style={styles.datatext}>生日： 2000-01-01</Text>
        </View>
        <View style={styles.data}>
            <Text style={styles.datatext}>手機：0912345678</Text>
        </View>
        <View style={styles.data}>
            <Text style={styles.datatext}>地址：南投縣埔里鎮大學路120巷120號</Text>
        </View>
        <View style={styles.data}>
            <Text style={styles.datatext}>電子郵件：student1@ncnu.edu.tw</Text>
        </View>
      
      </View>
    </ScrollView>
  );
};

// 定義組件中使用的樣式
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems:'center'
  },
  circle:{
    marginTop:30,
    borderRadius:100,
    borderWidth:1,
  },
  image:{
    height:200,
    width:200,
    resizeMode:'contain'
  },
  usrtext:{
    fontSize:20,
    fontWeight:'bold',
    padding:5,
    margin:10,
  },
  info:{
    margin:20,
    backgroundColor:'white',
    borderRadius:30,
  },
  data:{
    margin:10,
    padding:10,
  },
  datatext:{
    fontSize:20,
  },
});

// 導出該組件供其他組件使用
export default AboutMe;
