import {StyleSheet, Text,Image, View,SafeAreaView,TouchableOpacity} from 'react-native';
import { globalStyles } from '../../styles/global';
import { useNavigation } from "@react-navigation/native";
import Login from '../LoginRegister/Login';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect,useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function Myacc() {
  const navigation = useNavigation();
  const [userData,setUserData] = useState({name:'用戶1號',email:'userone@gmail.com'});
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
        <View style={[styles.OutCol]}>
            <TouchableOpacity style={[styles.infoCol]} onPress={() => navigation.navigate("任務清單")}>
            <Ionicons name="person-circle-outline" size={50} color={'#C0C0C0'}></Ionicons>
            <Text style={globalStyles.TextSize}>個人資訊</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.infoCol]} onPress={() => navigation.navigate("任務清單")}>
            <Ionicons name="megaphone-outline" size={50} color={'#C0C0C0'}></Ionicons>
            <Text style={globalStyles.TextSize}>最新公告</Text></TouchableOpacity>
        </View>
        
        <View style={[styles.OutCol]}>
            <TouchableOpacity style={[styles.infoCol]} onPress={() => navigation.navigate("我的收藏")}>
            <Ionicons name="heart-circle-outline" size={50} color={'#C0C0C0'}></Ionicons>
            <Text style={globalStyles.TextSize}>我的收藏</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.infoCol]}>
            <Ionicons name="time-outline" size={50} color={'#C0C0C0'}></Ionicons>
            <Text style={globalStyles.TextSize}>瀏覽紀錄</Text></TouchableOpacity>
        </View>

        <View style={[styles.OutCol]}>
            <TouchableOpacity style={[styles.infoCol]}>
            <Ionicons name="document-text-outline" size={50} color={'#C0C0C0'}></Ionicons>
            <Text style={globalStyles.TextSize}>隱私政策與條款</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.infoCol]}>
            <Ionicons name="help-circle-outline" size={50} color={'#C0C0C0'}></Ionicons>
            <Text style={globalStyles.TextSize}>常見問題與說明</Text></TouchableOpacity>
        </View>   
          
        <View style={[globalStyles.Gocenter, {padding:50}]}>
            <TouchableOpacity style={[styles.logout,]} /*onPress={() => navigation.navigate('')}*/>
                <Ionicons name="log-out-outline" size={30} color={'#c13e27'}></Ionicons>
                <Text style={[styles.logOutBtn,]}>登出 </Text>
            </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  logOutBtn:{
    color: '#c13e27',
    fontSize: 18,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding:10,
    borderRadius:10,
    backgroundColor:'white',
    width:"95%",
    marginLeft:10,
    marginTop:30,
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
  OutCol:{
    flexDirection:'row',
    justifyContent:'space-around',
  },
  infoCol: {
    marginBottom: 5,
    marginVertical: 5,
    borderBottomColor: '#CCCCCC',
    paddingBottom: 5,
    backgroundColor:'white',
    padding:10,
    width:"45%",
    borderRadius:20,
    height:100,
    alignItems:'center',
    justifyContent:'center',
  },
  m:{marginTop:30,padding:10,justifyContent:'space-between'},
  logout:{
    borderBottomWidth:3,
    padding:5,
    borderBottomColor:'#c13e27',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  }
  
});
