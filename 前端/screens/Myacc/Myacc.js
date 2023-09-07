import {StyleSheet, Text,Image, View,SafeAreaView,TouchableOpacity} from 'react-native';
import { globalStyles } from '../../styles/global';
import { useNavigation } from "@react-navigation/native";
import Login from '../LoginRegister/Login';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect,useState } from 'react';
export default function Myacc() {
  const navigation = useNavigation();
  const [userData,setUserData] = useState({name:'用戶名稱',email:'email@gmail.com'});
  useEffect(() => {//初始化，先傳Token過去，等後端回傳json檔後，存入userData裡
    const fetchUserData = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        if (userToken) {
          const response = await fetch('http://192.168.0.2:8000/api/MyAcc/', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${userToken}`, // 添加 Token 到 Header
            },
          });
          const responseData = await response.json();
          setUserData({
            name: responseData.username,
            email: responseData.email
          });
        }else{
          console.log('抓不到token')
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  },[]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.rowContainer]}>
        <View style={styles.circle}>
          <Image style={styles.pic} source={require("../../assets/images/baby/baby0/90.png")}/>
        </View>
        <View><Text >{userData.name}</Text><Text >{userData.email}</Text></View>
      </View>

      <View style={styles.m}>
        <TouchableOpacity style={[styles.infoCol]} onPress={() => navigation.navigate("我的脂肪幣")}>
          <Text style={globalStyles.TextSize}>我的脂肪幣</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.infoCol]} onPress={() => navigation.navigate("我的收藏")}>
          <Text style={globalStyles.TextSize}>已收藏的餐廳</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.infoCol]}>
          <Text style={globalStyles.TextSize}>瀏覽紀錄</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.infoCol]}>
          <Text style={globalStyles.TextSize}>變更密碼</Text></TouchableOpacity>
        <TouchableOpacity style={[globalStyles.Gocenter, styles.infoCol]}>
          <Text style={[styles.logOutBtn]}>登出 </Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    backgroundColor: '#F5F5F5',
    
  },
  logOutBtn:{
    color: 'red',
    fontSize: 18,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:10,
    marginTop:20,
  },
  circle: {
    width: 96,
    height: 96,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#777',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  pic:{
    width:92,
    height:92,
    resizeMode:'contain',
  },
  infoCol: {
    marginBottom: 5,
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    paddingBottom: 5,
  },
  m:{marginTop:50,}
  
});
