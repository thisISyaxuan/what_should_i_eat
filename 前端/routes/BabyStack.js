import React from 'react';
import { View, SafeAreaView, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Baby from '../screens/Baby/Baby';
import ResInfo from '../screens/Home/res-detail-screen';
import 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchRes from '../screens/Home/Search';
import Errorfb from '../screens/Home/ErrorfeedBack';
import timelimit from '../screens/Baby/timelimit';
import BabyCollect from '../screens/Baby/BabyCollect';
const Stack = createStackNavigator();
const BabyStack = () => (
  <NavigationContainer independent={true}>
    <Stack.Navigator>
        <Stack.Screen name="我的精靈" component={Baby} 
                      options={{
                        headerStyle: {
                        backgroundColor: '#f6d58a',
                        },
                        headerLeft: null,
                        }} />
        <Stack.Screen name="限時翻倍" component={timelimit} 
                        options={{
                            headerShown: true,
                            headerStyle: {
                                backgroundColor: '#f6d58a',
                            },
                            headerBackTitle: ' ',
                            headerBackTitleStyle: {
                                color: 'black', 
                                fontSize: 16,
                            },
                            headerTintColor: 'black'
                            }} />
        <Stack.Screen name="精靈圖鑑" component={BabyCollect} 
                        options={{
                            headerShown: true,
                            headerStyle: {
                                backgroundColor: '#f6d58a',
                            },
                            headerBackTitle: ' ',
                            headerBackTitleStyle: {
                                color: 'black', 
                                fontSize: 16,
                            },
                            headerTintColor: 'black'
                            }} />

    </Stack.Navigator>
  </NavigationContainer>
  
);

export default BabyStack;