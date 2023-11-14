import { StyleSheet, Text, View ,TextInput, Alert} from "react-native";
import { SafeAreaView ,TouchableOpacity,Button,TouchableWithoutFeedback,Keyboard} from "react-native";
import { globalStyles } from '../../styles/global';
import { useState } from "react";
import { Switch } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AntDesign } from '@expo/vector-icons'; 

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
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  //const navigation = useNavigation();

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
  const handleConfirm = (date) => {
    setBirthday(date.toISOString().split('T')[0]); //'YYYY-MM-DD'
    setDatePickerVisibility(false);
  };
  const handleRegister = async () => {
      if (username === '' || birthday === '' || phone_number === '' || address === '' || email === '') {
        Alert.alert('提示', '欄位不可留白!');
        return;
      } else if (password === '' || verify_password === '') {
        Alert.alert('提示', '密碼和確認密碼都需要輸入!');
        return;
      } else if (password !== verify_password) {
        Alert.alert('提示', '密碼和確認密碼不一致!');
        return;
      } else if (!isChecked) {
        Alert.alert('提示', '需同意隱私政策與使用條款方可註冊!');
        return;
      } else {
        navigation.navigate('喜好勾選', { username, gender, birthday, phone_number, address, email, password, verify_password,
        });
      }
  };
  
  return (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
      <SafeAreaView style={styles.container}>
      <Text style={styles.h2text}> 註冊新帳號 </Text>
    <View style={styles.content}>

    <View style={[globalStyles.input,{flexDirection:'row', alignItems: 'center' }]}>
      <Text>帳號:</Text>
      <TextInput
        value={username}
        placeholder='  請設定您的帳號'
        onChangeText={text => setUsername(text)}
      />
    </View>
    
    <View style={[globalStyles.input, { flexDirection: 'row', alignItems: 'center' }]}>
      <Text style={styles.label}>性別:   </Text>
      <TouchableOpacity style={[styles.button, gender === 1 && styles.activeButton]} onPress={() => handleGenderSelection("男生")} >
        <Text style={[styles.buttonText, gender === '男生' && styles.activeButtonText]}>男生</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, gender === 0 && styles.activeButton]} onPress={() => handleGenderSelection("女生")} >
        <Text style={[styles.buttonText, gender === '女生' && styles.activeButtonText]}>女生</Text>
      </TouchableOpacity>
    </View>
            
    <View style={{flexDirection:'row',borderBottomWidth: 1, borderColor:'#777', padding:8, margin:10, width:250,justifyContent:'space-between', alignItems: 'center' }}> 
      <View style={{flexDirection:'row'}}>
        <Text>生日:</Text>
        <TextInput value={birthday} style={{}} placeholder='  2000-01-01' onChangeText={text => setBirthday(text)} />
      </View>
      <AntDesign name="calendar" size={24} color="black" onPress={() => setDatePickerVisibility(true) }/>
        <DateTimePickerModal isVisible={isDatePickerVisible} mode="date"  onConfirm={handleConfirm} onCancel={() => setDatePickerVisibility(false)}/>
    </View>

    <View style={[globalStyles.input,{flexDirection:'row', alignItems: 'center' }]}>
      <Text>手機:</Text>
      <TextInput placeholder="  請輸入您的行動電話" onChangeText={text => setPhone(text)} keyboardType='numeric' />
    </View>

    <View style={[globalStyles.input,{flexDirection:'row', alignItems: 'center' }]}>
      <Text>地址:</Text>
      <TextInput  placeholder='  請輸入您的地址' onChangeText={text => setAddress(text)} />
    </View>

    <View style={[globalStyles.input,{flexDirection:'row', alignItems: 'center' }]}>
      <Text>電子郵件:</Text>
      <TextInput  placeholder='  請輸入您的電子郵件' onChangeText={text => setEmail(text)} />
    </View>

    <View style={[globalStyles.input,{flexDirection:'row', alignItems: 'center' }]}>
      <Text>輸入密碼:</Text>
      <TextInput placeholder='  請設定您的密碼' onChangeText={text => setPassword(text)} />
    </View>
          
    <View style={[globalStyles.input,{flexDirection:'row', alignItems: 'center' }]}>
      <Text>確認密碼:</Text>
      <TextInput placeholder='  請確認您的密碼' onChangeText={text => setverify_Password(text)} />
    </View>

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
      <TouchableOpacity style={globalStyles.GreenBtn} onPress={handleRegister}>
        <Text style={globalStyles.BtnText}>下一頁</Text>
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
