import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FavoriteListScreen from '../screens/Favor/FavoriteListScreen';
import RatingHighToLowScreen from '../screens/Favor/RatingHighToLowScreen';
import DistanceNearToFarScreen from '../screens/Favor/DistanceNearToFarScreen';
import FreshScreen from '../screens/Favor/FreshScreen';

const Tab = createMaterialTopTabNavigator();

const FavorTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="已收藏名單" component={FavoriteListScreen} />
      <Tab.Screen name="評分高->低" component={RatingHighToLowScreen} />
      <Tab.Screen name="距離近->遠" component={DistanceNearToFarScreen} />
      <Tab.Screen name="待嘗鮮" component={FreshScreen} />
    </Tab.Navigator>
  );
};

export default FavorTabNavigator;
