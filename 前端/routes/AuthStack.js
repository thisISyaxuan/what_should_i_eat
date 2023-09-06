import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/LoginRegister/Login';
import ForgotPWD from '../screens/LoginRegister/ForgotPWD';
import SendPWD from '../screens/LoginRegister/SendPWD';
import 'react-native-gesture-handler';
import ButtomTabStack from './ButtomTabStack';
import Privacy from '../screens/LoginRegister/Privacy';
import RegisterStack from './RegisterStack';

const Stack = createStackNavigator();

const AuthStack = () => (
  <NavigationContainer independent={true}>
    <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} 
                      options={{headerShown: false}} />
        <Stack.Screen name="ForgotPWD" component={ForgotPWD} options={{headerShown: false}}/>
        <Stack.Screen name="SendPWD" component={SendPWD} options={{headerShown: false}}/>
        <Stack.Screen name="RegisterStack" component={RegisterStack} 
                      options={{headerShown:false}}/>
        <Stack.Screen name="隱私政策與使用條款" component={Privacy} options={{
                            headerShown: true,
                            headerStyle: {
                                backgroundColor: 'gray',
                            },
                            headerBackTitle: ' ',
                            headerBackTitleStyle: {
                                color: 'black', 
                                fontSize: 16,
                            },
                            headerTintColor: 'black'
                            }}/>
        <Stack.Screen name="ButtomTabStack" component={ButtomTabStack} 
                      options={{headerShown:false}}/>
    </Stack.Navigator>
  </NavigationContainer>
  
);

export default AuthStack;
