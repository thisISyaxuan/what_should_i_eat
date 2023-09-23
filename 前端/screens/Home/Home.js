import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import EventList from '../../component/event-list';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from 'expo-location';
import { Back_Test_DATA } from "../../data/backtestdata";

export default function Home() {
    const navigation = useNavigation();
    const route = useRoute();
    const [restaurants, setRestaurants] = useState(["第一家","第二家"]);
    const [location, setLocation] = useState(null);
    const [userPos,setuserPos] = useState([23.963801572121646, 120.96477655705154]);

    useEffect(() => {
        const checkLocationPermission = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              console.log('定位權限未被授予');
            }else{
                console.log('抓到了');
                const location = await Location.getCurrentPositionAsync({});
                //console.log('緯度:', location.coords.latitude);
                //console.log('經度:', location.coords.longitude);
                //setLocation(location);
                setuserPos([location.coords.latitude,location.coords.longitude]);
                //console.log(userPos);
            }
          };

        const fetchRestaurants = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken'); // 從AsyncStorage中取得token
                if (token) {
                    console.log(token);
                    // 使用token發送請求到後端取得使用者數據
                    fetch('YOUR_API_ENDPOINT_HERE', {  // 使用實際API連結
                        method: 'POST',  
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Token ${token}`  // 使用Token進行認證
                        },
                    })
                    .then(response => response.json())
                    .then(data => {
                        // 將資料從物件格式轉換為陣列格式
                        const restaurantArray = Object.keys(data).map(rid => ({
                            rid: rid, // 餐廳ID
                            rName: data[rid].rName,
                            rMap_Score: data[rid].rMap_Score,
                            rPhone: data[rid].rPhone,
                            rAddress: data[rid].rAddress
                        }));
                        setRestaurants(restaurantArray);
                    })
                    .catch((error) => {
                        console.error('獲取數據出錯:', error);
                    });
                } else {
                    console.log('未能取得token');
                }
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };
        checkLocationPermission();
        fetchRestaurants(); // 執行上面的函數
    }, []);

    useEffect(() => {
        // 在 userPos 更新後執行相關操作
        console.log('userPos 已更新:', userPos);
        // 可以在這裡執行其他需要在 userPos 更新後執行的操作
        //AsyncStorage.setItem('userPos', userPos);
        //console.log(AsyncStorage.getItem('userPos'));
    }, [userPos]);

    return (
        <View style={styles.container}>
            {/* 將餐廳資料傳給EventList組件 */}
            <EventList data={Back_Test_DATA}/>
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
