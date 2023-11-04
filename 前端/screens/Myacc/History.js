import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet} from "react-native";
import EventList from '../../component/event-list';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from 'expo-location';
import { ActivityIndicator } from 'react-native';

export default function MyHistory() {
      const [lastSentPos, setLastSentPos] = useState([0,0]);//經緯度
      const [dataLoaded,setDataLoaded] = useState(false);//追蹤資料有沒有都抓取成功了
      const [datacontent, setDatacontent] = useState();//傳給EventList的資料
  
    useEffect(() => {
        console.log("點")
        checkLocationPermission();//檢查定位
        fetchRestaurants();
    }, []);

    
    const checkLocationPermission = async () => {//先檢查定位有沒有被開啟
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('定位權限未被授予');
        }
    };
    const fetchRestaurants = async () => {//傳給後端資料
        try {
            const userToken = await AsyncStorage.getItem('userToken'); // 從AsyncStorage中取得token
            if (userToken) {//抓完token抓定位
                const location = await Location.getCurrentPositionAsync({});//抓經緯
                const newCoords = [location.coords.latitude, location.coords.longitude];//新的經緯
                if (Math.abs(newCoords[0] - lastSentPos[0]) > 0.001 ||Math.abs(newCoords[1] - lastSentPos[1]) > 0.001){ // 如果超過0.001，更新 lastSentPos
                    setLastSentPos(newCoords);
                    const requestdata = {//預設值傳給後端
                        userPos:newCoords,
                    };
                    console.log("這是我要傳給後端的資料:",requestdata)
                    const response = await fetch('http://172.20.10.2:8000/click/show/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${userToken}`,
                    },
                    body: JSON.stringify(requestdata)
                    });
                    if (response.ok) {
                        console.log("response.ok")
                        const responseData = await response.json();//把後端回傳的資料放在responsData
                        console.log(responseData.success);
                        setDatacontent(responseData.success);
                        setDataLoaded(true);// 在這裡設定資料載入完成的狀態
                        //const data = responseData.success;
                    } else {
                        console.error('後端回傳發生錯誤嗚嗚嗚', response.status);
                    }
                }else{
                    // 如果經度和緯度變化不超過0.001，則不發送請求
                    setDataLoaded(true);
                }
            } else {
                //console.log('Home抓不到token');
                const location = await Location.getCurrentPositionAsync({});//抓經緯
                const newCoords = [location.coords.latitude, location.coords.longitude];
                if (Math.abs(newCoords[0] - lastSentPos[0]) > 0.001 ||Math.abs(newCoords[1] - lastSentPos[1]) > 0.001){//判斷經緯有沒有超過0.001
                    setLastSentPos(newCoords);
                    const requestdata = {
                        TimeFilter: false,
                        MealFilter: -1,
                        LabelFilter: "全部",
                        userPos:newCoords,
                        DistanceSort: false,
                        RatingSort: false
                      };
                      console.log("這是我要傳給後端的資料:", requestdata);
                }else{
                    //console.log('經度和緯度變化不超過0.001，不發送請求');
                    setDataLoaded(true);
                }
            }
        } catch (error) {
            console.error('Home Error sending request:', error);
        }
    };

    return (
        <View style={styles.container}>
            {dataLoaded ? 
                (<EventList data={datacontent} />) : 
                (<ActivityIndicator size="large" color="#0000ff" />)
            }
        </View>
        
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
        paddingTop: '4%',
    },
    card: {
//        width: screenWidth * 0.8,
        height: 150,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    cardLeft: {
        flex: 1,
        justifyContent: 'space-between',
        paddingLeft: '4%',
    },
    cardRight: {
        width: '50%',
    },
    shopImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
});