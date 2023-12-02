import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from 'expo-location';
import EventList from '../../component/event-list';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';//loading的圖示
import { link } from '../../data/apiLink';
const screenWidth = Dimensions.get('window').width;
const Tab = createMaterialTopTabNavigator();

export default function Mycollect() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="評分(高-低)" component={RatingScreen} />
            <Tab.Screen name="距離(近-遠)" component={DistanceScreen} />
        </Tab.Navigator>
    );
}

const RatingScreen = () => {
    const [lastSentPos, setLastSentPos] = useState([0,0]);
    const [dataLoaded,setDataLoaded] = useState(false);//追蹤資料有沒有都抓取成功了
    const [datacontent,setDatacontent] = useState();//傳給EventList的資料

    useFocusEffect(
        React.useCallback(() => {
            fetchRestaurants();
          return () => {
            console.log('Leaving Rating Screen');//離開畫面要做的動作
          };
        }, [])
      );
    
    const fetchRestaurants = async (type) => {//token,boolean,distance
        try {
            const token = await AsyncStorage.getItem('userToken');//抓token
            if (token) {
                const location = await Location.getCurrentPositionAsync({});//抓經緯
                const newCoords = [location.coords.latitude, location.coords.longitude];//新的經緯
                
                if (Math.abs(newCoords[0] - lastSentPos[0]) > 0.001 ||Math.abs(newCoords[1] - lastSentPos[1]) > 0.001){ // 如果超過0.001，更新 lastSentPos
                    setLastSentPos(newCoords);
                    const requestdata = {
                        sorting:true,
                        userPos:newCoords,
                    };
                    const response = await fetch(link.collect, {//改他
                        method: 'POST',
                        headers: {'Content-Type': 'application/json',Authorization: `Token ${token}`,},
                        body: JSON.stringify(requestdata)
                    });
                    if (response.ok) {
                        const responseData = await response.json();//把後端回傳的資料放在responsData
                        console.log(responseData)
                        setDatacontent(responseData.success);
                        setDataLoaded(true);// 在這裡設定資料載入完成的狀態
                    } else {
                        console.error('我在Mycollect，後端回傳發生錯誤', response.status);
                    }
                  }
//                }else{
//                    setDataLoaded(true); // 如果經度和緯度變化不超過0.001，則不發送請求
//                }
            } else {
                console.log('Mycollect未獲取到Token');
                //setDataLoaded(true);
            }
        } catch (error) {
            console.error('你是不是連結沒改?我在Mycollect的第63行', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.loadingContainer}>
              {dataLoaded ? 
                  (datacontent === null ? 
                    (<Text>尚無歷史資訊</Text>) :
                    (<EventList data={datacontent} />)) : 
                  (<ActivityIndicator size="large" color="#338168" />)
              }
            </View>
        </View>
        
    );
};

const DistanceScreen = ({route}) => {
    const [lastSentPos, setLastSentPos] = useState([0,0]);
    const [dataLoaded,setDataLoaded] = useState(false);//追蹤資料有沒有都抓取成功了
    const [datacontent,setDatacontent] = useState();//傳給EventList的資料

    useFocusEffect(
        React.useCallback(() => {
            fetchRestaurants();
          return () => {
            console.log('Leaving Distance Screen');//離開畫面要做的動作
          };
        }, [])
      );

    
    const fetchRestaurants = async (type) => {//token,boolean,distance
        try {
            const token = await AsyncStorage.getItem('userToken');//抓token
            if (token) {
                const location = await Location.getCurrentPositionAsync({});//抓經緯
                const newCoords = [location.coords.latitude, location.coords.longitude];//新的經緯
                
                if (Math.abs(newCoords[0] - lastSentPos[0]) > 0.001 ||Math.abs(newCoords[1] - lastSentPos[1]) > 0.001){ // 如果超過0.001，更新 lastSentPos
                    setLastSentPos(newCoords);
                    const requestdata = {
                        sorting:false,
                        userPos:newCoords,
                    };
                    const response = await fetch(link.collect, {//改他
                        method: 'POST',
                        headers: {'Content-Type': 'application/json',Authorization: `Token ${token}`,},
                        body: JSON.stringify(requestdata)
                    });
                    if (response.ok) {
                        const responseData = await response.json();//把後端回傳的資料放在responsData
                        setDatacontent(responseData.success);
                        setDataLoaded(true);// 在這裡設定資料載入完成的狀態
                    } else {
                        console.error('我在Mycollect，後端回傳發生錯誤', response.status);
                    }
                }
//                else{
//                    setDataLoaded(true); // 如果經度和緯度變化不超過0.001，則不發送請求
//
//                }
            } else {
                console.log('Mycollect未獲取到Token');
                //setDataLoaded(true);
            }
        } catch (error) {
            console.error('你是不是連結沒改?我在Mycollect的第120行', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.loadingContainer}>
              {dataLoaded ? 
                  (datacontent === null ? 
                    (<Text>尚無歷史資訊</Text>) :
                    (<EventList data={datacontent} />)) : 
                  (<ActivityIndicator size="large" color="#338168" />)
              }
            </View>
        </View>
        
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
        paddingTop: '4%',
        position: 'relative', // 新增的屬性
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // loading在一個半透明的背景上
    },
});