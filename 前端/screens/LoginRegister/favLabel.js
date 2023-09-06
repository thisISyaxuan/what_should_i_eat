// 引入React和React Native相關的元件和函式庫
import React from 'react';
import { View, StyleSheet, Image, FlatList,Text} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { images } from '../../data/labelImage';
import { TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';

// 定義名為BabyCollect的函式組件
const FavLabel = () => { 
    const navigation = useNavigation(); // 使用React Navigation的導航功能
        // 定義一個用於渲染列表項目的函式
        const renderItem = ({ item,index }) => (
        <View style={styles.circle}>
            {/* 圖片按鈕 */}
            <TouchableOpacity style={styles.image}>
              <Image style={styles.pic} source={item.image} />
            </TouchableOpacity>
            {/* 圖片下方文字-顯示金幣數量的區域 */}
            <View  style={styles.money}>
              <Text style={[{color:'white',}]}>{item.label}</Text></View>
        </View>
    );

    const handleRegister = async () => {
        try {
          const data = {
            username: username,
            gender: gender,
            birthday: birthday,
            phone_number: phone_number,
            address: address,
            email: email,
            password: password,
            verify_password: verify_password
          };
      
          // 使用fetch或axios進行POST請求，將data送至後端API
          const response = await fetch('http://192.168.0.2:8000/api/Register/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'//用json傳
            },
            body: JSON.stringify(data)
          });
      
          const responseData = await response.json();
          
          // 處理後端回傳的資料
          if (responseData.success === true) {
            // 導航到其他畫面
            navigation.navigate('Login'); // 假設是導航到主頁面
          } else {
            // 如果success為false，可能是註冊失敗，做相應處理
            console.log('註冊失敗');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

    // 返回組件的JSX內容
    return (
        <View style={styles.container}>
            <View style={styles.hone}>
                <Text style={[{color:'white',fontSize:20,fontWeight:'bold',padding:10}]}>再多選幾個你喜歡的餐飲類別</Text>
            <FlatList
                data={images}
                renderItem={renderItem}
                numColumns={3}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.listContainer}
                style={styles.flatlist}
            />
            <TouchableOpacity style={[styles.but]} onPress={handleRegister}>
            <Text style={[{color:'#174441',fontSize:20,fontWeight:'bold'}]}>提交</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
};

// 定義組件中使用的樣式
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#174441',
    },
    hone:{
        flex: 1,
        alignItems:'center',
    },
    flatlist:{
        flex: 5,
    },
    but:{
        backgroundColor: 'white',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 40,
        alignItems: 'center',
        marginBottom:50,
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
        backgroundColor: '#F6D58A',
    },
    money:{
        marginTop: 'auto',
        flexDirection: 'row',
        padding:5,
        width:200,
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
export default FavLabel;
