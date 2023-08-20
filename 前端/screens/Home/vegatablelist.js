import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { View,Text,StyleSheet } from "react-native";
import { ScrollView, TextInput, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';


export default Vegatablelist = ({navigation}) =>{
    const route = useRoute()
    //const {title} = route.params
    return(
        <View style={styles.container}>
        <View style={styles.title}>
            
            <Text style={{flex: 6,textAlign: 'right', fontSize:25}}>餐廳名</Text>
            <View style={{flex:3, alignItems: 'flex-end'}}>
                <Icon name="heart" size={30} />
            </View>
            </View>

            <ScrollView horizontal showsVerticalScrollIndicator={false} style={{borderTopWidth:0.5, borderTopColor:'gray', borderBottomWidth:1, borderBottomColor:'gray', }}>
            
            <View style={{width: 275, height: 400, margin: 7, borderWidth: 1,justifyContent: 'center', alignItems: 'center'}}>
                <Text>plc</Text></View>

            <View style={{width: 275, height: 400, margin: 7, borderWidth: 1,justifyContent: 'center', alignItems: 'center'}}>
                <Text>plc</Text></View>

            <View style={{width: 275, height: 400, margin: 7, borderWidth: 1,justifyContent: 'center', alignItems: 'center'}}>
                <Text>plc</Text></View>
        </ScrollView>
    

        <View style={styles.bottom}>
            <TouchableOpacity style={styles.ButtonR}>
                <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}} onPress={() => navigation.navigate("錯誤回報")}>錯誤回報</Text>
            </TouchableOpacity>
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
        flex: 1,
        justifyContent: 'center',
      },
      ButtonR: {
        bottom: 10,
        justifyContent: 'center',
        right: 12,
        height: 50,
        borderRadius: 30,
        backgroundColor: '#C13E27',
        padding:15,
      },
  });