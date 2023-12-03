import React, { useState, useEffect } from 'react';
import { View, StyleSheet} from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import EventList from '../../component/event-list';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from 'expo-location';
import { ActivityIndicator } from 'react-native';//loading的圖示
import { useRef } from 'react';
import { link } from '../../data/apiLink';

export default function Home() {
    const navigation = useNavigation();
    const route = useRoute();
    const data = route.params && route.params.data.data ? route.params.data.data : {success: 2 };
    const dataFilter = route.params && route.params.data.filter ? route.params.data.filter : {filternum: 3 };
    //{"DistanceSort": false, "LabelFilter": "中式",userPos:[120,122], "MealFilter": -1, "RatingSort": false, "TimeFilter": false}
    const [lastSentPos, setLastSentPos] = useState([0,0]);
    const [dataLoaded,setDataLoaded] = useState(false);//追蹤資料有沒有都抓取成功了
    const [datacontent, setDatacontent] = useState();//傳給EventList的資料
    const flatListRef = useRef(null); // 在這裡定義 flatListRef
    const ForwardedEventList = React.forwardRef((props, ref) => (
        <EventList ref={ref} {...props} />
      ));

    useEffect(() => {
        
        if (data.success != 2){//從篩選條件返回的參數
            setDatacontent(data.success);
            setDataLoaded(true);
            const filter = dataFilter;
            console.log('123:',filter);
            flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
        }else{

            //從其他頁面進來的
            checkLocationPermission();
            fetchRestaurants(); // 執行上面的函數

        }
    }, [data]);
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
                //AsyncStorage.setItem('position', newCoords)//抓第一次的經緯度
                //const mypos = await AsyncStorage.getItem('position');
                //if(mypos){
                    if (Math.abs(newCoords[0] - lastSentPos[0]) > 0.001 ||Math.abs(newCoords[1] - lastSentPos[1]) > 0.001){ // 如果超過0.001，更新 lastSentPos
                        setLastSentPos(newCoords);
                        AsyncStorage.setItem('position', newCoords);
                        const requestdata = {//預設值傳給後端
                            TimeFilter: false,
                            MealFilter: -1,
                            LabelFilter: "全部",
                            userPos:newCoords,
                            DistanceSort: false,
                            RatingSort: false
                        };
                        console.log("這是我要傳給後端的資料:",requestdata)
                        const response = await fetch(link.home, {
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
                    }
                //}
                
            } else {
                setDataLoaded(true);
            }
        } catch (error) {
            console.error('Home Error sending request:', error);
        }
    };

    const handleRefresh = async () => {//傳給後端資料
        checkLocationPermission();
        try {
            const userToken = await AsyncStorage.getItem('userToken'); // 從AsyncStorage中取得token
            if (userToken) {//抓完token抓定位
                const location = await Location.getCurrentPositionAsync({});//抓經緯
                const newCoords = [location.coords.latitude, location.coords.longitude];//新的經緯
                if (Math.abs(newCoords[0] - lastSentPos[0]) > 0.001 ||Math.abs(newCoords[1] - lastSentPos[1]) > 0.001){ // 如果超過0.001，更新 lastSentPos
                    setLastSentPos(newCoords);
                    AsyncStorage.setItem('position', newCoords);
                    const response = await fetch(link.home, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${userToken}`,
                    },
                    body: JSON.stringify(dataFilter)
                    });
                    if (response.ok) {
                        console.log("更新OK")
                        const responseData = await response.json();//把後端回傳的資料放在responsData
                        setDatacontent(responseData.success);
                        setDataLoaded(true);
                        } else {
                            console.error('後端回傳發生錯誤126行', response.status);
                        }
                    }else{
                        // 如果經度和緯度變化不超過0.001，則不發送請求
                        setDataLoaded(true);
                    }
            } else {
                // do nothing
            }
        } catch (error) {
                console.error('Home Error sending request:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.loadingContainer}>
                {dataLoaded ? 
                (<ForwardedEventList ref={flatListRef} data={datacontent} onRefresh={handleRefresh}/>) : 
                (<ActivityIndicator size="large" color="#338168" />)
                }
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
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
    text:{
        fontSize:50,
    }
});
