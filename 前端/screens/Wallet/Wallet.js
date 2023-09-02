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

  useEffect(() => {
    fetchDateData(selected); // 初始化時取得當天數據
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.costdetail}>
      <View style={styles.circle}>
        <Text style={styles.textty}>{item.which_meal}</Text>
      </View>
      <View style={styles.square}>
        <Text style={[styles.textsquare, { fontWeight: 'bold' }]}>{item.ResName}</Text>
        <Text>{item.rating}顆星 | {item.my_text}</Text>
      </View>
      <View style={styles.money}>
        <Text style={styles.textMoney}>$ {item.price}</Text>
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
        const response = await fetch('http://192.168.0.2:8000/api/getCostDetail/', {
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
        console.log('找不到token');
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
      <FlatList
        data={dateData}
        renderItem={renderItem}
        keyExtractor={(item) => item.cid.toString()}
      />
      <Text>總支出: ${total}</Text>
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
    flexDirection:'row',
    padding:10,
  },
  circle:{
    width:40,
    height:40,
    alignContent:'center',
    justifyContent:'center',
    backgroundColor:'green',
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
    //alignContent:'flex-end',
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
