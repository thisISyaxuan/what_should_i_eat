import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { View,Text,StyleSheet } from "react-native";
import { ScrollView, TextInput, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';


export default ResInfo = ({navigation}) =>{
    const route = useRoute()
    const {eventId,title,description} = route.params
    return(
        /*
        <View style={styles.container}>
            <View style={styles.screen }>
            <Text style={{fontSize:23}}>{title}</Text>
            <Text style={{fontSize:20}}>{description}</Text>
        </View>*/
        <View style={styles.container}>
        <View style={styles.title}>
            
            <Text style={{flex: 6,textAlign: 'right', fontSize:25}}>{title}</Text>
            <View style={{flex:3, alignItems: 'flex-end'}}>
                <Icon name="heart" size={30} />
            </View>
            </View>

            <ScrollView horizontal showsVerticalScrollIndicator={false} style={{borderTopWidth:0.5, borderTopColor:'gray', borderBottomWidth:1, borderBottomColor:'gray', }}>
            
            <View style={{width: 275, height: 250, margin: 7, borderWidth: 1,justifyContent: 'center', alignItems: 'center'}}>
                <Text>plc</Text>
            </View>

            <View style={{width: 275, height: 250, margin: 7, borderWidth: 1,justifyContent: 'center', alignItems: 'center'}}>
                <Text>plc</Text>
            </View>

            <View style={{width: 275, height: 250, margin: 7, borderWidth: 1,justifyContent: 'center', alignItems: 'center'}}>
                <Text>plc</Text>
            </View>
        </ScrollView>
    
        <View style={styles.output}>
            <View style={{flexDirection: 'row', top: -10, height: 50, flex: 2}}>
                <View style={{ justifyContent: 'center', margin: 7 }}>
                    <Icon name="circle" size={10} color={'green'} />
                </View>
                <Text style={{fontSize:18}}>營業中 11:00~21:00</Text>
            </View>
            
            <Text style={{fontSize:18, borderBottomWidth:1.5, borderBottomColor:'gray', height: 30}}>評分:</Text>
            <Text style={{fontSize:18, borderBottomWidth:1.5, borderBottomColor:'gray', height: 30}}>距離:</Text>
            <Text style={{fontSize:18, borderBottomWidth:1.5, borderBottomColor:'gray', height: 30}}>電話:</Text>
            <Text style={{fontSize:18, borderBottomWidth:1.5, borderBottomColor:'gray', height: 30}}>地址:{description}</Text>
        </View> 

        <View style={styles.bottom}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10, top: -20}}>
            <TouchableOpacity style={styles.ButtonR}>
                <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}} onPress={() => navigation.navigate("錯誤回報")}>錯誤回報</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ButtonL}>
                <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}} onPress={() => navigation.navigate("菜單")}>查看菜單</Text>
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