// 引入React和React Native相關的元件和函式庫
import React from 'react';
import { View, StyleSheet, Image, FlatList,Text} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { images } from '../../data/babyImage';
import { baby_DATA } from '../../data/baby';
import { TouchableOpacity } from 'react-native';

// 定義名為BabyCollect的函式組件
const BabyCollect = () => { 
    const navigation = useNavigation(); // 使用React Navigation的導航功能
        // 定義一個用於渲染列表項目的函式
        const renderItem = ({ item,index }) => (
        <View style={styles.circle}>
            {/* 圖片按鈕 */}
            <TouchableOpacity style={styles.image}>
              <Image style={styles.pic} source={item} />
            </TouchableOpacity>
            {/* 圖片下方文字-顯示金幣數量的區域 */}
            <View  style={styles.money}>
              <Image style={styles.icon} source={require('../../assets/images/coin.png')}/>
              <Text> {baby_DATA[index].price}</Text></View>
        </View>
    );

    // 返回組件的JSX內容
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

// 定義組件中使用的樣式
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
    },
    flatlist:{
        
    },
    listContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
        padding:5,
    },
    itemContainer: {
        marginBottom: 10,
        alignItems: 'center', 
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
    money:{
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
    imageText: {
        marginTop: 5,
        fontSize: 12,
        color: 'gray',
    },
});

// 導出該組件供其他組件使用
export default BabyCollect;
