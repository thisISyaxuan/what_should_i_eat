import { startTransition, useState } from "react";
import { StyleSheet, TextInput, Text, View ,SafeAreaView ,TouchableOpacity,TouchableWithoutFeedback,Keyboard,Button} from "react-native";
import { globalStyles } from '../../styles/global';
import CustomInput from "../../customComponent/customInput";
import CustomButton from "../../customComponent/customButton";
export default function Login({navigation}) {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  
  const handleLogin = () => {
    const data = {
      username: username,
      password: password
    };

    /*

    // 使用fetch axios進行POST請求，將data送至後端API
    fetch('http://192.168.0.3:8000/api/Login/', {//改成api連結
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(responseData => {
      // 處理後端回傳的資料
      console.log(responseData);
      // 導航到其他畫面
      if (responseData.success === true) {
        // 儲存後端返回的 token
        AsyncStorage.setItem('userToken', responseData.token);
      
        // 導航到其他畫面
        navigation.navigate('ButtomTabStack'); // 假設是導航到主頁面
      } else {
        // 如果success為false，可能是登入失敗，做相應處理
        console.log('登入失敗');
      }
    })
    .catch(error => {
      console.error(error);
    });*/
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
      <TouchableOpacity style={globalStyles.GreenBtn} onPress={/*handleLogin()*/() => navigation.navigate('ButtomTabStack')}>
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
