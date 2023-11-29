import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Image, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles/global';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { link } from '../../data/apiLink';
import { useFocusEffect } from '@react-navigation/native';

export default function Myacc() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({ name: '用戶1號', email: 'userone@gmail.com' });
  const [avatarSource, setAvatarSource] = useState(require("../../assets/images/baby/baby0/90.png"));
  const LogOut = async () => {
    navigation.navigate('Login');
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('avatarId');
  }
  useEffect(() => {
    //console.log(userData, avatarSource); // Log the current state values when they change

    const unsubscribe = navigation.addListener('focus', fetchUserData);

    async function fetchUserData() {
      try {
          const userToken = await AsyncStorage.getItem('userToken');
          
          if (userToken) { 
              const response = await fetch(link.myaccGetUsr, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Token ${userToken}`,
                  },
              });
              const responseData = await response.json();

              if(responseData.id && responseData.username && responseData.email && responseData.avatarId) {
                  setUserData({
                      name: responseData.username,
                      email: responseData.email
                  });

                  const images ={
                    1:require("../../assets/images/baby/all/384.png"),
                    2:require("../../assets/images/baby/all/379.png"),
                    3:require("../../assets/images/baby/all/380.png"),
                    4:require("../../assets/images/baby/all/381.png"),
                    5:require("../../assets/images/baby/all/382.png"),
                    6:require("../../assets/images/baby/all/383.png"),

                    7:require("../../assets/images/baby/all/48.png"),
                    8:require("../../assets/images/baby/all/43.png"),
                    9:require("../../assets/images/baby/all/44.png"),
                    10:require("../../assets/images/baby/all/45.png"),
                    11:require("../../assets/images/baby/all/46.png"),
                    12:require("../../assets/images/baby/all/47.png"),

                    13:require("../../assets/images/baby/all/6.png"),
                    14:require("../../assets/images/baby/all/1.png"),
                    15:require("../../assets/images/baby/all/2.png"),
                    16:require("../../assets/images/baby/all/3.png"),
                    17:require("../../assets/images/baby/all/4.png"),
                    18:require("../../assets/images/baby/all/5.png"),

                    19:require("../../assets/images/baby/all/90.png"),
                    20:require("../../assets/images/baby/all/85.png"),
                    21:require("../../assets/images/baby/all/86.png"),
                    22:require("../../assets/images/baby/all/87.png"),
                    23:require("../../assets/images/baby/all/88.png"),
                    24:require("../../assets/images/baby/all/89.png"),

                    25:require("../../assets/images/baby/all/132.png"),
                    26:require("../../assets/images/baby/all/127.png"),
                    27:require("../../assets/images/baby/all/128.png"),
                    28:require("../../assets/images/baby/all/129.png"),
                    29:require("../../assets/images/baby/all/130.png"),
                    30:require("../../assets/images/baby/all/131.png"),

                    31:require("../../assets/images/baby/all/174.png"),
                    32:require("../../assets/images/baby/all/169.png"),
                    33:require("../../assets/images/baby/all/170.png"),
                    34:require("../../assets/images/baby/all/171.png"),
                    35:require("../../assets/images/baby/all/172.png"),
                    36:require("../../assets/images/baby/all/173.png"),

                    37:require("../../assets/images/baby/all/216.png"),
                    38:require("../../assets/images/baby/all/211.png"),
                    39:require("../../assets/images/baby/all/212.png"),
                    40:require("../../assets/images/baby/all/213.png"),
                    41:require("../../assets/images/baby/all/214.png"),
                    42:require("../../assets/images/baby/all/215.png"),

                    43:require("../../assets/images/baby/all/258.png"),
                    44:require("../../assets/images/baby/all/253.png"),
                    45:require("../../assets/images/baby/all/254.png"),
                    46:require("../../assets/images/baby/all/255.png"),
                    47:require("../../assets/images/baby/all/256.png"),
                    48:require("../../assets/images/baby/all/257.png"),

                    49:require("../../assets/images/baby/all/300.png"),
                    50:require("../../assets/images/baby/all/295.png"),
                    51:require("../../assets/images/baby/all/296.png"),
                    52:require("../../assets/images/baby/all/297.png"),
                    53:require("../../assets/images/baby/all/298.png"),
                    54:require("../../assets/images/baby/all/299.png"),

                    55:require("../../assets/images/baby/all/342.png"),
                    56:require("../../assets/images/baby/all/337.png"),
                    57:require("../../assets/images/baby/all/338.png"),
                    58:require("../../assets/images/baby/all/339.png"),
                    59:require("../../assets/images/baby/all/340.png"),
                    60:require("../../assets/images/baby/all/341.png"),

                    61:require("../../assets/images/baby/all/426.png"),
                    62:require("../../assets/images/baby/all/421.png"),
                    63:require("../../assets/images/baby/all/422.png"),
                    64:require("../../assets/images/baby/all/423.png"),
                    65:require("../../assets/images/baby/all/424.png"),
                    66:require("../../assets/images/baby/all/425.png"),

                    67:require("../../assets/images/baby/all/468.png"),
                    68:require("../../assets/images/baby/all/463.png"),
                    69:require("../../assets/images/baby/all/464.png"),
                    70:require("../../assets/images/baby/all/465.png"),
                    71:require("../../assets/images/baby/all/466.png"),
                    72:require("../../assets/images/baby/all/467.png"),

                    73:require("../../assets/images/baby/all/510.png"),
                    74:require("../../assets/images/baby/all/505.png"),
                    75:require("../../assets/images/baby/all/506.png"),
                    76:require("../../assets/images/baby/all/507.png"),
                    77:require("../../assets/images/baby/all/508.png"),
                    78:require("../../assets/images/baby/all/509.png"),
                  };
                  if (images[responseData.avatarId]) {
                      setAvatarSource(images[responseData.avatarId]);
                  }
              } else {
                  console.error('後端返回的數據格式不符合預期');
              }

          } else {
              console.log('抓不到token');
          }
      } catch (error) {
          console.error('錯誤：獲取用戶數據', error);
      }
    }

  

    return () => {
        unsubscribe();  // 清理訂閱
    };
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.rowContainer]}>
        <View style={styles.circle}>
          <Image style={styles.pic} source={avatarSource} />
        </View>
        <View>
          <Text>{userData.name}</Text>
          <Text>{userData.email}</Text>
        </View>
      </View>

      <View style={styles.m}>
        <View style={[styles.OutCol]}>
          <TouchableOpacity style={[styles.infoCol]} onPress={() => navigation.navigate("個人資訊")}>
            <Ionicons name="person-circle-outline" size={50} color={'#C0C0C0'}/>
            <Text style={{fontSize:18,}}>個人資訊</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.infoCol]} onPress={() => navigation.navigate("最新公告")}>
            <Ionicons name="megaphone-outline" size={50} color={'#C0C0C0'}/>
            <Text style={{fontSize:18,}}>最新公告</Text>
          </TouchableOpacity>
        </View>
        
        <View style={[styles.OutCol]}>
            <TouchableOpacity style={[styles.infoCol]} onPress={() => navigation.navigate("我的收藏")}>
            <Ionicons name="heart-circle-outline" size={50} color={'#C0C0C0'}></Ionicons>
            <Text style={{fontSize:18,}}>我的收藏</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.infoCol]} onPress={() => navigation.navigate("瀏覽紀錄")}>
            <Ionicons name="time-outline" size={50} color={'#C0C0C0'}></Ionicons>
            <Text style={{fontSize:18,}}>瀏覽紀錄</Text></TouchableOpacity>
        </View>

        <View style={[styles.OutCol]}>
            <TouchableOpacity style={[styles.infoCol]} onPress={() => navigation.navigate("隱私政策與使用條款")}>
            <Ionicons name="document-text-outline" size={50} color={'#C0C0C0'}></Ionicons>
            <Text style={{fontSize:18,}}>隱私政策與條款</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.infoCol]} onPress={() => navigation.navigate("常見問題與說明")}>
            <Ionicons name="help-circle-outline" size={50} color={'#C0C0C0'}></Ionicons>
            <Text style={{fontSize:18,}}>常見問題與說明</Text></TouchableOpacity>
        </View>   
          
        <View style={[globalStyles.Gocenter, {padding:50}]}>
            <TouchableOpacity style={[styles.logout,]} onPress={LogOut}>
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
    borderRadius:20,
    width:"45%",
    backgroundColor:'white',
    marginBottom: 10,//框外距離
    marginVertical: 5,//第一個框到最上面的距離
    padding:10,
    height:100,
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
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
