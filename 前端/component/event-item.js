import { useNavigation } from "@react-navigation/native";
import {StyleSheet,TouchableOpacity,Text,View} from "react-native";

export default EventItem = ({id,title,description}) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("resInfo",{eventId: id,title,description})}>
          <View style={styles.rowContainer}>
            <View style={styles.pic}><Text>pic</Text></View>
            <View style={styles.cardContent}>
              <Text style={styles.restitle}>{title}</Text>
              <Text>{description}</Text>
            </View>
          </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    card: {
      borderWidth:1,
      borderColor:'#c5c5c5',
      borderRadius:10,
      marginVertical:5,
      padding:30,
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
    cardContent: {
      marginLeft: 10,
    },
    restitle:{
      fontSize:23,
      fontWeight:"bold",
      marginBottom:15,
    },
  });