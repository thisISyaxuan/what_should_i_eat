import { StyleSheet, Text, View ,TextInput} from "react-native";
import { SafeAreaView ,TouchableOpacity,Button,TouchableWithoutFeedback,Keyboard} from "react-native";
import { globalStyles } from '../../styles/global';
import { useState } from "react";
import Login from "./Login";
export default function Register({navigation}) {
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleRegister = () => {
    const data = {
      username: username,
      gender: gender,
      birthday: birthday,
      phone: phone,
      address: address,
      email: email,
      password: password
    };

    // 使用fetch或axios進行POST請求，將data送至後端API
    fetch('http://your-django-api-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'//用jsont傳
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(responseData => {
      // 處理後端回傳的資料
      console.log(responseData);
      // 導航到Login畫面
      navigation.navigate('Login');
    })
    .catch(error => {
      console.error(error);
    });
  };
  return (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
      <SafeAreaView style={styles.container}>
      <Text style={styles.h2text}> 註冊新帳號 </Text>
    <View style={styles.content}>
    <TextInput 
            style={globalStyles.input}
            placeholder='帳號:'
            onChangeText={text => setUsername(text)}
          />
          <TextInput 
            style={globalStyles.input}
            placeholder='性別:'
            onChangeText={text => setGender(text)}
          />
          <TextInput 
            style={globalStyles.input}
            placeholder='生日:'
            onChangeText={text => setBirthday(text)}
          />
          <TextInput 
            style={globalStyles.input}
            placeholder='手機:'
            onChangeText={text => setPhone(text)}
          />
          <TextInput 
            style={globalStyles.input}
            placeholder='地址:'
            onChangeText={text => setAddress(text)}
          />
          <TextInput 
            style={globalStyles.input}
            placeholder='電子郵件:'
            onChangeText={text => setEmail(text)}
          />
          <TextInput 
            style={globalStyles.input}
            placeholder='輸入密碼:'
            onChangeText={text => setPassword(text)}
          />
          <TextInput 
            style={globalStyles.input}
            placeholder='確認密碼:'
            onChangeText={text => setConfirmPassword(text)}
          />
    <View style={globalStyles.Btn}>
      <TouchableOpacity style={globalStyles.GreenBtn} onPress={() => navigation.navigate('Login')}>
        <Text style={globalStyles.BtnText}>返回</Text>
      </TouchableOpacity>
      <TouchableOpacity style={globalStyles.RedBtn} onPress={handleRegister}>
        <Text style={globalStyles.BtnText}>註冊</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor:'#777',
    padding:8,
    width:200,
    fontSize:30,
  },
  content:{
    marginTop:20,
    justifyContent: 'center',
  },
  Btn: {
    flexDirection: 'row',
    //justifyContent: 'flex-end',
    //alignItems: 'center',
  },
});
