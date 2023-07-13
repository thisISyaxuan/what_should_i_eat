import {StyleSheet, Text, View,TouchableOpacity,Modal,SafeAreaView} from 'react-native';
import { globalStyles } from '../../styles/global';
import React, {useState} from 'react';
export default function AddCash() {
  return (
    <SafeAreaView>
        <View><Text>記一筆</Text></View>
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
