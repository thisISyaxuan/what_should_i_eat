import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import Wallet from '../screens/Wallet/Wallet';
import Addcash from '../screens/Add/AddCash';
import Myacc from '../screens/Myacc/Myacc';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import MyaccStack from './MyaccStack';
import WalletStack from './WalletStack';
import Baby from './BabyStack';

const Tab = createBottomTabNavigator();
export default function ButtomTabStack() {
  const navigationRef = React.useRef();

  const handleTabPress = (e) => {
    const currentRoute = navigationRef.current?.getCurrentRoute();
    if (currentRoute && e.data.route.key === currentRoute.key) {
      navigationRef.current?.reset({
        index: 0,
        routes: [{ name: currentRoute.name }],
      });
    }
  };

  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === '餐廳探索') {
              iconName = focused ? 'restaurant' : 'restaurant-outline';
            } else if (route.name === '我的錢包') {
              iconName = focused ? 'receipt' : 'receipt-outline';
            } else if (route.name === '我的精靈') {
              iconName = focused ? 'happy' : 'happy-outline';
            } else if (route.name === '帳號設定') {
              iconName = focused ? 'settings' : 'settings-outline';
            } else if (route.name === '記一筆') {
              iconName = focused ? 'add' : 'add-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
        listeners={{
          tabPress: handleTabPress,
        }}
      >
        <Tab.Screen name="餐廳探索" component={HomeStack} 
                    options={{
                      headerStyle: {
                        backgroundColor: '#f6d58a',
                      },
                      headerShown: false,
                    }}
        />
        <Tab.Screen name="我的錢包" component={WalletStack}
                    options={{
                      headerStyle: {
                        backgroundColor: '#f6d58a',
                      },
                      headerShown: false,
                    }}
        />
        <Tab.Screen name="記一筆" component={Addcash}
                    options={{
                      headerStyle: {
                        backgroundColor: '#f6d58a',
                      },
                    }}
        />
        <Tab.Screen name="我的精靈" component={Baby}
                    options={{
                      headerStyle: {
                        backgroundColor: '#f6d58a',
                      },
                      headerShown: false,
                    }}
        />
        <Tab.Screen name="帳號設定" component={MyaccStack}
                    options={{
                      headerStyle: {
                        backgroundColor: '#f6d58a',
                      },
                      headerShown: false,
                      unmountOnBlur: true,
                    }}

        />
      </Tab.Navigator>
  );
}



/*
import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Wallet from '../screens/Wallet/Wallet';
import Addcash from '../screens/Add/AddCash';
import Myacc from '../screens/Myacc/Myacc';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import MyaccStack from './MyaccStack';
import WalletStack from './WalletStack';
import Baby from './BabyStack';

const Tab = createBottomTabNavigator();

export default function ButtomTabStack() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === '餐廳探索') {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          } else if (route.name === '我的錢包') {
            iconName = focused ? 'receipt' : 'receipt-outline';
          } else if (route.name === '我的精靈') {
            iconName = focused ? 'happy' : 'happy-outline';
          } else if (route.name === '帳號設定') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === '記一筆') {
            iconName = focused ? 'add' : 'add-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
      >
        <Tab.Screen name="餐廳探索" component={HomeStack} 
                    options={{
                      headerStyle: {
                      backgroundColor: '#f6d58a',
                      },
                      headerShown: false,
                      }}/>
        <Tab.Screen name="我的錢包" component={WalletStack}
                    options={{
                      headerStyle: {
                      backgroundColor: '#f6d58a',
                      },
                      headerShown: false,
                      }} />
        <Tab.Screen name="記一筆" component={Addcash}
                    options={{
                      headerStyle: {
                        backgroundColor: '#f6d58a',
                      },
                      
                    }}
                    />
        <Tab.Screen name="我的精靈" component={Baby}
                    options={{
                      headerStyle: {
                      backgroundColor: '#f6d58a',
                      },
                      headerShown: false,
                      }}/>
        <Tab.Screen name="帳號設定" component={MyaccStack}
                    options={{
                      headerStyle: {
                      backgroundColor: '#f6d58a',
                      },
                      headerShown: false,
                      }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
*/
