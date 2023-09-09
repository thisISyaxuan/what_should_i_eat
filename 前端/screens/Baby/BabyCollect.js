import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, FlatList, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { images } from '../../data/babyImage';
import { baby_DATA } from '../../data/baby';

const BabyCollect = () => { 
    const navigation = useNavigation();
    const [ownedBabies, setOwnedBabies] = useState([]); // 定義一個狀態來儲存使用者已擁有的精靈id

    // 使用useEffect進行組件初始化時的API請求
    useEffect(() => {
        // API位址(這裡需要替換為真實的位址)
        fetch('https://yourapi.com/getUserBabies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: 'your_token_here', // 替換成實際使用的token
            }),
        })
        .then(response => response.json())
        .then(data => {
            setOwnedBabies(data.ownedBabies); // 更新已擁有精靈的狀態
        })
        .catch((error) => {
            console.error('獲取數據出錯:', error);
        });
    }, []);

    const renderItem = ({ item, index }) => (
        <View style={styles.circle}>
            <TouchableOpacity style={styles.image}>
                <Image style={styles.pic} source={item} />
                {/* 如果該用戶未擁有這個精靈，則添加灰色蒙板 */}
                {!ownedBabies.includes(baby_DATA[index].id) && 
                    <View style={[StyleSheet.absoluteFill, {backgroundColor: 'rgba(0,0,0,0.7)'}]} />}
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
        padding:5,
    },
    circle: {
        flexDirection: 'column',
        width: '33%',
        height:140,
        alignItems: 'center', 
    },
    image: {
        borderWidth:1,
        borderColor:'#f6d58a',
        width: '90%',
        aspectRatio: 1,
        borderRadius:60,
        alignItems: 'center', 
        justifyContent:'center',
        padding:5,
    },
    money: {
        marginTop: 'auto',
        flexDirection: 'row',
        padding:5,
        width:'60%',
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
});

export default BabyCollect;
