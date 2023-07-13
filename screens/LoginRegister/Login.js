import { startTransition, useState } from "react";
import { StyleSheet, TextInput, Text, View ,SafeAreaView ,TouchableOpacity,TouchableWithoutFeedback,Keyboard,Button} from "react-native";
import { globalStyles } from '../../styles/global';
import CustomInput from "../../customComponent/customInput";
import CustomButton from "../../customComponent/customButton";
export default function Login({navigation}) {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
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
      <Text style={styles.h2text}> 歡迎使用! </Text>

      <TextInput 
        style={globalStyles.input}
        placeholder='帳號:'/>
      <TextInput 
        style={globalStyles.input}
        placeholder='密碼:'
        secureTextEntry={true}/>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ForgotPWD')}>
        <Text>忘記密碼嗎?</Text>
      </TouchableOpacity>
      <Text>{'\n'}</Text>
      
      <View style={globalStyles.Btn}>
      <TouchableOpacity style={globalStyles.GreenBtn} onPress={() => navigation.navigate('Register')}>
        <Text style={globalStyles.BtnText}>註冊</Text>
      </TouchableOpacity>
      <TouchableOpacity style={globalStyles.RedBtn} onPress={() => navigation.navigate('ButtomTabStack')}>
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
