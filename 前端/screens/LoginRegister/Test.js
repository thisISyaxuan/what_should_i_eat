//npm i expo-location --force
import { startTransition, useState,useEffect } from "react";
import { StyleSheet, TextInput, Text, View ,SafeAreaView ,TouchableOpacity,TouchableWithoutFeedback,Keyboard,Button} from "react-native";
import { Alert } from "react-native";
import * as Location from 'expo-location';

export default function Test({navigation}) {
  const [latitudeLocation,setlatitudeLocation] = useState(0);
  const [longtitudeLocation,setlongtitudeLocation] = useState(0);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('沒有允許定位');
          return;
        }
  
        try {
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
          setlatitudeLocation(location.coords.latitude.toFixed(3));
          setlongtitudeLocation(location.coords.longitude.toFixed(3));
          //setLocation(location);
        } catch (error) {
          console.log('無法獲取位置資訊，請確保定位功能已啟用並重試');
        }
      })();
    }, []);
  
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {errorMsg ? <Text>{errorMsg}</Text> : null}
      {location ? (
        <Text>
          緯度：{location.coords.latitude.toFixed(3)},{' '}
          經度：{location.coords.longitude.toFixed(3)}
        </Text>
      ) : (
        <Text>獲取位置中...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content:{
    marginTop:20,
  },
  button:{
    marginLeft: 'auto',
  },

});
