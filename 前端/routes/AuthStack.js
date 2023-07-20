import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/LoginRegister/Login';
import ForgotPWD from '../screens/LoginRegister/ForgotPWD';
import SendPWD from '../screens/LoginRegister/SendPWD';
import Register from '../screens/LoginRegister/Register';
import 'react-native-gesture-handler';
import ButtomTabStack from './ButtomTabStack';
import SearchRes from '../screens/Home/Search';

const Stack = createStackNavigator();

const AuthStack = () => (
  <NavigationContainer independent={true}>
    <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} 
                      options={{headerShown: false}} />
        <Stack.Screen name="ForgotPWD" component={ForgotPWD} options={{headerShown: false}}/>
        <Stack.Screen name="SendPWD" component={SendPWD} options={{headerShown: false}}/>
        <Stack.Screen name="Register" component={Register} options={{headerShown:false}}/>
        <Stack.Screen name="ButtomTabStack" component={ButtomTabStack} 
                      options={{headerShown:false}}/>
    </Stack.Navigator>
  </NavigationContainer>
  
);

export default AuthStack;
