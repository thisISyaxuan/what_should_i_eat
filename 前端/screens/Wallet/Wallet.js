import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';

export default function Wallet() {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];
  const [selected, setSelected] = useState(formattedDate);//一開始為當下時間
  const [dateData, setDateData] = useState([]);//依日期對應的記帳資訊
  const [total, setTotal] = useState(0);//總金額
  const initial = {"data": [ /*{"cid": 1, "price": 70, "rating": 4.1, "ResName": "蘇嬤嬤湯圓", "which_meal": 3,"my_text":"好累=..= "}, {"cid": 2, "price": 80, "rating": 5, "ResName": "大仁鍋貼", "which_meal": 1}, 
                            {"cid": 3, "price": 90, "rating": 4.5, "ResName": "麥當勞", "which_meal": 2} */], 
                            "total": {"total": 0}}

  useEffect(() => {
    fetchDateData(selected); // 初始化時取得當天數據
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.costdetail}>
      <View style={[{borderBottomWidth:1,flexDirection:'row',borderBottomColor:"#C0C0C0"}]}>
      <View style={[styles.circle,{backgroundColor: item.which_meal === 0 ? '#415CA4'
                                                  : item.which_meal === 1 ? '#FFB755'
                                                  : item.which_meal === 2 ? '#338168'
                                                  : item.which_meal === 3 ? '#E2E2E2'
                                                  : 'gray', }]}>
      <Text style={styles.textty}>
        {item.which_meal === 0 ? '早餐' : item.which_meal === 1 ? '午餐' : item.which_meal === 2 ? '晚餐' : item.which_meal === 3 ? '其他' : ''}
      </Text>
      </View>
      <View style={styles.square}>
        <Text style={[styles.textsquare, { fontWeight: 'bold' }]}>{item.ResName}</Text>
        <Text>{item.rating}顆星 | {item.my_text}</Text>
      </View>
      <View style={styles.money}>
        <Text style={styles.textMoney}>$ {item.price}</Text>
      </View>
      </View>
    </TouchableOpacity>
  );

  const fetchDateData = async (date) => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        const data = {
          date: date,
        };
        const response = await fetch('http://172.20.10.2:8000/account/cost_record/', {
          method: 'POST',
          headers: {
            Authorization: `Token ${userToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        const responseData = await response.json();
        setDateData(responseData.data);
        setTotal(responseData.total.total);
      } else {
        console.log('Wallet找不到token');
        setDateData(initial.data);//之後可註解掉
        setTotal(initial.total.total);
      }
    } catch (error) {
      console.error('Error fetching date data:', error);
    }
  };

  return (
    <SafeAreaView>
      <Calendar
        onDayPress={(day) => {
          setSelected(day.dateString);
          fetchDateData(day.dateString);
        }}
        markedDates={{
          [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' },
        }}
      />
      <Text style={[{fontSize:16},{margin:5}]}>今日總支出: ${total}</Text>
      <FlatList
        data={dateData}
        renderItem={renderItem}
        keyExtractor={(item) => item.cid.toString()}
      />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  dateDataContainer: {
    margin: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  costdetail:{
    backgroundColor:'white',
    //flexDirection:'row',
    padding:10,
    
  },
  circle:{
    width:'16%',
    height:40,
    alignContent:'center',
    justifyContent:'center',
    borderRadius:50,
    padding:10,
  },
  square:{
    backgroundColor:'white',
    flex:6,
    padding:10,
  },
  money:{
    padding:10,
    flex:2,
    justifyContent: 'center'
  },
  textty:{
    fontSize:20,
    color:'white',
  },
  textsquare:{
    fontSize:16,
  },
  textMoney:{
    textAlign: 'right',
    fontSize:18,
    fontWeight:'bold',
  },
});
