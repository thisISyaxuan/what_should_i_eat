import { useNavigation } from "@react-navigation/native";
import {StyleSheet,TouchableOpacity,Text,View} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from "react";
export default EventItem = ({rID,rName,rMap_Score,rPhone,rAddress,open,collect,distance,labelID}) => {
    const navigation = useNavigation()
    return (
        <View style={styles.card}>
          <View style={styles.rowContainer}>
            <View style={styles.pic}><Text>     </Text></View>
            <View>
                <View style={[styles.rowContainer,{width:"90%"}]}>
                    <TouchableOpacity style={styles.cardContent} onPress={() => navigation.navigate("餐廳資訊",{rID,rName,rMap_Score,rPhone,rAddress,open,collect,distance,labelID})}>
                        <Text style={[styles.restitle]}>{rName}</Text>
                        <View style={styles.rowContainer}><Icon name="circle" size={10} color={open === -1 ? 'red' : 'green'} /><Text style={{ fontSize: 14 }}>{open === -1 ? '  已打烊' : '  營業中'}</Text></View>
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
      padding:30,
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
