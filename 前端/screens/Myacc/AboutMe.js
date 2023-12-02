import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react';
import { useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from 'react-native';//loading的圖示
import { link } from '../../data/apiLink';


const AboutMe = () => {
    const navigation = useNavigation();
    const [isloading,setiwsloading]=useState(false);
    const [userData, setUserData] = useState({ username: '用戶1號',
                                               gender:'女性',
                                               birthday:'2000-01-01',
                                               phone:'0912345678',
                                               address:'談投現埔里鎮大學路',
                                               email: 'userone@gmail.com',
                                               avatarId: 1,
                                              });
    useEffect(() => {
      const fetchUserData = async () => {
          try {
              const token = await AsyncStorage.getItem('userToken');//抓token
              if (!token) {
                  console.log('未能取得token');
                  return;
              }else{
                const response = await fetch(link.AboutMe, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Token ${token}`,
                  },
                });
                if (!response.ok) {
                  Alert.alert('獲取用戶數據失敗，請檢查您的網絡連接或伺服器狀態');
                  return;
                }
                const data = await response.json();
                setUserData(data);
                setiwsloading(true);
              }
          } catch (error) {
              Alert.alert('獲取用戶數據過程中出現錯誤:', error);
          }
      };

      fetchUserData();

  }, []);

    return (
      <ScrollView style={{backgroundColor:'white'}}>
        {isloading ?
        (<View>
        <View style={[styles.content,]}>
              <View style={styles.circleout}>
                  <View style={styles.circle}>
                      <Image style={styles.image} source={require('../../assets/images/baby/baby0/6.png')}/>
                  </View>
              </View>
          
          
          </View>
          
        <View style={styles.info}>
        <View style={styles.data}>
            <Text style={styles.datatext}>帳號：{userData.username}</Text>
        </View>
        <View style={styles.data}>
            <Text style={styles.datatext}>性別：{userData.gender}</Text>
        </View>
        <View style={styles.data}>
            <Text style={styles.datatext}>生日：{userData.birthday}</Text>
        </View>
        <View style={styles.data}>
            <Text style={styles.datatext}>手機：{userData.phone}</Text>
        </View>
        <View style={styles.data}>
            <Text style={styles.datatext}>地址：{userData.address}</Text>
        </View>
        <View style={styles.data}>
            <Text style={styles.datatext}>電子郵件：{userData.email}</Text>
        </View>
      </View></View>) : (<ActivityIndicator style={{marginTop:'80%'}} size="large" color="#338168" />)
}
    </ScrollView>
  );
};

// 定義組件中使用的樣式
const styles = StyleSheet.create({
  content: {
    flexDirection: 'column',
    //flex:1,
    width:420,
    //marginTop: 20,
    alignItems: 'center',
    //borderRadius: 50,
    backgroundColor:'#fff5c5',
    //width:800,
    justifyContent:'center',
    alignContent:'center',
    //margin:20,
  },
  circleout:{
    margin:5,
    height:220,
    width:220,
    borderRadius:120,
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',
  },
  contenttext:{
    flex: 1,
    backgroundColor:'white',
    width:'100%',
    alignItems:'center',
  },
  image:{
    height:200,
    width:200,
    resizeMode:'contain'
  },
  usrtext:{
    fontSize:18,
    fontWeight:'500',
    padding:5,
    margin:10,
    //color:'#338168'
  },
  circle:{
    borderRadius:100,
    backgroundColor:'#f5eab8',
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
