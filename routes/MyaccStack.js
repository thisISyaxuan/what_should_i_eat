import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import Myacc from '../screens/Myacc/Myacc';
import EventDetailScreen from '../screens/Home/res-detail-screen';
import 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Mycoin from '../screens/Myacc/Mycoin';

const Stack = createStackNavigator();
const MyaccStack = () => (
    
  <NavigationContainer independent={true}>
    <Stack.Navigator>
        <Stack.Screen name="帳號設定" component={Myacc} 
                      options={{
                        headerStyle: {
                        backgroundColor: '#f6d58a',
                        },
                        headerLeft: null,
                        }} />
        <Stack.Screen name="我的脂肪幣" component={Mycoin} 
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

export default MyaccStack;