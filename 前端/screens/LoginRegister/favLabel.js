import React, { useState } from 'react';
import { View, StyleSheet, Image, FlatList,Text} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { images } from '../../data/labelImage';
import { TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from "@react-navigation/native";//參數傳遞
import { Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { link } from '../../data/apiLink';

const FavLabel = ({navigation}) => {
    const route = useRoute()
    const { username, gender, birthday, phone_number, address, email, password, verify_password, } = route.params;
    const [preferences, setPreferences] = useState([]);

    const togglePreference = (label) => {
      // preference切換
      const isExisting = preferences.includes(label);
      if (isExisting) {
        setPreferences(preferences.filter((item) => item !== label));
      } else {
        setPreferences([...preferences, label]);
      }
    };

    const renderItem = ({ item,index }) => {
      const isSelected = preferences.includes(item.label);
      return(
        <View style={styles.circle}>
          <TouchableOpacity style={styles.image} onPress={() => togglePreference(item.label)}>
            <Image style={styles.pic} source={item.image} />
            {isSelected && (
            <View style={styles.overlay}>
              <Image source={require('../../assets/images/checked.png')} style={styles.overlayImage} />
            </View>
            )}
          </TouchableOpacity>
          <View  style={styles.money}><Text style={[{color:'black',}]}>{item.label}</Text>
          </View>
        </View>
      )
      
    };
    const handleRegister = async () => {
            try {
              if (preferences.length < 5) {
                Alert.alert('提示', '請至少勾選五個類別!');
                return;
              }


              const data = {
                username: username,
                gender: gender,
                birthday: birthday,
                phone_number: phone_number,
                address: address,
                email: email,
                password: password,
                verify_password: verify_password,
                preferences:preferences,
              };
              const response = await fetch(link.favLabel, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'//用json傳
                },
                body: JSON.stringify(data)
              });
              const responseData = await response.json();
              if (responseData.success === true) {
                Alert.alert('註冊成功', '重新登入以開始體驗!', [
                  {
                    text: 'OK',
                    onPress: () => {
                      navigation.navigate('Login');
                    },
                  },
                ]);
              } else {
                Alert.alert('註冊失敗', '發生錯誤，請重新註冊!', [
                  {
                    text: 'OK',
                    onPress: () => {
                      navigation.navigate('Register');
                    },
                  },
                ]);
              }

            } catch (error) {
              console.error('Error:', error);
            }
          };
    return (
        <View style={styles.container}>
            <View style={styles.hone}>
                <Text style={[{color:'black',fontSize:20,fontWeight:'bold',padding:10}]}>勾選五個以上你喜歡的類別</Text>
            <FlatList
                data={images}
                renderItem={renderItem}
                numColumns={3}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.listContainer}
                style={styles.flatlist}
            />
            <TouchableOpacity style={[styles.but]} onPress={handleRegister}>
            <Text style={[{color:'white',fontSize:20,fontWeight:'bold'}]}>提交</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#EBEAE9',//#174441
    },
    hone:{
        flex: 1,
        alignItems:'center',
    },
    flatlist:{
        flex: 5,
    },
    but:{
        backgroundColor: '#174441',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 40,
        alignItems: 'center',
        marginTop:30,
        marginBottom:30,
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
        height:150,
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
    overlay: {
      position: 'absolute', //把疊加圖片放在圓圈上方
      top: 5, //控制疊加綠色圖片的位置，可以根據需要微調
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    },
    overlayImage: {
      width: '100%',
      height: '100%',
      opacity: 0.7, //控制疊加綠色圖片的透明度
    },
    money:{
        flexDirection: 'row',
        padding:5,
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

export default FavLabel;
