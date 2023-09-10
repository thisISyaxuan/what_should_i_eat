import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import EventList from '../../component/event-list';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
    const navigation = useNavigation();
  
    // 定義一個State來保存餐廳資料
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
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

        fetchRestaurants(); // 執行上面的函數
    }, []);

    return (
        <View style={styles.container}>
            {/* 將餐廳資料傳給EventList組件 */}
            <EventList data={restaurants}/>
            <TouchableOpacity onPress={() => navigation.navigate('SearchRes')}>
                <Ionicons name="menu-outline" size={24} color="black" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
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
