import { useNavigation } from "@react-navigation/native";
import {StyleSheet,TouchableOpacity,Text,View} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
export default EventItem = ({rName,rMap_Score,rPhone,rAddress,open,opentwo,distance,rID,}) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("餐廳資訊",{rName,rMap_Score,rPhone,rAddress,open,opentwo,distance,rID})}>
          <View style={styles.rowContainer}>
            <View style={styles.pic}><Text>pic</Text></View>

            <View style={styles.cardContent}>
              <View style={{flexDirection: 'row',alignItems: 'center',width: 250,}}>
                <Text style={styles.restitle}>{rName}</Text>
                {opentwo === -1 ? <Ionicons name="heart" size={45} color={'red'} /> : <Ionicons name="heart-outline" size={45} color={'#C0C0C0'} />}
              </View>


              <View style={styles.rowContainer}><Icon name="circle" size={10} color={open === -1 ? 'red' : 'green'} /><Text style={{ fontSize: 14 }}>{open === -1 ? '  已打烊' : '  營業中'}</Text></View>
              <View style={[styles.rowContainer,{alignItems: 'flex-end',justifyContent:'flex-end'}]}><Ionicons name="location" size={20} color="gray" /><Text>距離{distance}km</Text></View>
            </View>

          </View>
        </TouchableOpacity>
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
      width:"75%",
    },
    restitle:{
      fontSize:23,
      fontWeight:"bold",
      marginBottom:15,
      width:"75%",
    },
  });
