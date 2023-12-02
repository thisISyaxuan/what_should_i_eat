import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Alert, ActivityIndicator, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { link } from '../../data/apiLink';

const AboutMe = () => {
    const [isloading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState({
        username: '用戶1號',
        gender: '女性',
        birthday: '2000-01-01',
        phone: '0912345678',
        address: '談投現埔里鎮大學路',
        email: 'userone@gmail.com',
        avatarId: 1,
    });
    const [avatarSource, setAvatarSource] = useState(require('../../assets/images/baby/all/6.png'));
    const [backgroundColor, setBackgroundColor] = useState('#fff5c5'); // 新增背景顏色狀態

    // 定義大頭貼映射對象
    const images = {
        // #9d8b8b
        1:require("../../assets/images/baby/all/384.png"),
        2:require("../../assets/images/baby/all/379.png"),
        3:require("../../assets/images/baby/all/380.png"),
        4:require("../../assets/images/baby/all/381.png"),
        5:require("../../assets/images/baby/all/382.png"),
        6:require("../../assets/images/baby/all/383.png"),

        // #ffc3bc
        7:require("../../assets/images/baby/all/48.png"),
        8:require("../../assets/images/baby/all/43.png"),
        9:require("../../assets/images/baby/all/44.png"),
        10:require("../../assets/images/baby/all/45.png"),
        11:require("../../assets/images/baby/all/46.png"),
        12:require("../../assets/images/baby/all/47.png"),

        // #f5eab8
        13:require("../../assets/images/baby/all/6.png"),
        14:require("../../assets/images/baby/all/1.png"),
        15:require("../../assets/images/baby/all/2.png"),
        16:require("../../assets/images/baby/all/3.png"),
        17:require("../../assets/images/baby/all/4.png"),
        18:require("../../assets/images/baby/all/5.png"),

        // #cdb4a6
        19:require("../../assets/images/baby/all/90.png"),
        20:require("../../assets/images/baby/all/85.png"),
        21:require("../../assets/images/baby/all/86.png"),
        22:require("../../assets/images/baby/all/87.png"),
        23:require("../../assets/images/baby/all/88.png"),
        24:require("../../assets/images/baby/all/89.png"),

        // #a8aab3
        25:require("../../assets/images/baby/all/132.png"),
        26:require("../../assets/images/baby/all/127.png"),
        27:require("../../assets/images/baby/all/128.png"),
        28:require("../../assets/images/baby/all/129.png"),
        29:require("../../assets/images/baby/all/130.png"),
        30:require("../../assets/images/baby/all/131.png"),

        // #fbcda1
        31:require("../../assets/images/baby/all/174.png"),
        32:require("../../assets/images/baby/all/169.png"),
        33:require("../../assets/images/baby/all/170.png"),
        34:require("../../assets/images/baby/all/171.png"),
        35:require("../../assets/images/baby/all/172.png"),
        36:require("../../assets/images/baby/all/173.png"),

        // #ece1cf
        37:require("../../assets/images/baby/all/216.png"),
        38:require("../../assets/images/baby/all/211.png"),
        39:require("../../assets/images/baby/all/212.png"),
        40:require("../../assets/images/baby/all/213.png"),
        41:require("../../assets/images/baby/all/214.png"),
        42:require("../../assets/images/baby/all/215.png"),

        // #e2c997
        43:require("../../assets/images/baby/all/258.png"),
        44:require("../../assets/images/baby/all/253.png"),
        45:require("../../assets/images/baby/all/254.png"),
        46:require("../../assets/images/baby/all/255.png"),
        47:require("../../assets/images/baby/all/256.png"),
        48:require("../../assets/images/baby/all/257.png"),

        // #666666
        49:require("../../assets/images/baby/all/300.png"),
        50:require("../../assets/images/baby/all/295.png"),
        51:require("../../assets/images/baby/all/296.png"),
        52:require("../../assets/images/baby/all/297.png"),
        53:require("../../assets/images/baby/all/298.png"),
        54:require("../../assets/images/baby/all/299.png"),

        // #b1a9a9
        55:require("../../assets/images/baby/all/342.png"),
        56:require("../../assets/images/baby/all/337.png"),
        57:require("../../assets/images/baby/all/338.png"),
        58:require("../../assets/images/baby/all/339.png"),
        59:require("../../assets/images/baby/all/340.png"),
        60:require("../../assets/images/baby/all/341.png"),

        // #cda686
        61:require("../../assets/images/baby/all/426.png"),
        62:require("../../assets/images/baby/all/421.png"),
        63:require("../../assets/images/baby/all/422.png"),
        64:require("../../assets/images/baby/all/423.png"),
        65:require("../../assets/images/baby/all/424.png"),
        66:require("../../assets/images/baby/all/425.png"),

        // #ffe4e4
        67:require("../../assets/images/baby/all/468.png"),
        68:require("../../assets/images/baby/all/463.png"),
        69:require("../../assets/images/baby/all/464.png"),
        70:require("../../assets/images/baby/all/465.png"),
        71:require("../../assets/images/baby/all/466.png"),
        72:require("../../assets/images/baby/all/467.png"),

        // #ffd8c3
        73:require("../../assets/images/baby/all/510.png"),
        74:require("../../assets/images/baby/all/505.png"),
        75:require("../../assets/images/baby/all/506.png"),
        76:require("../../assets/images/baby/all/507.png"),
        77:require("../../assets/images/baby/all/508.png"),
        78:require("../../assets/images/baby/all/509.png"),
    };

    // 定義背景顏色映射
    const backgroundColors = {
        1: '#9d8b8b',  7: '#ffc3bc', 13: '#f5eab8', 19: '#cdb4a6',
        25: '#a8aab3', 31: '#fbcda1', 37: '#ece1cf', 43: '#e2c997',
        49: '#666666', 55: '#b1a9a9', 61: '#cda686', 67: '#ffe4e4',
        73: '#ffd8c3',
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                if (!token) {
                    console.log('未能取得token');
                    return;
                }

                const response = await fetch(link.AboutMe, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`,
                    },
                });

                if (!response.ok) {
                    Alert.alert('獲取用戶數據失敗，請檢查您的網絡連接或伺服器狀態');
                    return;
                }

                const data = await response.json();
                setUserData({
                    ...data,
                    gender: data.gender === 0 ? '女性' : '男性'
                });
                setIsLoading(true);

                if (data.avatarId && images[data.avatarId]) {
                    setAvatarSource(images[data.avatarId]);
                    const range = Math.ceil(data.avatarId / 6);
                    setBackgroundColor(backgroundColors[range * 6 - 5]);
                }

            } catch (error) {
                Alert.alert('獲取用戶數據過程中出現錯誤:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            {isloading ? (
                <View>
                    <View style={[styles.content, { backgroundColor }]}>
                        <View style={styles.circleout}>
                            <View style={[styles.circle, { backgroundColor }]}>
                                <Image style={styles.image} source={avatarSource} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.info}>
                        <View style={styles.data}>
                            <Text style={styles.datatext}>帳號：{userData.username}</Text>
                        </View>
                        <View style={styles.data}>
                            <Text style={styles.datatext}>性別：{userData.gender}</Text>
                        </View>
                        <View style={styles.data}>
                            <Text style={styles.datatext}>生日：{userData.birthday}</Text>
                        </View>
                        <View style={styles.data}>
                            <Text style={styles.datatext}>手機：{userData.phone}</Text>
                        </View>
                        <View style={styles.data}>
                            <Text style={styles.datatext}>地址：{userData.address}</Text>
                        </View>
                        <View style={styles.data}>
                            <Text style={styles.datatext}>電子郵件：{userData.email}</Text>
                        </View>
                    </View>
                </View>
            ) : (
                <ActivityIndicator style={{ marginTop: '80%' }} size="large" color="#338168" />
            )}
        </ScrollView>
    );
};

// 獲取營幕寬度
const screenWidth = Dimensions.get('window').width;

// 定義組件中使用的樣式
const styles = StyleSheet.create({
    content: {
        flexDirection: 'column',
        width: screenWidth, // 設置為營幕寬度
        alignItems: 'center', // 對齊中心
        justifyContent: 'center', // 對齊中心
        alignContent: 'center', // 對齊中心
    },
    circleout:{
        margin:5,
        height:220,
        width:220,
        borderRadius:120,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
    },
    contenttext:{
        flex: 1,
        backgroundColor:'white',
        width:'100%',
        alignItems:'center',
    },
    circle: {
        margin: 5,
        height: 200,
        width: 200,
        borderRadius: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image:{
        height:200,
        width:200,
        resizeMode:'contain'
    },
    usrtext:{
        fontSize:20,
        fontWeight:'bold',
        padding:5,
        margin:10,
    },
    image:{
        height:200,
        width:200,
        resizeMode:'contain'
    },
    info:{
        margin:20,
        backgroundColor:'white',
        borderRadius:30,
    },
    data:{
        margin:10,
        padding:10,
    },
    datatext:{
        fontSize:20,
    },
});

// 導出該組件供其他組件使用
export default AboutMe;
