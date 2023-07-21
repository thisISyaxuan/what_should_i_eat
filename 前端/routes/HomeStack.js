import React from 'react';
import { View, SafeAreaView, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Home from '../screens/Home/Home';
import ResInfo from '../screens/Home/res-detail-screen';
import 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchRes from '../screens/Home/Search';
import Errorfb from '../screens/Home/ErrorfeedBack';
const Stack = createStackNavigator();

const HomeStack = () => (
  <NavigationContainer independent={true}>
    <Stack.Navigator>
        <Stack.Screen name="餐廳探索" component={Home} 
                      options={{
                        headerStyle: {
                        backgroundColor: '#f6d58a',
                        },
                        headerLeft: () => (
                          <TouchableOpacity>
                            <Ionicons name="menu-outline" size={24} color="black" style={{ marginLeft: 10 }} />
                          </TouchableOpacity>
                        ),
                        }} />
        <Stack.Screen name="SearchRes" component={SearchRes} 
                        options={{headerShown: false}} 
        />
        <Stack.Screen name="錯誤回報" component={Errorfb} 
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
        <Stack.Screen name="resInfo" component={ResInfo} 
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

export default HomeStack;