import React from 'react';
import { View, SafeAreaView, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Baby from '../screens/Baby/Baby';
import 'react-native-gesture-handler';
import BabyCollect from '../screens/Baby/BabyCollect';
import Mycoin from '../screens/Myacc/Mycoin';
import AboutMe from '../screens/Myacc/AboutMe';
import RandomRes from '../screens/Baby/RandomRes';
const Stack = createStackNavigator();
const BabyStack = () => (

    <Stack.Navigator independent={true}>
        <Stack.Screen name=" 我的精靈 " component={Baby} 
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
        <Stack.Screen name="為您推薦" component={RandomRes} 
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

  
);

export default BabyStack;