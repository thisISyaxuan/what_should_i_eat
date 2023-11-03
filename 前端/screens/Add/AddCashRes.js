//第13行userToken註解拿掉
//第55行註解拿掉
//第67行改api
import AsyncStorage from "@react-native-async-storage/async-storage";
import {StyleSheet, Text,TextInput, View,TouchableOpacity,Modal,SafeAreaView,TouchableWithoutFeedback,Keyboard, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import { globalStyles } from '../../styles/global';
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

export default function AddCashRes() {
  const navigation = useNavigation()
  const[senddate,setdate] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [Class, SetClass] = useState(0);
  const [Price, SetPrice] = useState("");
  const [Rating, SetRating] = useState(5.0);

  const [MyText, SetMyText] = useState("");
  const [Input,SetInput] = useState('');
  const route = useRoute()
  const {rName,rMap_Score,rPhone,rAddress,open,collect,distance,rID,rLabel} = route.params

  useEffect(() => {//當前時間
    const now = new Date();// 獲取當前時間
    const formattedDate = `${now.getFullYear()} 年 ${now.getMonth() + 1} 月 ${now.getDate()} 日 ${getDayOfWeek(now.getDay())}`;
    const senddate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
    setCurrentDate(formattedDate);
    setdate(senddate);
  }, []);
  const getDayOfWeek = (dayIndex) => {//顯示出來
    const daysOfWeek = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];
    return daysOfWeek[dayIndex];
  };

  const handleClassSelection = (selectedClass) => {//類別
    if (selectedClass === '早餐') {
      SetClass(0);
    } else if (selectedClass === '午餐') {
      SetClass(1);
    }else if (selectedClass === '晚餐') {
      SetClass(2);
    }else if (selectedClass === '其他') {
      SetClass(3);
    }
  }
  const ClearAllData=() => {
    SetClass(0);
    SetPrice("");
    SetRating(5.0);
    SetMyText("");
    SetInput("");
  }
  const handleAddMoney = async () => {//送出表單
        try {
          if (Price === "") {
            Alert.alert('提示', '請輸入金額!');
            return;
          }
          const userToken = await AsyncStorage.getItem('userToken');
          const data = {
            ResName: Input,//店名
            date: senddate,//日期
            which_meal: Class,//類別(是數字0~3)
            price: Price,//價錢
            rating: Rating.toFixed(1),
            my_text: MyText,//(備註)
          };
      
          const response = await fetch('http://192.168.0.2:8000/account/cost/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${userToken}`, // 添加 Token 到 Header
            },
            body: JSON.stringify(data),
          });
          if (response.ok) {
            Alert.alert('訊息', '儲存成功!', [
                {
                    text: 'OK',
                    onPress: () => {
                      navigation.goBack();
                    },
                },
            ]);
          }
        } catch (error) {
          console.error('Error sending request:', error);
        }
  };

  return (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
    <SafeAreaView style={styles.container}>
        <View>
          <View style={styles.title}><Text style={{fontSize:20}}>{currentDate}</Text></View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',alignContent:'center',margin:20}}>
            <Icon name="cutlery" size={20} color={'#C0C0C0'} style={{ marginLeft: 4,marginRight: 4 }} />
            <Text style={{ fontSize:24,fontWeight:'bold'}}> {rName}</Text>
          </View>
             
          <View style={styles.class}>
              <TouchableOpacity style={[styles.button, Class === 0 && styles.activeButton]} onPress={() => handleClassSelection("早餐")}>
              <Text style={[styles.buttonText, Class === '早餐' && styles.activeButtonText]}>早餐</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.button, Class === 1 && styles.activeButton]} onPress={() => handleClassSelection("午餐")}>
              <Text style={[styles.buttonText, Class === '午餐' && styles.activeButtonText]}>午餐</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.button, Class === 2 && styles.activeButton]} onPress={() => handleClassSelection("晚餐")}>
              <Text style={[styles.buttonText, Class === '晚餐' && styles.activeButtonText]}>晚餐</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.button, Class === 3 && styles.activeButton]} onPress={() => handleClassSelection("其他")}>
              <Text style={[styles.buttonText, Class === '其他' && styles.activeButtonText]}>其他</Text></TouchableOpacity>
          </View>
          
          <View style={styles.dollar}>
            <Icon name="dollar" size={20} color={'#F6D58A'} /><Text style={{fontSize:20}}>  金額:  </Text>
            <TextInput style={styles.dollarInput} onChangeText={SetPrice} value={Price} placeholder='金額輸入' keyboardType='numeric'/></View>
              
          <View style={styles.OO}><View style={styles.MyStar}>
              <Icon name="star" size={20} color={'#F6D58A'} /><Text style={{fontSize:20}}> 評價:  </Text></View>
          
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider} minimumValue={0} maximumValue={5} step={0.1} value={Rating}
              onValueChange={value => SetRating(value)}
              minimumTrackTintColor="#F6D58A" maximumTrackTintColor="gray" thumbTintColor="#F6D56E"/>
            <Text style={styles.sliderValue}>{Rating.toFixed(1)} 顆星</Text>
          </View>
        </View>
        
        <View style={styles.Textinput}>
          <View style={styles.Textlabel}>
            <Icon name="file-text" size={20} color={'#F6D58A'} /><Text style={{fontSize:20}}> 備註欄: </Text></View>
            <TextInput style={styles.TextLine} onChangeText={SetMyText} value={MyText} placeholder='說點什麼吧!' multiline={true}/>
        </View>  
        
        <View style={styles.bottom}>
        <TouchableOpacity style={globalStyles.RedBtn} onPress={ClearAllData}><Text style={globalStyles.BtnText}>清空</Text></TouchableOpacity>
        <TouchableOpacity style={globalStyles.GreenBtn} onPress={handleAddMoney}><Text style={globalStyles.BtnText}>儲存</Text></TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title:{
    padding:10,
    alignItems: 'center',
  },
  res:{
    padding:10,
    borderRadius: 50,
    borderWidth:1,
    alignItems: 'center',
    marginBottom:10,
    marginTop:20,
    flex:1
  },
  class:{
    padding:10,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  button: {
    padding: 15,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: '#DAD9D6',
    backgroundColor: '#EFEEEC',
    marginRight: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
  },
  activeButton: {
    backgroundColor: '#F6D58A',
    borderColor: '#F6D58A',
  },
  activeButtonText: {
    color: 'white',
  },
  dollar:{
    padding:10,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dollarInput:{
    borderBottomWidth:1, 
    borderBottomColor:'#EFEEEC',
    padding:10,
    fontSize: 20,
    width: 150,
  },
  OO:{
    padding:10,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:20,
  },
  MyStar: {
    flexDirection: 'row',
    flex:1,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex:3,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  sliderValue: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 14,
  },
  Textinput: {
    padding:10,
    borderTopWidth:1, 
    borderBottomWidth:1, 
    borderTopColor:'#EFEEEC',
    borderBottomColor:'#EFEEEC',
    flexDirection: 'column',
    height: 250,
  }, 
  Textlabel:{
    flexDirection: 'row',
    marginBottom:20,
  },
  TextLine:{
    fontSize:20, 
    flex: 2, 
    height:50,
    padding:10,
  },
  bottom: {
    marginBottom:10,
    flexDirection: 'row',
    justifyContent: 'space-between', 
    padding: 20
  },
  clearButton: {
    backgroundColor: 'lightblue',
    padding: 5,
    borderRadius: 5,
  },
});
