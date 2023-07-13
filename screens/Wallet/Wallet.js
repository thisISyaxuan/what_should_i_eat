import {StyleSheet, Text, View,TouchableOpacity,Modal,SafeAreaView} from 'react-native';
import { globalStyles } from '../../styles/global';
import React, {useState} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
export default function Wallet() {
  const [selected, setSelected] = useState('');
  return (
    <SafeAreaView>
    <Calendar
      onDayPress={day => {
        setSelected(day.dateString);
      }}
      markedDates={{
        [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
      }}
    />
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
  }
});
