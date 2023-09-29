import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Test from '../screens/LoginRegister/Test';
import Login from '../screens/LoginRegister/Login';
import ForgotPWD from '../screens/LoginRegister/ForgotPWD';
import SendPWD from '../screens/LoginRegister/SendPWD';
import 'react-native-gesture-handler';
import ButtomTabStack from './ButtomTabStack';
import Privacy from '../screens/LoginRegister/Privacy';
import Register from '../screens/LoginRegister/Register';
import FavLabel from '../screens/LoginRegister/favLabel';

const Stack = createStackNavigator();

const AuthStack = () => (
  <NavigationContainer independent={true}>
    <Stack.Navigator name="AuthStack">
        <Stack.Screen name="Login" component={Login} 
                      options={{headerShown: false}} />
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
        <Stack.Screen name="隱私政策與使用條款" component={Privacy} options={{
                            headerShown: true,
                            headerStyle: {
                                backgroundColor: '#C0C0C0',
                            },
                            headerBackTitle: ' ',
                            headerBackTitleStyle: {
                                color: 'black', 
                                fontSize: 16,
                            },
                            headerTintColor: 'black'
                            }}/>
        <Stack.Screen name="ForgotPWD" component={ForgotPWD} options={{headerShown: false}}/>
        <Stack.Screen name="SendPWD" component={SendPWD} options={{headerShown: false}}/>
        <Stack.Screen name="ButtomTabStack" component={ButtomTabStack} 
                      options={{headerShown:false}}/>
    </Stack.Navigator>
  </NavigationContainer>
  
);

export default AuthStack;
