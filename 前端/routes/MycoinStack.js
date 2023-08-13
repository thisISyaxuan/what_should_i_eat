import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Mycoin from '../screens/Mycoin'; // Mycoin 頁面
import Mycoinmonth from '../screens/Mycoin-month'; // Mycoin-month 頁面
import Mycoinspecial from '../screens/Mycoin-special'; // Mycoin-special 頁面

const Tab = createMaterialTopTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="本日任務" component={Mycoin} />
      <Tab.Screen name="本月任務" component={Mycoinmonth} />
      <Tab.Screen name="特別任務" component={Mycoinspecial} />
    </Tab.Navigator>
  );
};

export default MyTabs;
