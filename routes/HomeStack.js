import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import Home from '../screens/Home/Home';
import ResInfo from '../screens/Home/res-detail-screen';
import 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const HomeStack = () => (
    
  <NavigationContainer independent={true}>
    <Stack.Navigator>
        <Stack.Screen name="餐廳探索" component={Home} 
                      options={{
                        headerStyle: {
                        backgroundColor: '#f6d58a',
                        },
                        headerLeft: null,
                        }} />
                      
        <Stack.Screen name="resInfo" component={ResInfo} 
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

export default HomeStack;