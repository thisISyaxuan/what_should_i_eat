import {StyleSheet, Text, View} from 'react-native';
import { globalStyles } from '../../styles/global';
export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>脂肪寶寶</Text>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    
  },
  text:{
    fontSize:50,
  }
});
