import {StyleSheet, Text,TextInput, View,TouchableOpacity,Modal,SafeAreaView,TouchableWithoutFeedback,Keyboard} from 'react-native';
import { globalStyles } from '../../styles/global';
import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

export default function AddCash() {
  const [Price, SetPrice] = useState("");
  const [Name, SetName] = useState("");
  const [Class, SetClass] = useState("");
  const [Rating, SetRating] = useState("");
  const [currentDate, setCurrentDate] = useState('');
  useEffect(() => {
    // 獲取當前時間
    const now = new Date();
    const formattedDate = `${now.getFullYear()} 年 ${now.getMonth() + 1} 月 ${now.getDate()} 日 ${getDayOfWeek(now.getDay())}`;
    setCurrentDate(formattedDate);
  }, []);

  const getDayOfWeek = (dayIndex) => {
    const daysOfWeek = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];
    return daysOfWeek[dayIndex];
  };
  return (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
    <SafeAreaView style={styles.container}>
        <View>
          <View style={styles.title}><Text style={{fontSize:20}}>{currentDate}</Text></View>

      <View style={styles.input}>
        <Text style={{fontSize:20, flex: 2}}>金額</Text>
        <TextInput style={{fontSize:20, flex: 2, textAlign: 'right' }}
          onChangeText={SetPrice}
          value={Price}
          placeholder='金額輸入'
        />
      </View>  

      <View style={styles.input}>
        <Text style={{fontSize:20, flex: 2}}>店家</Text>
        <TextInput style={{fontSize:20, flex: 2, textAlign: 'right' }}
          onChangeText={SetPrice}
          value={Price}
          placeholder='店家輸入'
        />
      </View>  

      <View style={styles.input}>
        <Text style={{fontSize:20, flex: 2}}>類別</Text>
        <TextInput style={{fontSize:20, flex: 2, textAlign: 'right' }}
          onChangeText={SetPrice}
          value={Price}
          placeholder='類別輸入'
        />
      </View>  

      <View style={styles.input}>
        <Text style={{fontSize:20, flex: 2}}>評價</Text>
        <TextInput style={{fontSize:20, flex: 2, textAlign: 'right' }}
          onChangeText={SetPrice}
          value={Price}
          placeholder='評價輸入'
        />
      </View>  

      <TextInput style={{fontSize:20, alignSelf: 'flex-start'}}
          onChangeText={SetPrice}
          value={Price}
          placeholder='寫點備註吧'
        />

      <View style={styles.bottom}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 20}}>
        <TouchableOpacity style={styles.ButtonR}>
          <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>清空</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.ButtonL}>
          <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>儲存</Text>
        </TouchableOpacity>
        </View>
      </View>
        </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    padding: 10,
    alignItems: 'center',
  },
  input: {
    borderBottomWidth:1, borderBottomColor:'gray',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 50,
  },  
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    alignContent: 'space-between'
  },
  ButtonL: {
    justifyContent: 'center',
    padding: 10,
    width: '45%',
    height: 60,
    backgroundColor: '#338168',
    borderRadius: 20
  },
  ButtonR: {
    justifyContent: 'center',
    padding: 10,
    width: '45%',
    height: 60,
    borderRadius: 20,
    backgroundColor: '#C13E27',
  }
});