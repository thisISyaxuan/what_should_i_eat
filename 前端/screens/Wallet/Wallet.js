import {StyleSheet, Text, View,TouchableOpacity,Modal,SafeAreaView} from 'react-native';
import { globalStyles } from '../../styles/global';
import React, {useState} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Wallet() {
  const [selected, setSelected] = useState('');
  const [money, setMoney] = useState(null);
  const [rating, setRating] = useState(null);

  const fetchDateData = async (date) => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        const data = {
          date: date
        };
        const response = await fetch('http://192.168.0.2:8000/api/getCostDetail/', {
          method: 'POST',
          headers: {
            'Authorization': `Token ${userToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const responseData = await response.json();
        setMoney(responseData.money);
        setRating(responseData.rating);
      }else{
        console.log('無token')
      }
    } catch (error) {
      console.error('Error fetching date data:', error);
    }
  };

  return (
    <SafeAreaView>
    <Calendar
      onDayPress={day => {
        setSelected(day.dateString);
        fetchDateData(day.dateString);
      }}
      markedDates={{
        [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
      }}
    />

    {/*
    <View style={styles.dateDataContainer}>
        <Text>Money: {money !== null ? money : 'N/A'}</Text>
        <Text>Rating: {rating !== null ? rating : 'N/A'}</Text>
      </View>
    */}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    
  },
  text:{
    fontSize:50,
  },
  dateDataContainer: {
    margin: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
});
