import {StyleSheet, Text, View} from 'react-native';
import { globalStyles } from '../../styles/global';
import { useNavigation } from "@react-navigation/native";
import EventList from '../../component/event-list';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function Home() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <EventList/>
      <TouchableOpacity onPress={() => navigation.navigate('SearchRes')}>
        <Ionicons name="menu-outline" size={24} color="black" style={{ marginLeft: 10 }} />
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
      },
      text:{
        fontSize:50,
      }
});
