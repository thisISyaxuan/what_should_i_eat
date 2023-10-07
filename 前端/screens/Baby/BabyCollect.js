import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Image, FlatList, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { images } from '../../data/babyImage';
import { baby_DATA } from '../../data/baby';
import AsyncStorage from "@react-native-async-storage/async-storage";

const BabyCollect = () => {
    const navigation = useNavigation();
    const [ownedBabies, setOwnedBabies] = useState([baby_DATA[0].id]); 
    const [coins, setCoins] = useState(0);


    useEffect(() => {
        const fetchOwnedBabiesAndCoins = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                if (token) {
                    fetch('http://192.168.79.12:8000/baby/baby/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Token ${token}`
                        },
                    })
                        .then(response => response.json())
                        .then(data => {
                            let updatedOwnedBabies = [...new Set([...data.ownedBabies, baby_DATA[0].id])]; // 讓第一個baby預設到ownedBabies中
                            setOwnedBabies(updatedOwnedBabies);
                            setCoins(data.coins);
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

        fetchOwnedBabiesAndCoins();
    }, []);

    const changeAvatar = useCallback((baby) => {
        Alert.alert(
          '更換大頭貼',
          `您確定要更換該大頭貼嗎？`,
          [
            { text: '取消', style: 'cancel' },
            {
              text: '確認更換',
              onPress: async () => {
                try {
                  await AsyncStorage.setItem('selectedAvatar', JSON.stringify(baby));
                  navigation.navigate('Myacc'); // 導向到 Myacc 螢幕
                } catch (error) {
                  console.error('Error saving selected avatar: ', error);
                }
              },
            },
          ],
        );
      }, [navigation]);

      const purchaseBaby = useCallback(async (baby) => {
        if (coins < baby.price) {
            Alert.alert('金幣不足', '您的金幣不足，無法購買！');
            return;
        }
    
        Alert.alert(
            '購買確認',
            `您確定要花費 ${baby.price} 金幣購買嗎？`, 
            [
                { text: '取消', style: 'cancel' },
                {
                    text: '確認購買',
                    onPress: async () => {
                        try {
                            const token = await AsyncStorage.getItem('userToken');
                            if (!token) {
                                console.error('未能取得token');
                                return;
                            }
    
                            const response = await fetch('寫入後端購買API的URL', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Token ${token}`
                                },
                                body: JSON.stringify({
                                    baby_Id: baby.id
                                })
                            });
    
                            if (!response.ok) {
                                console.error('購買失敗，請檢查您的網絡連接或伺服器狀態');
                                return;
                            }
    
                            const data = await response.json();
                            setCoins(data.coins);
                            if (data.success) {
                                let newOwnedBabies = [...ownedBabies, baby.id];
                                setOwnedBabies(newOwnedBabies);
                                Alert.alert('購買成功', `您已成功購買此項目，目前餘額為 ${data.coins} 金幣。`);
                            } else {
                                Alert.alert('購買失敗', '您的金幣不足，請獲得更多金幣後再試。');
                            }
    
                        } catch (error) {
                            console.error('購買過程中出現錯誤:', error);
                        }
                    },
                },
            ],
        );
    }, [coins, ownedBabies]);

    const renderItem = ({ item, index }) => (
        <View style={styles.circle}>
            <TouchableOpacity
                style={styles.image}
                onPress={() => {
                    if(ownedBabies.includes(baby_DATA[index].id)){
                        changeAvatar(baby_DATA[index])
                    } else {
                        purchaseBaby(baby_DATA[index]);
                    }
                }}
            >
                <Image style={styles.pic} source={item} />
                {!ownedBabies.includes(baby_DATA[index].id) && 
                    <View style={[styles.mask]} />}
            </TouchableOpacity>
            {!ownedBabies.includes(baby_DATA[index].id) && (
                <View style={styles.money}>
                    <Image style={styles.icon} source={require('../../assets/images/coin.png')} />
                    <Text> {baby_DATA[index].price}</Text>
                </View>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.coinsContainer}>
                <Image style={styles.coinIcon} source={require('../../assets/images/coin.png')} />
                <Text style={styles.coinsText}>金幣: {coins}</Text>
            </View>
            
            <FlatList
                data={images}
                renderItem={renderItem}
                numColumns={3}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.listContainer}
                style={styles.flatlist}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    coinsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        alignSelf: 'center',
    },
    flatlist: {},
    listContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
        padding: 5,
    },
    circle: {
        flexDirection: 'column',
        width: '33%',
        height: 140,
        alignItems: 'center',
    },
    image: {
        borderWidth: 1,
        borderColor: '#f6d58a',
        width: '90%',
        aspectRatio: 1,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    mask: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: 60,
    },
    money: {
        marginTop: 'auto',
        flexDirection: 'row',
        padding: 5,
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 20,
        height: 20,
    },
    pic: {
        width: '100%',
        height: '100%',
        aspectRatio: 1,
    },
    imageText: {
        marginTop: 5,
        fontSize: 12,
        color: 'gray',
    },
    coinIcon: {
        width: 24,
        height: 24,
        marginRight: 8,
    },
    coinsText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default BabyCollect;