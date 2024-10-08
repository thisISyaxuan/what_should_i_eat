import { useNavigation } from "@react-navigation/native";
import {StyleSheet,TouchableOpacity,Text,View, Image} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from "react";
import {images} from '../data/labelImage'
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { link } from "../data/apiLink";
export default EventItem = ({rID,rName,rMap_Score,rPhone,rAddress,open,collect,distance,labelID}) => {
    const limitRName = rName.length > 15 ? rName.slice(0, 15) + '...' : rName;//字數大於20個字
    const navigation = useNavigation()
    const imageObject = images.find(image => image.label === labelID);
    //點下去的話
    const ClickResName = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken'); // 從AsyncStorage中取得token
        if (userToken) {//抓時間，token，rID
          const currentDate = new Date();//先抓時間 格式為年-月-日-時-分-秒
          const formattedTime = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}-${currentDate.getHours()}-${currentDate.getMinutes()}-${currentDate.getSeconds()}`;
          const postdata = {
            Time:formattedTime,//裡面放當下時間
            rID:rID,//餐廳id
          };
          const response = await fetch(link.eventItem, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
               Authorization: `Token ${userToken}`,
            },
            body: JSON.stringify(postdata)
          });
          if (response.ok) {//if response.ok
            console.log("response.ok")
            const responseData = await response.json();
            //console.log(responseData)
            const collect = responseData.success.collect;
            const mydata = {rID,rName,rMap_Score,rPhone,rAddress,open,collect,distance,labelID}
            console.log("mydata:",mydata)
            navigation.navigate("餐廳資訊",mydata)
          } else {
            console.error('後端回傳發生錯誤嗚嗚嗚', response.status);
            Alert.alert("發生錯誤，請再試一次");
          }
        }else{
          navigation.navigate("餐廳資訊",{rID,rName,rMap_Score,rPhone,rAddress,open,collect,distance,labelID})
        }
      }catch{
        console.log('43 行')
        console.log("發生錯誤，可能連結沒改")
      }
    }
    
    return (
        <View style={styles.card}>
          <View style={styles.rowContainer}>
            <View style={styles.pic}>
              {imageObject && (<Image source={imageObject.image} style={{ width: 55, height: 55 }} />)}
            </View>
            <View>
                <View style={[styles.rowContainer,{width:"90%"}]}>
                    <TouchableOpacity style={styles.cardContent} onPress={ClickResName}>
                        <Text style={[styles.restitle]}>{limitRName}</Text>
                        <View style={styles.rowContainer}><Icon name="circle" size={10} color={open === -1 ? 'red' :open ===0 ? '#E5B45A' : 'green'} /><Text style={{ fontSize: 14 }}>{open === -1 ? '  已打烊' : open===0 ? '  即將打烊': '  營業中'}</Text></View>
                    </TouchableOpacity>
                </View>
                <View style={[styles.rowContainer,{width:"89%",alignItems: 'flex-end',justifyContent:'flex-end'}]}><Ionicons name="location" size={20} color="gray" /><Text>距離{distance}km </Text></View>
            </View>

          </View>
        </View>
    )
}
const styles = StyleSheet.create({
    card: {
      borderWidth:1,
      borderColor:'white',//#c5c5c5
      borderRadius:10,
      marginVertical:5,
      padding:20,
      backgroundColor:'white',
    },
    pic: {
      borderWidth:1,
      borderRadius:10,
      padding:10,
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rowLineContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'center',
    },
    cardContent: {
      marginLeft: 10,
      width:"90%",
      
    },
    restitle:{
      fontSize:23,
      fontWeight:"bold",
      marginBottom:15,
      flex:1,
    },
  });
