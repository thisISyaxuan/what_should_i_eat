import React, { useState, useEffect } from 'react';
import { View, StyleSheet} from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import EventList from '../../component/event-list';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from 'expo-location';

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default function Home() {
    const navigation = useNavigation();
    const route = useRoute();
    const data = route.params && route.params.data ? route.params.data : { success: 2 };
    const [lastSentPos, setLastSentPos] = useState([0,0]);
    const [dataLoaded,setDataLoaded] = useState(false);//追蹤資料有沒有都抓取成功了
    const [datacontent,setDatacontent] = useState();//傳給EventList的資料


    useEffect(() => {
        if (data.success != 2){//從篩選條件返回的參數
            setDatacontent(data)
            console.log("20行")
            console.log(data)
            console.log("20行")
            setDataLoaded(true);
        }else{
//            checkLocationPermission();
//            fetchRestaurants(); // 執行上面的函數
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
                    const [currentDateTime, setCurrentDateTime] = useState('');
                    if (true){
//                    if (Math.abs(newCoords[0] - lastSentPos[0]) > 0.001 ||Math.abs(newCoords[1] - lastSentPos[1]) > 0.001){ // 如果超過0.001，更新 lastSentPos
                        setLastSentPos(newCoords);
                        const currentDate = new Date();
                        const year = currentDate.getFullYear();
                        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 月份從0開始，需要加1
                        const day = String(currentDate.getDate()).padStart(2, '0');
                        const hours = String(currentDate.getHours()).padStart(2, '0');
                        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
                        const seconds = String(currentDate.getSeconds()).padStart(2, '0');
                        const formattedDateTime = `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
    //                    setCurrentDateTime(formattedDateTime);
                        const requestdata = {//預設值傳給後端
                            TimeFilter: true,
                            MealFilter: 0,
                            LabelFilter: "全部",
                            userPos:newCoords,
                            DistanceSort: false,
                            RatingSort: false,
    //                        currentTime: currentDateTime,
                        };
                        //console.log("這是我要傳給後端的資料:",requestdata)
                        const response = await fetch('http://172.20.10.2:8000/restaurant/recommend/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Token ${userToken}`,
                        },
                        body: JSON.stringify(requestdata)
                        });
                        if (response.ok) {
                            const responseData = await response.json();//把後端回傳的資料放在responsData
                            console.log(responseData.success);
                            setDatacontent(responseData);
                            setDataLoaded(true);// 在這裡設定資料載入完成的狀態
                            //const data = responseData.success;
                        } else {
                            console.error('後端回傳發生錯誤嗚嗚嗚', response.status);
                        }
                        console.log("start sleep");
                        await sleep(100000000000);
                        console.log("end sleep");
                    }else{
                        setDataLoaded(true); // 如果經度和緯度變化不超過0.001，則不發送請求
                    }
                } else {
                    const location = await Location.getCurrentPositionAsync({});//抓經緯
                    const newCoords = [location.coords.latitude, location.coords.longitude];
                    if (Math.abs(newCoords[0] - lastSentPos[0]) > 0.001 ||Math.abs(newCoords[1] - lastSentPos[1]) > 0.001){//判斷經緯有沒有超過0.001
                        setLastSentPos(newCoords);
                        const requestdata = {
                            TimeFilter: true,
                            MealFilter: 0,
                            LabelFilter: "全部",
                            userPos: newCoords, // 使用新的經度和緯度
                            DistanceSort: false,
                            RatingSort: false
                          };
                          console.log("這是我要傳給後端的資料:", requestdata);
                          console.log("成功");
                    }else{
                        setDataLoaded(true);//console.log('經度和緯度變化不超過0.001，不發送請求');
                    }
                }
            } catch (error) {
                console.error('Home Error sending request:', error);

            }
        };
        }
    }, [data]);

    return (
        <View style={styles.container}>
            {/* 將餐廳資料傳給EventList組件 */}
            {dataLoaded ? <EventList data={datacontent} /> : null}
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
