import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BabyCollect from '../screens/Baby/BabyCollect';
import Myacc from '../screens/Myacc/Myacc';

const Stack = createStackNavigator();

const BabyCollectStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="BabyCollect" component={BabyCollect} />
        <Stack.Screen name="Myacc" component={Myacc} />
    </Stack.Navigator>
);

export default BabyCollectStack;

