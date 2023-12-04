import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import { link } from '../../data/apiLink';
import { color } from 'react-native-elements/dist/helpers';
import { EvilIcons } from '@expo/vector-icons'
import { Alert } from 'react-native';

export default function Wallet() {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];
  const [selected, setSelected] = useState(formattedDate);//一開始為當下時間
  const [dateData, setDateData] = useState([]);//依日期對應的記帳資訊
  const [total, setTotal] = useState(0);//總金額
  const [isdelete,setisdelete] = useState(false);
  const initial = {"data": [ {"cid": 1, "price": 70, "rating": 4.1, "ResName": "蘇嬤嬤湯圓", "which_meal": 3,"my_text":"好累=..= "},
                             {"cid": 2, "price": 80, "rating": 5, "ResName": "大仁鍋貼", "which_meal": 1}, 
                             {"cid": 3, "price": 90, "rating": 4.5, "ResName": "麥三", "which_meal": 2},
                             {"cid": 8, "price": 90, "rating": 4.5, "ResName": "麥四", "which_meal": 1},
                             {"cid": 5, "price": 90, "rating": 4.5, "ResName": "麥五", "which_meal": 2},
                             {"cid": 6, "price": 90, "rating": 4.5, "ResName": "麥六", "which_meal": 0},
                             {"cid": 7, "price": 90, "rating": 4.5, "ResName": "麥七", "which_meal": 2} ], 
                            "total": {"total": 0}}

  useEffect(() => {
    fetchDateData(selected); // 初始化時取得當天數據
  }, []);
  



  const handleDelete = (cid) => {
    // 顯示確認刪除的提示框
    Alert.alert( "確認刪除", "你確定要刪除這筆資料嗎？",
      [
        { text: "取消", style: "cancel" },
        { text: "確定",
          onPress: async () => {
            try {
              //console.log(cid)
              //傳給後端資料
              const updatedData = dateData.filter(item => item.cid !== cid);
              //console.log("按下的數字為:",updatedData)
              const userToken = await AsyncStorage.getItem('userToken');
              if (userToken) {
                const response = await fetch(link.deletecash, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${userToken}`,
                  },
                });
                const responseData = await response.json();//後端回傳資料
                if (responseData.success === true){
                    await updateDataSomehow(updatedData);
                  }else{
                    Alert.alert("刪除失敗，請再試一次!")
                  }
              }
            } catch (error) {
              console.error('Error deleting data:', error);
            }
          }
        }
      ],
      { cancelable: false }
    );
  };

  const updateDataSomehow = async (updatedData) => {
    // 在這裡實現實際的更新操作，可以是 API 請求或者是本地狀態更新
    // 這裡只是一個示例，實際情況需要根據你的應用邏輯進行修改
    setDateData(updatedData);
  };


  const renderItem = ({ item }) => (
    <View style={styles.costdetail}>
      <View style={[{flexDirection:'row',alignItems:'center'}]}>
      <View style={[styles.circle,{backgroundColor: item.which_meal === 0 ? '#415CA4'
                                                  : item.which_meal === 1 ? '#FFB755'
                                                  : item.which_meal === 2 ? '#338168'
                                                  : item.which_meal === 3 ? '#E2E2E2'
                                                  : 'gray', }]}>
      <Text style={styles.textty}>
        {item.which_meal === 0 ? '早餐' : item.which_meal === 1 ? '午餐' : item.which_meal === 2 ? '晚餐' : item.which_meal === 3 ? '其他' : ''}
      </Text>
      </View>
      <View style={styles.square}>
        <Text style={[styles.textsquare, { fontWeight: 'bold' }]}>{item.ResName}</Text>
        <Text>{item.rating}顆星 | {item.my_text}</Text>
      </View>
      <View style={styles.money}>
        <Text style={styles.textMoney}>$ {item.price}</Text>
      </View>
      <View style={{flexDirection:'row'}}>
      {isdelete ? (
      <TouchableOpacity style={{margin:10,width:30,justifyContent:'center',alignItems:'center',flexDirection:'row'}}
                        onPress={() => handleDelete(item.cid)}>
        <EvilIcons name="trash" size={30} color="red" />
      </TouchableOpacity>
      ) : (null)
      }

      </View>
      </View>
    </View>
  );


  const fetchDateData = async (date) => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        const data = {
          date: date,
        };
        const response = await fetch(link.wallet, {
          method: 'POST',
          headers: {
            Authorization: `Token ${userToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        const responseData = await response.json();
        setDateData(responseData.data);
        setTotal(responseData.total.total);
      } else {
        console.log('Wallet找不到token');
        setDateData(initial.data);//之後可註解掉
        setTotal(initial.total.total);
      }
    } catch (error) {
      console.error('Error fetching date data:', error);
    }
  };

  return (
    <SafeAreaView style={{justifyContent:'space-between'}}>
      <Calendar
        onDayPress={(day) => {
          setSelected(day.dateString);
          fetchDateData(day.dateString);
        }}
        markedDates={{
          [selected]: { selected: true, selectedColor: '#338168' },
        }}
        theme={{
          arrowColor: '#338168', // 顏色
          todayTextColor: '#338168', // 今天的顏色
        }}
      />
      <View>
      <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:50}}>
      <Text style={[{fontSize:16},{margin:5}]}>今日總支出：${total}</Text>
      
        <TouchableOpacity style={{padding:5,marginRight:5}} onPress={() => setisdelete(prevState => !prevState)}>
          {isdelete ? (
              <Text style={{fontSize:16,color:'black'}}>取消編輯</Text>
            ) : (
              <Text style={{fontSize:16,color:'red'}}>編輯</Text>
            ) 
        }
        </TouchableOpacity>
      </View>
      <View style={{height:240}}>
      <FlatList
        data={dateData}
        renderItem={renderItem}
        keyExtractor={(item) => item.cid.toString()}
        showsVerticalScrollIndicator={false} // 隱藏垂直滾動條（根據需要）
        style={{ flexGrow: 0 }}
      />
      </View>
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  dateDataContainer: {
    margin: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  costdetail:{
    backgroundColor:'white',
    //flexDirection:'row',
    padding:10,
    alignContent:'center',
    borderBottomWidth:1,
    borderBottomColor:"#C0C0C0"
  },
  circle:{
    width:'16%',
    height:40,
    alignContent:'center',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:50,
    padding:5,
  },
  square:{
    backgroundColor:'white',
    flex:6,
    padding:10,
  },
  money:{
    padding:10,
    flex:2,
    justifyContent: 'center'
  },
  textty:{
    fontSize:20,
    color:'white',
  },
  textsquare:{
    fontSize:16,
  },
  textMoney:{
    textAlign: 'right',
    fontSize:18,
    fontWeight:'bold',
  },
});
