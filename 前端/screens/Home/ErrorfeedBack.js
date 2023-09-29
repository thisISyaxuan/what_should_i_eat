import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet,TouchableWithoutFeedback,Keyboard } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from "@react-navigation/native";
import { globalStyles } from '../../styles/global';
import { Alert } from 'react-native';
const Errorfb = () => {
  const route = useRoute()
  const {rID,rName,rMap_Score,rPhone,rAddress,open,collect,distance,labelID} = route.params
  const [phone, setPhone] = useState(rPhone);
  const [address, setAddress] = useState(rAddress);
  const [businessHours, setBusinessHours] = useState('');
  const [menuFile, setMenuFile] = useState('');
  const [otherInfo, setOtherInfo] = useState('');
  const handleSubmit = () => {
    Alert.alert('提交成功!');
    navigation.goBack();
  };
  const ClearALL = () => {
    console.log('全部清空');
    setPhone(rPhone);
    setAddress(rAddress);
    setBusinessHours('');
    setOtherInfo('');
  };
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
      <SafeAreaView style={styles.container}>
      <View style={styles.rowfirst}>
        <Text style={styles.label}>店家名稱</Text>
        <View style={styles.dropdown}><Text>{rName}</Text></View>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>電話</Text>
        <View style={[styles.inputContainer]}>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={text => setPhone(text)}
            keyboardType='numeric'
            placeholder="請輸入更正資訊，無則免填"
            textAlignVertical="center" // 讓文字垂直置中
          />
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>地址</Text>
        <View style={[styles.inputContainer]}>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={text => setAddress(text)}
            placeholder="請輸入更正資訊，無則免填"
            textAlignVertical="center" // 讓文字垂直置中
          />
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>營業時間</Text>
        <View style={[styles.inputContainer]}>
          <TextInput
            style={styles.input}
            value={businessHours}
            onChangeText={text => setBusinessHours(text)}
            placeholder="請輸入更正資訊，無則免填"
            textAlignVertical="center" // 讓文字垂直置中
          />
        </View>
      </View>
      <Text style={styles.label}>菜單更新</Text>
      <View style={styles.rowfile}>
        
        <TouchableOpacity style={styles.fileButton}>
          <Text style={[styles.buttonText, { color: 'white' }]}>選擇檔案</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>其他資訊</Text>
        <View style={[styles.inputContainer, {height: 4 * 40 }]}>
          <TextInput
            style={styles.input}
            value={otherInfo}
            onChangeText={text => setOtherInfo(text)}
            placeholder="輸入更正資訊，無則免填"
            multiline
            textAlignVertical="center" // 讓文字垂直置中
          />
        </View>
      </View>
      <View style={globalStyles.Btn}>
      <TouchableOpacity style={[globalStyles.YellowBtn,{paddingHorizontal: 50}]} onPress={ClearALL}>
        <Text style={[styles.buttonText, { color: 'white' }]}>恢復</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[globalStyles.GreenBtn,{paddingHorizontal: 50}]} onPress={handleSubmit}>
        <Text style={[styles.buttonText, { color: 'white' }]}>提交</Text>
      </TouchableOpacity>
      </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  row: {
    marginBottom: 20,
  },
  rowfile:{
    marginBottom: 20,
    alignItems:'center',
  },
  rowfirst: {
    flexDirection: 'column',
    marginTop: -40,
    marginBottom:20,
  },
  label: {
    fontSize: 14,
    
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 5,
  },
  dropdown: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    height: 40,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderColor:'#C0C0C0',
  },
  input: {
    flex: 1,
    color: 'black',
  },
  fileButton: {
    backgroundColor: '#338168',
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width:"30%",
  },
});

export default Errorfb;
