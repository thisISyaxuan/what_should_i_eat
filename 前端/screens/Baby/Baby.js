import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, Animated, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { link } from '../../data/apiLink';

export default function Baby() {
    const navigation = useNavigation();
    const [hasSignedIn, setHasSignedIn] = useState(false);
    const [coins, setCoins] = useState(null);
    const [fadeAnim] = useState(new Animated.Value(0));
    const [avatarSource, setAvatarSource] = useState(require('../../assets/images/baby/baby0/6.png')); // 初始大頭貼源
    
    // 定義大頭貼映射對象
    const images = {
        1:require("../../assets/images/baby/all/384.png"),
        2:require("../../assets/images/baby/all/379.png"),
        3:require("../../assets/images/baby/all/380.png"),
        4:require("../../assets/images/baby/all/381.png"),
        5:require("../../assets/images/baby/all/382.png"),
        6:require("../../assets/images/baby/all/383.png"),

        7:require("../../assets/images/baby/all/48.png"),
        8:require("../../assets/images/baby/all/43.png"),
        9:require("../../assets/images/baby/all/44.png"),
        10:require("../../assets/images/baby/all/45.png"),
        11:require("../../assets/images/baby/all/46.png"),
        12:require("../../assets/images/baby/all/47.png"),

        13:require("../../assets/images/baby/all/6.png"),
        14:require("../../assets/images/baby/all/1.png"),
        15:require("../../assets/images/baby/all/2.png"),
        16:require("../../assets/images/baby/all/3.png"),
        17:require("../../assets/images/baby/all/4.png"),
        18:require("../../assets/images/baby/all/5.png"),

        19:require("../../assets/images/baby/all/90.png"),
        20:require("../../assets/images/baby/all/85.png"),
        21:require("../../assets/images/baby/all/86.png"),
        22:require("../../assets/images/baby/all/87.png"),
        23:require("../../assets/images/baby/all/88.png"),
        24:require("../../assets/images/baby/all/89.png"),

        25:require("../../assets/images/baby/all/132.png"),
        26:require("../../assets/images/baby/all/127.png"),
        27:require("../../assets/images/baby/all/128.png"),
        28:require("../../assets/images/baby/all/129.png"),
        29:require("../../assets/images/baby/all/130.png"),
        30:require("../../assets/images/baby/all/131.png"),

        31:require("../../assets/images/baby/all/174.png"),
        32:require("../../assets/images/baby/all/169.png"),
        33:require("../../assets/images/baby/all/170.png"),
        34:require("../../assets/images/baby/all/171.png"),
        35:require("../../assets/images/baby/all/172.png"),
        36:require("../../assets/images/baby/all/173.png"),

        37:require("../../assets/images/baby/all/216.png"),
        38:require("../../assets/images/baby/all/211.png"),
        39:require("../../assets/images/baby/all/212.png"),
        40:require("../../assets/images/baby/all/213.png"),
        41:require("../../assets/images/baby/all/214.png"),
        42:require("../../assets/images/baby/all/215.png"),

        43:require("../../assets/images/baby/all/258.png"),
        44:require("../../assets/images/baby/all/253.png"),
        45:require("../../assets/images/baby/all/254.png"),
        46:require("../../assets/images/baby/all/255.png"),
        47:require("../../assets/images/baby/all/256.png"),
        48:require("../../assets/images/baby/all/257.png"),

        49:require("../../assets/images/baby/all/300.png"),
        50:require("../../assets/images/baby/all/295.png"),
        51:require("../../assets/images/baby/all/296.png"),
        52:require("../../assets/images/baby/all/297.png"),
        53:require("../../assets/images/baby/all/298.png"),
        54:require("../../assets/images/baby/all/299.png"),

        55:require("../../assets/images/baby/all/342.png"),
        56:require("../../assets/images/baby/all/337.png"),
        57:require("../../assets/images/baby/all/338.png"),
        58:require("../../assets/images/baby/all/339.png"),
        59:require("../../assets/images/baby/all/340.png"),
        60:require("../../assets/images/baby/all/341.png"),

        61:require("../../assets/images/baby/all/426.png"),
        62:require("../../assets/images/baby/all/421.png"),
        63:require("../../assets/images/baby/all/422.png"),
        64:require("../../assets/images/baby/all/423.png"),
        65:require("../../assets/images/baby/all/424.png"),
        66:require("../../assets/images/baby/all/425.png"),

        67:require("../../assets/images/baby/all/468.png"),
        68:require("../../assets/images/baby/all/463.png"),
        69:require("../../assets/images/baby/all/464.png"),
        70:require("../../assets/images/baby/all/465.png"),
        71:require("../../assets/images/baby/all/466.png"),
        72:require("../../assets/images/baby/all/467.png"),

        73:require("../../assets/images/baby/all/510.png"),
        74:require("../../assets/images/baby/all/505.png"),
        75:require("../../assets/images/baby/all/506.png"),
        76:require("../../assets/images/baby/all/507.png"),
        77:require("../../assets/images/baby/all/508.png"),
        78:require("../../assets/images/baby/all/509.png"),
    };

    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                const avatarId = await AsyncStorage.getItem('avatarId');
                if (!token) {
                    console.log('未能取得token');
                    return;
                }

                if (avatarId && images[avatarId]) {
                    setAvatarSource(images[avatarId]);
                }

                const response = await fetch(link.getUsrMoney, {
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
                setCoins(data.coins);
                setHasSignedIn(data.hasSignedIn);

            } catch (error) {
                Alert.alert('獲取用戶數據過程中出現錯誤:', error);
            }
        };

        fetchUserData();
        const focusListener = navigation.addListener('focus', fetchUserData);

        return () => {
            focusListener.remove();
        };
    }, [navigation]);

    const showFloatingCoin = (coinsDifference) => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start(() => {
            setTimeout(() => {
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }).start();
            }, 1000);
        });
    };

    const handleSignIn = useCallback(async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (!token) {
                console.log('未能取得token');
                return;
            }

            const response = await fetch(link.getUsrSign, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });

            if (!response.ok) {
                Alert.alert("簽到失敗");
                return;
            }

            const data = await response.json();
            if (data.success) {
                const coinsDifference = data.coins - coins;
                setCoins(data.coins);
                setHasSignedIn(true);
                showFloatingCoin(coinsDifference);
            } else {
                Alert.alert("今日已完成簽到");
            }

        } catch (error) {
            Alert.alert('簽到過程中出現錯誤:', error);
        }
    }, [fadeAnim, coins]);

    const RandomRes = async () =>{
        navigation.navigate("為您推薦");
    };

    return (
        <ImageBackground source={require('../../assets/images/Background.jpg')} style={styles.container}>
            <View style={styles.btn}>
                <Image style={{ width: 35, height: 35 }} source={require('../../assets/images/coin.png')} />
                <Text> </Text>
                <Text>{coins}</Text>
            </View>

            <TouchableOpacity style={styles.collect} onPress={() => navigation.navigate('精靈圖鑑')}>
                <Image style={{ width: 50, height: 50 }} source={require('../../assets/images/babybook.png')} />
                <Text>精靈圖鑑</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signIn} onPress={handleSignIn} disabled={hasSignedIn}>
                <Image style={{ width: 50, height: 50, opacity: hasSignedIn ? 0.5 : 1 }} source={require('../../assets/todolist.png')} />
                <Text>今日簽到</Text>
            </TouchableOpacity>

            <Animated.View style={{ ...styles.floatingCoin, opacity: fadeAnim }}>
                <Text style={styles.coinText}>雞腿幣+100</Text>
            </Animated.View>

            <View style={styles.dialogBox}> 
              <Text style={styles.dialogText}>還是不知道吃什麼的話</Text> 
              <Text style={styles.dialogText}>我可以幫你推薦！</Text> 
            </View>
            <View style={styles.arrow}></View> 

            <TouchableOpacity style={styles.circle} onPress={RandomRes}>
                <Image style={{ width: 250, resizeMode: 'contain' }} source={avatarSource} />
            </TouchableOpacity>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    circle: {
        width: 300,
        height: 300,
        borderRadius: 50,
        marginRight: 10,
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
    },
    btn: {
        position: 'absolute',
        top: 30,
        left: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    signIn: {
        position: 'absolute',
        top: 20,
        right: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    collect: {
        position: 'absolute',
        top: 130,
        right: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    floatingCoin: {
        position: 'absolute',
        top: '20%',
        left: '40%',
        backgroundColor: '#E5B45A',
        borderRadius: 20,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    floatingRes: {
        position: 'absolute',
        top: '40%',
        backgroundColor: 'white',
        borderRadius: 80,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    coinText: {
        color: 'white',
        fontWeight: 'bold',
    },
    ResText: {
        fontWeight: '500',
        fontSize:23,
        padding:5,
    },
    dialogBox: {
        position: 'absolute',
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 30,
        maxWidth: 300,
        top:'40%'
      },
      dialogText: {
        color: '#000000',
        fontWeight: '500',
        fontSize:23,
        padding:5,

      },
      arrow: {
        position: 'absolute',
        top: '56%',
        left:'30%',
        width: 0,
        height: 0,
        borderLeftWidth: 15,
        borderLeftColor: 'transparent',
        borderRightWidth: 15,
        borderRightColor: 'transparent',
        borderTopWidth: 15,
        borderTopColor: '#ffffff',
      },
});
