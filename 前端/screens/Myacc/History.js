import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import EventList from '../../component/event-list';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from 'expo-location';
import { link } from '../../data/apiLink';
import { useFocusEffect } from '@react-navigation/native';

export default function MyHistory() {
    const [lastSentPos, setLastSentPos] = useState([0,0]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [datacontent, setDatacontent] = useState(null);

    // 函數用於檢查定位權限
    const checkLocationPermission = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('定位權限未被授予');
        }
    };

    const fetchRestaurants = async () => {//傳給後端資料
        try {
            const userToken = await AsyncStorage.getItem('userToken'); // 從AsyncStorage中取得token
            if (userToken) {//抓完token抓定位
                const myposL = await AsyncStorage.getItem('positionL');
                const myposR = await AsyncStorage.getItem('positionR');
                //const location = await Location.getCurrentPositionAsync({});//抓經緯
                //const newCoords = [location.coords.latitude, location.coords.longitude];//新的經緯
                //if (Math.abs(newCoords[0] - lastSentPos[0]) > 0.001 ||Math.abs(newCoords[1] - lastSentPos[1]) > 0.001){ // 如果超過0.001，更新 lastSentPos
                    //setLastSentPos(newCoords);
                    const requestdata = {//預設值傳給後端
                        userPos:[parseFloat(myposL),parseFloat(myposR)],
                    };
                    //console.log("這是我要傳給後端的資料:",requestdata)
                    const response = await fetch(link.history, {
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
                        console.log(responseData.success.rID);
                        console.log(responseData.success.collect);
                        setDatacontent(responseData.success);
                        setDataLoaded(true);// 在這裡設定資料載入完成的狀態
                        //const data = responseData.success;
                    } else {
                        console.error('後端回傳發生錯誤嗚嗚嗚', response.status);
                    }
                //}
//                else{
//                    // 如果經度和緯度變化不超過0.001，則不發送請求
//                    setDataLoaded(true);
//                }
            } else {
                //console.log('Home抓不到token');
                const myposL = await AsyncStorage.getItem('positionL');
                const myposR = await AsyncStorage.getItem('positionR');
                //const location = await Location.getCurrentPositionAsync({});//抓經緯
                //const newCoords = [location.coords.latitude, location.coords.longitude];
                //if (Math.abs(newCoords[0] - lastSentPos[0]) > 0.001 ||Math.abs(newCoords[1] - lastSentPos[1]) > 0.001){//判斷經緯有沒有超過0.001
                    //setLastSentPos(newCoords);
                    //AsyncStorage.setItem('position', newCoords);
                    const requestdata = {
                        TimeFilter: false,
                        MealFilter: -1,
                        LabelFilter: "全部",
                        userPos:[parseFloat(myposL),parseFloat(myposR)],
                        DistanceSort: false,
                        RatingSort: false
                      };
                      console.log("這是我要傳給後端的資料:", requestdata);
                }
//                else{
//                    //console.log('經度和緯度變化不超過0.001，不發送請求');
//                    setDataLoaded(true);
//                }
            //}
        } catch (error) {
            console.error('Home Error sending request:', error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            setDataLoaded(false); // 重置加載狀態
            checkLocationPermission();
            fetchRestaurants();
        }, [])
    );

    return (
        <View style={styles.container}>
            <View style={styles.loadingContainer}>
                {dataLoaded ?
                    (datacontent === null ?
                      (<Text>尚無歷史資訊</Text>) :
                      (<EventList data={datacontent} />)
                    ) :
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
    shopImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
});	
