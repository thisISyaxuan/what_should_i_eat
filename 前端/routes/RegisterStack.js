import React from 'react';
import { View, SafeAreaView, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Register from '../screens/LoginRegister/Register';
import FavLabel from '../screens/LoginRegister/favLabel';
const Stack = createStackNavigator();

const HomeStack = () => (
  <NavigationContainer independent={true}>
    <Stack.Navigator>
    <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
    <Stack.Screen name="喜好勾選" component={FavLabel} 
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
    </Stack.Navigator>
  </NavigationContainer>
  
);

export default HomeStack;