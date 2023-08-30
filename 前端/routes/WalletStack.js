import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import Wallet from '../screens/Wallet/Wallet';
import ResInfo from '../screens/Home/res-detail-screen';
import 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PieChartMoney from '../screens/Wallet/Piechart';
import MyCompo from '../screens/Wallet/test';
import { TouchableOpacity } from 'react-native';
const Stack = createStackNavigator();
const WalletStack = () => (
    
  <NavigationContainer independent={true}>
    <Stack.Navigator>
      <Stack.Screen name="我的錢包" component={Wallet} 
                      options={({ navigation }) => ({
                        headerStyle: {
                        backgroundColor: '#f6d58a',
                        },
                        headerLeft:null,
                        headerRight: () => (
                          <TouchableOpacity onPress={() => navigation.navigate('月支出')}>
                            <Ionicons name="pie-chart" size={35} color="black" style={{ marginRight: 10 }} />
                          </TouchableOpacity>
                        ),
                        })} />
    <Stack.Screen name="月支出" component={MyCompo} 
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
    <Stack.Screen name="我的圖表" component={PieChartMoney} 
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