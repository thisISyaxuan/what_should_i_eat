import { StyleSheet, Text, View ,TextInput} from "react-native";
import { SafeAreaView ,TouchableOpacity,Button,TouchableWithoutFeedback,Keyboard} from "react-native";
import { globalStyles } from '../../styles/global';
export default function Register({navigation}) {
  return (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
      <SafeAreaView style={styles.container}>
      <Text style={styles.h2text}> 註冊新帳號 </Text>
    <View style={styles.content}>
    <TextInput 
        style={globalStyles.input}
        placeholder='帳號:'/>
      <TextInput 
        style={globalStyles.input}
        placeholder='性別:'/>
        <TextInput 
        style={globalStyles.input}
        placeholder='生日:'/>
      <TextInput 
        style={globalStyles.input}
        placeholder='手機:'/>
        <TextInput 
        style={globalStyles.input}
        placeholder='地址:'/>
      <TextInput 
        style={globalStyles.input}
        placeholder='電子郵件:'/>
      <TextInput 
        style={globalStyles.input}
        placeholder='輸入密碼:'/>
      <TextInput 
        style={globalStyles.input}
        placeholder='確認密碼:'/>



    <View style={globalStyles.Btn}>
      <TouchableOpacity style={globalStyles.GreenBtn} onPress={() => navigation.navigate('Login')}>
        <Text style={globalStyles.BtnText}>返回</Text>
      </TouchableOpacity>
      <TouchableOpacity style={globalStyles.RedBtn} >
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
