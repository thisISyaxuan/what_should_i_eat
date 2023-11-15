//第42 43行 註解掉
import { startTransition, useState,useEffect } from "react";
import { StyleSheet, TextInput, Text, View ,SafeAreaView ,TouchableOpacity,TouchableWithoutFeedback,Keyboard,Button} from "react-native";
import { globalStyles } from '../../styles/global';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
export default function Login({navigation}) {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  useEffect(() => {
    checkTokenAndNavigate();
  }, []);

  const checkTokenAndNavigate = async () => {
    try {
      //await AsyncStorage.removeItem('userToken');
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        navigation.navigate('ButtomTabStack');
      }else{
        console.log('login介面沒抓到token');
      }
    } catch (error) {
      console.error('Error checking token:', error);
    }
  };

  const handleLogin = () => {
    if (username === '') {
      Alert.alert('提示', '請輸入帳號!');
      return;
    } else if (password === '') {
      Alert.alert('提示', '請輸入密碼!');
      return;
    }
  
    const data = {
      username: username,
      password: password
    };
  
    try {
       //navigation.navigate('ButtomTabStack');
       //return;
      fetch('http://172.20.10.2:8000/api/Login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(responseData => {
        console.log(responseData)
          if (responseData.success === true) {
            AsyncStorage.setItem('userToken', responseData.token)
              .then(() => {
                navigation.navigate('ButtomTabStack', { userToken: responseData.token });
              })
              .catch(error => {
                console.error('Error saving token:', error);
                Alert.alert('儲存token失敗!');
              });
          } else {
            Alert.alert('註冊失敗');
          }
        })
        .catch(error => {
          console.error(error);
          Alert.alert('你是不是連結沒改','資料傳至後端失敗!');
        });
    } catch (error) {
      console.error(error);
      Alert.alert('沒進到try');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
    <SafeAreaView style={styles.container}>

      <View style={styles.content}>
      <Text style={styles.h2text}> 歡迎使用! </Text>

      <TextInput
        style={globalStyles.input}
        placeholder='帳號:'
        onChangeText={text => setUsername(text)}
        />
      <TextInput
        style={globalStyles.input}
        placeholder='密碼:'
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
        />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ForgotPWD')}>
        <Text>忘記密碼嗎?</Text>
      </TouchableOpacity>
      <Text>{'\n'}</Text>

      <View style={globalStyles.Btn}>
      <TouchableOpacity style={globalStyles.YellowBtn} onPress={() => navigation.navigate('Register')}>
        <Text style={globalStyles.BtnText}>註冊</Text>
      </TouchableOpacity>
      <TouchableOpacity style={globalStyles.GreenBtn} onPress={handleLogin}>
        <Text style={globalStyles.BtnText}>登入</Text>
      </TouchableOpacity>
      </View>
      </View>

    </SafeAreaView>
    </TouchableWithoutFeedback>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  h2text:{
    textAlign:"center",
    borderWidth: 1,
    borderColor:'#777',
    padding:8,
    fontSize:30,
  },

  content:{
    marginTop:20,
  },
  button:{
    marginLeft: 'auto',
  },

});