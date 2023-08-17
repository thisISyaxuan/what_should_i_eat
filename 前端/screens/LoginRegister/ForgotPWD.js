import { startTransition, useState } from "react";
import { StyleSheet, TextInput, Text, View ,SafeAreaView ,TouchableOpacity,TouchableWithoutFeedback,Keyboard,Button} from "react-native";
import { globalStyles } from '../../styles/global';
import CustomInput from "../../customComponent/customInput";
import CustomButton from "../../customComponent/customButton";
export default function ForgotPWD({navigation}) {
  const [username,setUsername] = useState('');
  const onLoginPressed = () => {
    console.warn("Sign in");
  }
  const onForgotPassWordPressed = () => {
    console.warn("Forgot Password");
  }
  const onSignInFacebook = () => {
    console.warn('Facebook');
  }
  const onSignInGoogle = () => {
    console.warn('Google');
  }
  const onSignInApple = () => {
    console.warn('Apple');
  }
  const onSignUpPressed = () => {
    console.warn("Sign up");
  }
  return (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
    <SafeAreaView style={styles.container}>
      
      <View style={styles.content}>
      <Text style={styles.h2text}> 忘記密碼 </Text>

      <Text>請輸入註冊時的Email,方便我們傳送驗證碼給您</Text>

      <TextInput 
        style={globalStyles.input}
        placeholder='註冊的Email'/>
      <Text>{'\n'}</Text>
      
      <View style={globalStyles.Btn}>
      <TouchableOpacity style={globalStyles.YellowBtn} onPress={() => navigation.navigate('Login')}>
        <Text style={globalStyles.BtnText}>返回</Text>
      </TouchableOpacity>
      <TouchableOpacity style={globalStyles.GreenBtn} onPress={() => navigation.navigate('SendPWD')}>
        <Text style={globalStyles.BtnText}>傳送驗證碼</Text>
      </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.registerButtonText} onPress={() => navigation.navigate('Register')}>註冊新帳號</Text>
      </TouchableOpacity>
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
  registerButton: {
    padding:10,
    alignSelf: 'center',
  },
  registerButtonText: {
    fontSize: 18,
    textDecorationLine: 'underline',
  },
  
});
