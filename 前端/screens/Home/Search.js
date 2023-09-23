import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import AsyncStorage from "@react-native-async-storage/async-storage";

const SearchRes = ({navigation}) => {
  //const { userPos } = route.params;
  const [sortOption, setSortOption] = useState('系統推薦');
  const [isOpen, setIsOpen] = useState('全部');//TimeFilter 是否營業
  const [isMeal, setIsMeal] = useState('全部');//MealFilter 全部、正餐、非正餐
  const [category, setCategory] = useState('全部');//labelFilter
  const [distance, setDistanceSort] = useState(false);//DistanceSort
  const [rating, setRatingSort] = useState(false);//Rating Sort
  const [userPos,setuserPos] = useState([23.01,120.01]);
  
  /*const resdata = {
    "success": {
        "rName": ["古記素食烘焙","守匠日式甜點專賣",],
        "rMap_Score": [3.7,4.9,],
        "rPhone": ["0492998417","0492991771",],
        "rAddress": ["545南投縣埔里鎮南盛街112號","545南投縣埔里鎮慈恩街15號",],
        "open": [-1,-1,],
        "distance": [0.65,0.65,],
        "rID": [174,237,]
    }
  }*/
  
  const resetToDefault = () => {//按下預設按鈕
    setSortOption('系統推薦');  // 修改預設排序方式為距離近到遠
    setIsOpen('全部');  // 營業時間預設為全部
    setIsMeal('全部');  // 餐點預設為全部
    setCategory('全部'); // 類別預設為全部
    setDistanceSort(false);
    setRatingSort(false);
  };

  useEffect(() => {//初始化
    const checkLocationPermission = async () => {//定位功能有沒有被啟用
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('沒開啟定位');
        }else{
            const location = await Location.getCurrentPositionAsync({});
            setuserPos([location.coords.latitude,location.coords.longitude]);//存經緯度
        }
      };
    checkLocationPermission();
}, []);

  const searchRestaurants = async () => {//按下搜尋按鈕
    try {
      const userToken = await AsyncStorage.getItem('userToken');//先抓token
      if (userToken) {
        const data = {//要傳給後端的資料
          TimeFilter: isOpen === '營業中' ? true : false,
          MealFilter: isMeal === '全部' ? -1 : (isMeal === '正餐' ? 1 : 0),
          LabelFilter: category,
          userPos:userPos,
          DistanceSort: distance,
          RatingSort: rating
        };
        console.log(data);

        const response = await fetch('http://192.168.0.2:8000/api/Searchapi/', {//改連結
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${userToken}`, // 添加 Token 到 Header
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();//後端回傳資料
      console.log(responseData); 
      /* 假設後端回傳的資料在responseData*/
      //把資料傳到餐廳探索
      navigation.navigate('餐廳探索',{responseData});
      }else{
      console.log('抓不到token')
      
      const dataToSend = {
        TimeFilter: isOpen === '營業中' ? true : false,
        MealFilter: isMeal === '全部' ? -1 : (isMeal === '正餐' ? 1 : 0),
        LabelFilter: category,userPos:userPos,DistanceSort: distance,RatingSort: rating };
      console.log(dataToSend);
      navigation.navigate('餐廳探索',{dataToSend});
      
      }
    } catch (error) {
      console.error('Error sending request:', error);
    }
    }

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.header}>
        <Text style={{fontSize: 18}}>搜尋選項</Text>
        <TouchableOpacity onPress={resetToDefault} style={styles.defaultButton}>
          <Text style={styles.defaultButtonText}>預設</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.optionContainer}>
      <Text style={styles.optionTitle}>排序方式</Text>
      <View style={styles.sortButtonsContainer}>
        <TouchableOpacity
          style={[styles.sortButton, sortOption === '系統推薦' ? styles.activeSortButton : null]}
          onPress={() => {
            setSortOption('系統推薦');
            setDistanceSort(false); // 重置排序狀態
            setRatingSort(false);
          }}>
          <Text style={[styles.sortButtonText, sortOption === '系統推薦' ? styles.activeSortButtonText : null]}>系統推薦</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortButton, sortOption === '距離近到遠' ? styles.activeSortButton : null]}
          onPress={() => {
            setSortOption('距離近到遠');
            setDistanceSort(true); // 設定為距離排序
            setRatingSort(false);  // 重置評分排序
          }}>
          <Text style={[styles.sortButtonText, sortOption === '距離近到遠' ? styles.activeSortButtonText : null]}>距離近到遠</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortButton, sortOption === '評分高到低' ? styles.activeSortButton : null]}
          onPress={() => {setSortOption('評分高到低');
            setDistanceSort(false); // 重置距離排序
            setRatingSort(true);   // 設定為評分排序
          }}>
          <Text style={[styles.sortButtonText, sortOption === '評分高到低' ? styles.activeSortButtonText : null]}>評分高到低</Text>
        </TouchableOpacity>
      </View>
    </View>

      <View style={styles.optionContainer}>
        <Text style={styles.optionTitle}>營業時間</Text>
        <View style={styles.isOpenButtonsContainer}>
          <TouchableOpacity style={[styles.isOpenButton, isOpen === '全部' ? styles.activeIsOpenButton : null]} onPress={() => setIsOpen('全部')}>
            <Text style={[styles.isOpenButtonText, isOpen === '全部' ? styles.activeIsOpenButtonText : null]}>全部</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.isOpenButton, isOpen === '營業中' ? styles.activeIsOpenButton : null]} onPress={() => setIsOpen('營業中')}>
            <Text style={[styles.isOpenButtonText, isOpen === '營業中' ? styles.activeIsOpenButtonText : null]}>營業中</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.optionContainer}>
      <Text style={styles.optionTitle}>餐點</Text>
      <View style={styles.isMealButtonsContainer}>
        <TouchableOpacity
          style={[styles.isMealButton, isMeal === '全部' ? styles.activeIsMealButton : null]}
          onPress={() => setIsMeal('全部')}>
          <Text style={[styles.isMealButtonText, isMeal === '全部' ? styles.activeIsMealButtonText : null]}>全部</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.isMealButton, isMeal === '正餐' ? styles.activeIsMealButton : null]}
          onPress={() => setIsMeal('正餐')}>
          <Text style={[styles.isMealButtonText, isMeal === '正餐' ? styles.activeIsMealButtonText : null]}>正餐</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.isMealButton, isMeal === '非正餐' ? styles.activeIsMealButton : null]}
          onPress={() => setIsMeal('非正餐')}>
          <Text style={[styles.isMealButtonText, isMeal === '非正餐' ? styles.activeIsMealButtonText : null]}>非正餐</Text>
        </TouchableOpacity>
      </View>
    </View>

    <View style={styles.optionContainer}>
      <Text style={styles.optionTitle}>類別</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={value => setCategory(value)}
          mode="dropdown"
          style={styles.picker}
        >
          {[
            '全部', '米食', '麵食', '中式', '西式', '日式', '越式', '美式', '客家料理', '泰式', '韓式', '港式', 
            '速食', '素食', '早餐', '冰品', '飲料', '咖啡', '甜點', '鹹點', '湯品', '滷味', '炸物', '烤物', '鍋物', 
            '健康餐', '無菜單料理', '寵物餐廳', '酒', '吃到飽餐廳'
          ].map(option => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
      </View>
    </View>

      <TouchableOpacity style={styles.searchButton} onPress={searchRestaurants}><Text style={styles.buttonText}>搜尋</Text></TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  defaultButton: {
    padding: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#F6D58A',  // 淺黃色背景
  },
  defaultButtonText: {
    color: '#333',  // 深灰色文字
  },
  resetText: {
    fontSize: 16,
    color: '#F6D58A',
  },
  optionContainer: {
    marginBottom: 20,
  },
  optionTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  sortButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sortButton: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  activeSortButton: {
    backgroundColor: '#F6D58A',
  },
  sortButtonText: {
    fontSize: 14,
  },
  activeSortButtonText: {
    color: '#fff',
  },
  isOpenButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  isOpenButton: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  activeIsOpenButton: {
    backgroundColor: '#F6D58A',
  },
  isOpenButtonText: {
    fontSize: 14,
  },
  activeIsOpenButtonText: {
    color: '#fff',
  },
  isMealButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  isMealButton: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  activeIsMealButton: {
    backgroundColor: '#F6D58A',
  },
  isMealButtonText: {
    fontSize: 14,
  },
  activeIsMealButtonText: {
    color: '#fff',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  searchButton: {
    padding: 14,
    backgroundColor: '#F6D58A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default SearchRes;