import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import Wallet from '../screens/Wallet/Wallet';
import ResInfo from '../screens/Home/res-detail-screen';
import 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const WalletStack = () => (
    
  <NavigationContainer independent={true}>
    <Stack.Navigator>
        <Stack.Screen name="我的錢包" component={Wallet} 
                      options={{
                        headerStyle: {
                        backgroundColor: '#f6d58a',
                        },
                        headerLeft: null,
                        }} />
    </Stack.Navigator>
  </NavigationContainer>
  
);

export default WalletStack;