import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import Myacc from '../screens/Myacc/Myacc';
import 'react-native-gesture-handler';
import ResInfo from '../screens/Home/res-detail-screen';
import Errorfb from '../screens/Home/ErrorfeedBack';
import Mycollect from '../screens/Myacc/Mycollect';
import Login from '../screens/LoginRegister/Login';
import MyHistory from '../screens/Myacc/History';
import AddCashRes from '../screens/Add/AddCashRes';
import AboutMe from '../screens/Myacc/AboutMe';
import Privacy from '../screens/LoginRegister/Privacy';
import News from '../screens/Myacc/News';
import QA from '../screens/Myacc/QA';

const Stack = createStackNavigator();
const MyaccStack = () => (
  
    <Stack.Navigator independent={true}>
        <Stack.Screen name=" 帳號設定 " component={Myacc}
                      options={{
                        headerStyle: {
                        backgroundColor: '#f6d58a',
                        },
                        headerLeft: null,
                        }}
                        />
        
        <Stack.Screen name="我的收藏" component={Mycollect} 
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
        <Stack.Screen name="瀏覽紀錄" component={MyHistory} 
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
        <Stack.Screen name="錯誤回報" component={Errorfb} 
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
        <Stack.Screen name="造訪餐廳" component={AddCashRes} 
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
        <Stack.Screen name="餐廳資訊" component={ResInfo} 
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
        <Stack.Screen name="個人資訊" component={AboutMe} 
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
        <Stack.Screen name="隱私政策與使用條款" component={Privacy} options={{
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
                            }}/>
        <Stack.Screen name="最新公告" component={News} options={{
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
                            }}/>
        <Stack.Screen name="常見問題與說明" component={QA} options={{
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
                            }}/>

    </Stack.Navigator>
);

export default MyaccStack;