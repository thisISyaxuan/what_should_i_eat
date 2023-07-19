import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { View,Text,StyleSheet } from "react-native";

export default ResInfo = ({navigation}) =>{
    const route = useRoute()
    const {eventId,title,description} = route.params
    return(
        <View style={StyleSheet.screen }>
            <Text style={{fontSize:23}}>{title}</Text>
            <Text style={{fontSize:20}}>{description}</Text>
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
  });