import { StyleSheet, Text, View ,TextInput} from "react-native";
import { SafeAreaView ,TouchableOpacity,Button,TouchableWithoutFeedback,Keyboard} from "react-native";
import { globalStyles } from '../../styles/global';
import { useState } from "react";
import { Switch } from "react-native-gesture-handler";
export default function Register({navigation}) {
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState(1);
  const [birthday, setBirthday] = useState('');
  const [phone_number, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verify_password, setverify_Password] = useState('');
  const [isChecked, setIsChecked] = useState(true);

  const handleSwitchToggle = () => {
    setIsChecked(!isChecked);
  };
  const handleGenderSelection = (selectedGender) => {
    if (selectedGender === '男生') {
      setGender(1);
    } else if (selectedGender === '女生') {
      setGender(0);
    }
  };
  const handleRegister = async () => {
    try {
      const data = {
        username: username,
        gender: gender,
        birthday: birthday,
        phone_number: phone_number,
        address: address,
        email: email,
        password: password,
        verify_password: verify_password
      };
  
      // 使用fetch或axios進行POST請求，將data送至後端API
      const response = await fetch('http://192.168.0.3:8000/api/Register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'//用json傳
        },
        body: JSON.stringify(data)
      });
  
      const responseData = await response.json();
  
      // 處理後端回傳的資料
      if (responseData.success === true) {
        // 儲存後端返回的 token
        await AsyncStorage.setItem('userToken', responseData.token);
        // 導航到其他畫面
        navigation.navigate('Login'); // 假設是導航到主頁面
      } else {
        // 如果success為false，可能是註冊失敗，做相應處理
        console.log('註冊失敗');
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
          <View style={[globalStyles.input, { flexDirection: 'row', alignItems: 'center' }]}>
              <Text style={[styles.label, { color: '#C0C0C0' }]}>性別:   </Text>
              <TouchableOpacity
                  style={[styles.button, gender === 1 && styles.activeButton]}
                  onPress={() => handleGenderSelection("男生")}
              >
              <Text style={[styles.buttonText, gender === '男生' && styles.activeButtonText]}>男生</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  style={[styles.button, gender === 0 && styles.activeButton]}
                  onPress={() => handleGenderSelection("女生")}
              >
              <Text style={[styles.buttonText, gender === '女生' && styles.activeButtonText]}>女生</Text>
              </TouchableOpacity>
            </View>

           
          <TextInput 
            style={globalStyles.input}
            placeholder='生日:  2000-01-01'
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
            onChangeText={text => setverify_Password(text)}
          />
        <View style={styles.agree}>
        <Switch value={isChecked}
                onValueChange={handleSwitchToggle}
                trackColor={{ false: 'gray', true: '#338168' }} //顏色
                thumbColor={isChecked ? 'white' : 'white'} // 圓圈顏色
                style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }} //大小
        />
        <Text>我同意</Text>
        <TouchableOpacity onPress={() => navigation.navigate('隱私政策與使用條款')}>
          <Text style={styles.linkb}>隱私政策與使用條款</Text>
        </TouchableOpacity>
      </View>

    <View style={globalStyles.Btn}>
      <TouchableOpacity style={globalStyles.YellowBtn} onPress={() => navigation.navigate('Login')}>
        <Text style={globalStyles.BtnText}>返回</Text>
      </TouchableOpacity>
      <TouchableOpacity style={globalStyles.GreenBtn} onPress={handleRegister} disabled={!isChecked}>
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
  agree:{
    flexDirection: 'row',
    padding:15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkb:{
    color:'blue',
    textDecorationLine: 'underline',
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
  },
  button: {
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 10,
  },
  buttonText: {
    fontSize: 14,
    color: 'black',
  },
  activeButton: {
    backgroundColor: '#F6D58A',
  },
  activeButtonText: {
    color: 'white',
  },
});
