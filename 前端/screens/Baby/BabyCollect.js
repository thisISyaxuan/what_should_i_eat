import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, FlatList, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { images } from '../../data/babyImage';
import { baby_DATA } from '../../data/baby';
import AsyncStorage from "@react-native-async-storage/async-storage";

const BabyCollect = () => { 
    const navigation = useNavigation();
    const [ownedBabies, setOwnedBabies] = useState([]); // 使用useState來保存用戶已擁有的精靈id列表

    useEffect(() => {
        const fetchOwnedBabies = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken'); // 從AsyncStorage中取得token
                if (token) {
                    console.log(token)
                    // 使用token發送請求到後端取得使用者數據(使用實際API連結)
                    fetch('http://192.168.79.12:8000/baby/baby/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Token ${token}` // 使用Bearer token方式進行認證，根據您的後端來調整
                        },
                    })
                    .then(response => response.json())
                    .then(data => {
                        // data = {"ownedBabies": [1,2]}
                        console.log(data.ownedBabies);
                        setOwnedBabies(data.ownedBabies); // 從後端取得的已擁有精靈id列表
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

        fetchOwnedBabies(); // 執行上面的函數
    }, []);

    const renderItem = ({ item, index }) => (
        <View style={styles.circle}>
            <TouchableOpacity style={styles.image}>
                <Image style={styles.pic} source={item} />
                {/* 如果該精靈不在已擁有列表中，則加上正圓形的灰色蒙板 */}
                {!ownedBabies.includes(baby_DATA[index].id) &&
                    <View style={[styles.mask]} />}
            </TouchableOpacity>
            <View style={styles.money}>
                <Image style={styles.icon} source={require('../../assets/images/coin.png')}/>
                <Text> {baby_DATA[index].price}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
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

// 樣式部分維持不變
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
    },
    flatlist: {},
    listContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
        padding: 5,
    },
    itemContainer: {
        marginBottom: 10,
        alignItems: 'center',
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
        borderRadius: 60 // 設定為與image的borderRadius相同
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
});

export default BabyCollect;