import React from 'react';
import { View, SafeAreaView, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Baby from '../screens/Baby/Baby';
import 'react-native-gesture-handler';
import BabyCollect from '../screens/Baby/BabyCollect';
import Mycoin from '../screens/Myacc/Mycoin';
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
        <Stack.Screen name="任務清單" component={Mycoin} 
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