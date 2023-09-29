import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import Swiper from 'react-native-swiper';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EventList from '../../component/event-list';
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
    const [restaurants, setRestaurants] = useState([]);
    const [dataLoaded,setDataLoaded] = useState(false);//追蹤資料有沒有都抓取成功了
    useEffect(() => {
        fetchRestaurants("rating");
    }, []);

    const resdata2 = {//現在後端的資料是這個
        "rName": ["中山壽司","不良鍋燒專門店",
    "298快餐","埔里美食 蔡家 排肉飯",],
    "rMap_Score": [5.0,5.0,5.0,5.0,],
    "rPhone": ["0910532789","0492990160","0928072795","0988042919",],
    "rAddress": ["54543南投縣埔里鎮北環路36號","545南投縣埔里鎮中山路二段312號","545南投縣埔里鎮隆生路96之15號","545南投縣埔里鎮中山路二段229號",],
    "open": [0,-1,0,-1,],
    "opentwo": [0,0,0,0,],
    "distance": [0.65,0.65,0.68,0.72,],
    "rID": [174,237,654,7,]
  }

    const fetchRestaurants = async (type) => {
        try {
            const token = await AsyncStorage.getItem('userToken');//抓token
            if (token) {
                fetch(`YOUR_BACKEND_API_ENDPOINT/${type}`, { //改他
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}` // 使用Token進行認證
                    },
                })
                .then(response => response.json())
                /*
                .then(data => {
                    const transformedData = Object.keys(data).map(rid => ({
                        id: rid,
                        name: data[rid].rName,
                        mapScore: data[rid].rMap_Score,
                        phone: data[rid].rPhone,
                        address: data[rid].rAddress
                    }));
                    setRestaurants(transformedData);
                    setDataLoaded(true);
                })
                */
                .catch(error => {
                    console.error('獲取餐廳詳細資訊錯誤:', error);
                });
            } else {
                //console.log('Mycollect未獲取到Token');
                setDataLoaded(true);
            }
        } catch (error) {
            console.error('你是不是連結沒改(我是Mycollect)', error);
        }
    };

    return (
        <View style={styles.container}>
            {/* 將餐廳資料傳給EventList組件 */}
            {dataLoaded ? <EventList data={resdata2} /> : null}
        </View>
        
    );
};

const DistanceScreen = () => {
    const [restaurants, setRestaurants] = useState([]);
    useEffect(() => {
        fetchRestaurants("distance");
    }, []);

    const fetchRestaurants = async (type) => {
        // 同上的 fetchRestaurants 的內容，只是資料排序/篩選方式可能有所不同
    };

    return (
        <View style={styles.container}>
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
        width: screenWidth * 0.8,
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









/*
<View style={styles.container}>
            {restaurants.map(restaurant => (
                <ShopInfoCard key={restaurant.id} data={restaurant} />
            ))}
        </View>


const screenWidth = Dimensions.get('window').width;

// 引入圖片
import storeExampleImage1 from '../../assets/images/storeexample.png';
import storeExampleImage2 from '../../assets/images/storeexample2.png';
import storeExampleImage3 from '../../assets/images/storeexample3.png';

export default function Mycollect() {
    return (
        <View style={styles.container}>
            <View style={styles.tabContainer}>
                <TouchableOpacity style={styles.tab}>
                    <Text>評分(高-低)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab}>
                    <Text>距離(近-遠)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab}>
                    <Text>待嘗鮮</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.lightContainer}>
                <View style={styles.lightWrapper}>
                    <View style={styles.greenLight}></View>
                    <Text>營業中</Text>
                </View>
                <View style={styles.lightWrapper}>
                    <View style={styles.yellowLight}></View>
                    <Text>一小時內打烊</Text>
                </View>
                <View style={styles.lightWrapper}>
                    <View style={styles.redLight}></View>
                    <Text>已打烊</Text>
                </View>
            </View>

            <ShopInfoCard />
        </View>
    );
}

const ShopInfoCard = () => {
    return (
        <View style={styles.card}>
            <View style={styles.cardLeft}>
                <View style={styles.cardRow}>
                    <Text style={styles.greenLight}></Text>
                    <Text style={{...styles.cardText, fontWeight: 'bold'}}>店名</Text>
                </View>
                <View style={styles.cardRow}>
                    <Text style={styles.cardText}>4.3</Text>
                    <Text style={styles.cardText}>(100)</Text>
                </View>
                <Text style={styles.cardText}>距離 4.1 km</Text>
            </View>
            <View style={styles.cardRight}>
                <Swiper 
                    style={{height: '100%'}}
                    showsPagination={true}
                    paginationStyle={{bottom: 0}}
                >
                    <Image style={styles.shopImage} source={storeExampleImage1} />
                    <Image style={styles.shopImage} source={storeExampleImage2} />
                    <Image style={styles.shopImage} source={storeExampleImage3} />
                </Swiper>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { // 整個頁面的背景
        flex: 1, // flex: 1是讓整個頁面都可以被看到
        alignItems: 'center', // 讓整個頁面的元件都置中
        backgroundColor: '#f4f4f4', // 整個頁面的背景顏色
        paddingTop: '4%', // 讓上方有一點距離
    },
    tabContainer: { // 上方的三個按鈕區塊
        flexDirection: 'row', // 讓三個按鈕變成一排
        marginBottom: 10, // 讓三個按鈕與下方的燈號區塊有一點距離
    },
    tab: { // 上方的三個按鈕設計
        padding: 12, // 這個padding: 10是讓按鈕有一點距離
        borderColor: 'grey', // 按鈕灰色的邊框
        borderWidth: 1, // 按鈕邊框的粗細
        marginHorizontal: 16, // 按鈕與按鈕之間距離
        borderRadius: 10, // 圓角設計
    },
    lightContainer: { // 下方的燈號區塊
      flexDirection: 'row', // 讓三個燈號變成一排
      marginBottom: 10, // 讓三個燈號與下方的卡片有一點距離
      width: screenWidth * 0.8, // 設定與資訊卡相同的寬度
      paddingLeft: '4%', // 與左側邊界的間距
    },
    lightWrapper: { // 下方的燈號設計
        flexDirection: 'row', // 讓三個燈號變成一排
        alignItems: 'center', // 讓三個燈號的元件都置中
        marginRight: 10, // 讓三個燈號與燈號之間距離
    },
    greenLight: { // 綠色的燈號設計
        width: 10, // 燈號的寬度
        height: 10, // 燈號的高度
        backgroundColor: 'green', // 燈號的顏色
        borderRadius: 5, // 圓角設計
        marginRight: 5, // 燈號與燈號之間距離
    },
    yellowLight: { // 黃色的燈號設計
        width: 10, // 燈號的寬度
        height: 10, // 燈號的高度
        backgroundColor: 'yellow', // 燈號的顏色
        borderRadius: 5, // 圓角設計
        marginRight: 5, // 燈號與燈號之間距離
    },
    redLight: { // 紅色的燈號設計
        width: 10, // 燈號的寬度
        height: 10, // 燈號的高度
        backgroundColor: 'red', // 燈號的顏色
        borderRadius: 5, // 圓角設計
        marginRight: 5, // 燈號與燈號之間距離
    },
    card: {
        width: screenWidth * 0.8, // 卡片的寬度 (螢幕的寬度 * 0.8)
        height: '15%', // 卡片的高度
        flexDirection: 'row', // 讓卡片的左右兩邊元件變成一排
        backgroundColor: 'white', // 卡片的背景顏色
        borderRadius: 10, // 圓角設計
        padding: 10, // 讓卡片裡面的元件有一點距離
        marginBottom: 10, // 讓卡片與卡片之間有一點距離
    },
    cardLeft: { // 卡片的左邊元件
        flex: 1, // 讓卡片的左邊元件可以被看到
        justifyContent: 'space-between', // 讓卡片的左邊元件的元件置中
        paddingLeft: '4%', // 與左側邊界的間距
    },
    cardRow: { // 卡片的左邊元件的一排
        flexDirection: 'row', // 讓卡片的左邊元件的元件變成一排
        alignItems: 'center', // 讓卡片的左邊元件的元件置中
    },
    cardText: { // 卡片的文字設計
        fontSize: 14, // 文字的大小
        marginRight: 5, // 文字與文字之間距離
    },
    cardRight: { // 卡片的右邊元件
        width: '50%', // 卡片的右邊元件的寬度
    },
    shopImage: { // 店家圖片的設計
        width: '100%', // 店家圖片的寬度
        height: '100%', // 店家圖片的高度
        borderRadius: 10,  // 圓角設計
    },
});


*/

