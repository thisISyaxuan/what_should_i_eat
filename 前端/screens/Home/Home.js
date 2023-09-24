import React, { useState, useEffect } from 'react';
import { View, StyleSheet} from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import EventList from '../../component/event-list';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from 'expo-location';
import { Back_Test_DATA } from "../../data/backtestdata";

export default function Home() {
    const navigation = useNavigation();
    const route = useRoute();
    const data = route.params && route.params.data ? route.params.data : { success: 2 };
    const [userPos,setuserPos] = useState([23.963801572121646, 120.96477655705154]);

    useEffect(() => {
        if (data.success != 2){//從篩選條件返回的參數
            console.log(data);// {success:{"DistanceSort": false, "LabelFilter": "麵食", "MealFilter": -1, "RatingSort": true, "TimeFilter": true, "userPos": [23.01, 120.01]}}
        }else{
            //從其他頁面進來的
            const checkLocationPermission = async () => {//先檢查定位有沒有被開啟
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                  console.log('定位權限未被授予');
                }else{
                    const location = await Location.getCurrentPositionAsync({});//抓經緯
                    setuserPos([location.coords.latitude,location.coords.longitude]);
                }
            };
            const fetchRestaurants = async () => {//傳給後端資料
                try {
                    const token = await AsyncStorage.getItem('userToken'); // 從AsyncStorage中取得token
                    if (token) {
                        const data = {//預設值傳給後端
                            TimeFilter: true,
                            MealFilter: 0,
                            LabelFilter: "全部",
                            userPos:userPos,
                            DistanceSort: false,
                            RatingSort: false
                          };
                          fetch('http://192.168.79.12:8000/api/Home/', {//改他
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                              Authorization: `Token ${userToken}`,
                            },
                            body: JSON.stringify(data)
                          })
                            .then(response => response.json())
                            .then(responseData => {//後端回傳的資料

                            console.log(responseData)
                            })
                    .catch((error) => {
                        console.error('獲取數據出錯:', error);
                    });
                    } else {
                        console.log('Home抓不到token');
                    }
                } catch (error) {
                    console.error('Home Error sending request:', error);
                }
            };
        checkLocationPermission();
        fetchRestaurants(); // 執行上面的函數
    }
    }, [data]);
    return (
        <View style={styles.container}>
            {/* 將餐廳資料傳給EventList組件 */}
            <EventList data={data}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    text:{
        fontSize:50,
    }
});
