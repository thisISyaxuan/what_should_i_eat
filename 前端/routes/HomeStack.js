import React from 'react';
import { View, SafeAreaView, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Home from '../screens/Home/Home';
import ResInfo from '../screens/Home/res-detail-screen';
import Vegatablelist from '../screens/Home/vegatablelist';
import 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchRes from '../screens/Home/Search';
//import Test from '../screens/Home/Test';
import Errorfb from '../screens/Home/ErrorfeedBack';
import Mycollect from '../screens/Myacc/Mycollect';
const Stack = createStackNavigator();

const HomeStack = () => (
  <NavigationContainer independent={true}>
    <Stack.Navigator>
    
        <Stack.Screen name="餐廳探索" component={Home} 
                      options={({ navigation }) => ({
                        headerStyle: {
                        backgroundColor: '#f6d58a',
                        },
                        headerLeft: () => (
                          <TouchableOpacity onPress={() => navigation.navigate('搜尋條件')}>
                            <Ionicons name="options-outline" size={35} color="black" style={{ marginLeft: 10 }} />
                          </TouchableOpacity>
                        ),
                        headerRight: () => (
                          <TouchableOpacity onPress={() => navigation.navigate('我的收藏')}>
                            <Ionicons name="heart-circle-outline" size={35} color="black" style={{ marginRight: 10 }} />
                          </TouchableOpacity>
                        ),
                      })} />
        <Stack.Screen name="搜尋條件" component={SearchRes} 
                        options={{
                          headerStyle: {
                          backgroundColor: '#f6d58a',
                          },
                          headerBackTitle: ' ',
                          headerBackTitleStyle: {
                              color: 'black', 
                              fontSize: 16,
                          },
                          headerTintColor: 'black',
                          }}
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
        <Stack.Screen name="我的收藏" component={Mycollect} 
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
        <Stack.Screen name="菜單" component={Vegatablelist} 
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
                        <Stack.Screen name="餐廳資訊" component={ResInfo} 
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