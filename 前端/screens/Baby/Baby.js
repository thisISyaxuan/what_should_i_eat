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
    const [fadeAnimone] = useState(new Animated.Value(1));
    useEffect(() => {
        
        const fetchUserData = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                if (!token) {
                    console.log('未能取得token');
                    return;
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
    }, []);

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
                Alert.alert("簽到失敗")
                return;
            }

            const data = await response.json();
            if (data.success) {
                const coinsDifference = data.coins - coins;
                setCoins(data.coins);
                setHasSignedIn(true);
                showFloatingCoin(coinsDifference);
            } else {
                Alert.alert("今日已完成簽到")
            }

        } catch (error) {
            Alert.alert('簽到過程中出現錯誤:', error);
        }
        
    }, [fadeAnim, coins]);

    const RandomRes = async () =>{
        //navigation.navigate("為您推薦")
        
        try{//跟後端要餐廳的資訊
            
            const response = await fetch(link.randomRes, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Token ${userToken}`,
                },
                body: JSON.stringify(data),
            });
            const responseData = await response.json();//後端回傳資料
            console.log("後端回傳的responseData為:",responseData);
            
            navigation.navigate("為您推薦",{data:responseData.success})
        }catch(error){
            console.error('Baby Error sending request:', error);
        }
        
    }



    return (
        <ImageBackground
            source={require('../../assets/images/Background.jpg')}
            style={styles.container}
        >
            <View style={styles.btn}>
                <Image
                    style={{ width: 35, height: 35 }}
                    source={require('../../assets/images/coin.png')}
                />
                <Text> </Text>
                <Text>{coins}</Text>
            </View>

            <TouchableOpacity
                style={styles.collect}
                onPress={() => navigation.navigate('精靈圖鑑')}
            >
                <Image
                    style={{ width: 50, height: 50 }}
                    source={require('../../assets/images/babybook.png')}
                />
                <Text>精靈圖鑑</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.signIn}
                onPress={handleSignIn}
                disabled={hasSignedIn}
            >
                <Image
                    style={{
                        width: 50,
                        height: 50,
                        opacity: hasSignedIn ? 0.5 : 1,
                    }}
                    source={require('../../assets/todolist.png')}
                />
                <Text>今日簽到</Text>
            </TouchableOpacity>

            <Animated.View 
                style={{
                    ...styles.floatingCoin,
                    opacity: fadeAnim,
                    duration: 3000
                }}>
                <Text style={styles.coinText}>雞腿幣+100</Text>
            </Animated.View>
            

            <View style={styles.dialogBox}> 
              <Text style={styles.dialogText}>還是不知道吃什麼的話</Text> 
              <Text style={styles.dialogText}>我可以幫你推薦！</Text> 
              
            </View>
            <View style={styles.arrow}></View> 

            
                <TouchableOpacity style={styles.circle} onPress={RandomRes}><Text>123</Text>
                <Image style={{ width: 250, resizeMode: 'contain' }} source={require('../../assets/images/baby/baby0/6.png')} />
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
        top: '40%',
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
