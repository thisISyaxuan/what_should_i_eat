import {StyleSheet, Text, View} from 'react-native';
import { globalStyles } from '../../styles/global';
import { useNavigation } from "@react-navigation/native";
import EventList from '../../component/event-list';
export default function Home() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <EventList/>
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
