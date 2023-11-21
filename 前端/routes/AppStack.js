import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import 'react-native-gesture-handler';
import AuthStack from './AuthStack';
import ButtomTabStack from './ButtomTabStack';
const Stack = createStackNavigator();
const AppStack = () => {
    const navigationRef = useNavigationContainerRef();
    return(
        <NavigationContainer independent={true} ref={navigationRef}>
            <Stack.Navigator initialRouteName="Auth">
                <Stack.Screen name="AuthStack" component={AuthStack} options={{headerShown: false}} />
                <Stack.Screen name="ButtomTabStack" component={ButtomTabStack} options={{headerShown:false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
  

export default AppStack;
