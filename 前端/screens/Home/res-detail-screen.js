import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { View,Text,StyleSheet,Image } from "react-native";
import { ScrollView, TextInput, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import { images } from '../../data/menu';


export default ResInfo = ({navigation}) =>{
    const route = useRoute()
    const {rName,rMap_Score,rPhone,rAddress,open,distance,rID} = route.params
    return(
        <View style={styles.container}>
            <View style={styles.title}>
            <Text style={{flex: 6,textAlign: 'right', fontSize:25,fontWeight:"bold"}}>{rName}</Text>
            <View style={{flex:3, alignItems: 'flex-end'}}><Ionicons name="heart" size={50} color={'red'}/></View>
            </View>

            <ScrollView horizontal showsVerticalScrollIndicator={false} style={{borderTopWidth:0.5, borderTopColor:'gray', borderBottomWidth:1, borderBottomColor:'gray', }}>
            <View style={{width: 275, height: 250, margin: 7, borderWidth: 1,justifyContent: 'center', alignItems: 'center'}}>
                <Image source={require('../../assets/images/restaurant/30-1.jpeg')} style={{ width: '100%', height: '100%' }} /></View>
            <View style={{width: 275, height: 250, margin: 7, borderWidth: 1,justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../../assets/images/restaurant/30-2.jpg')} style={{ width: '100%', height: '100%' }} /></View>
            </ScrollView>
    
        <View style={styles.output}>

            <View style={{flexDirection: 'row', top: -10, height: 50, flex: 2}}>
                <View style={{ justifyContent: 'center', margin: 7 }}>
                    <Icon name="circle" size={10} color={open === -1 ? 'red' : 'green' }/></View>
                <Text style={{fontSize:18}}>{open === -1 ? '現在打烊喔' : '營業中'}</Text>
            </View>
            <Text style={{fontSize:18, borderBottomWidth:1.5, borderBottomColor:'gray', height: 30}}>評分: {rMap_Score} 顆星</Text>
            <Text style={{fontSize:18, borderBottomWidth:1.5, borderBottomColor:'gray', height: 30}}>距離: {distance}km</Text>
            <Text style={{fontSize:18, borderBottomWidth:1.5, borderBottomColor:'gray', height: 30}}>電話: {rPhone}</Text>
            <Text style={{fontSize:18, borderBottomWidth:1.5, borderBottomColor:'gray', height: 30}}>地址: {rAddress}</Text>
        </View> 

        <View style={styles.bottom}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10, top: -20}}>
            <TouchableOpacity style={styles.ButtonR}>
                <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}} onPress={() => navigation.navigate("錯誤回報", {
    rName: rName,
    rMap_Score: rMap_Score,
    rPhone: rPhone,
    rAddress: rAddress,
    open: open,
    distance: distance,
    rID: rID,
  })}>錯誤回報</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ButtonL}>
                <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>造訪店家</Text>
            </TouchableOpacity>
            </View>
        </View>

        </View>
        
    )
}
const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 5,
        backgroundColor: '#fff',
        alignItems: 'center',
      },
      title: {
        borderBottomWidth:1.5, borderBottomColor:'gray',
        flexDirection: 'row',
        padding: 20,
        fontSize: 25,
        alignItems:"center",
      },
      output: {
        top: 20,
        margin: 15,
        width: '90%',
        flexDirection: 'column',
        textAlign: 'left',
        height:150,
      },  
      bottom: {
        borderTopWidth:1, borderTopColor:'gray',
        flex: 4,
        margin: 10,
        padding: 15,
      },
      ButtonL: {
        top: 20,
        justifyContent: 'center',
        left: 12,
        width: '50%',
        height: 50,
        backgroundColor: '#338168',
        borderRadius: 30
      },
      ButtonR: {
        top: 20,
        justifyContent: 'center',
        right: 12,
        width: '50%',
        height: 50,
        borderRadius: 30,
        backgroundColor: '#C13E27',
      },
  });