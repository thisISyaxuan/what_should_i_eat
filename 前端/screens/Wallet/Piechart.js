//40行,改網址
//npm i @react-native-async-storage/async-storage --force
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text,TouchableOpacity, Modal, FlatList} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { G, Circle } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
const PiechartMoney = () => {
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const mealColors = {
    'breakfast': '#415CA4',//藍
    'lunch': '#FFB755',//淺白
    'dinner': '#6e9277',//綠
    'others': '#E2E2E2',//黃
  };
  const mealTranslation = {
    breakfast: '早餐',
    lunch: '午餐',
    dinner: '晚餐',
    others: '其他',
  };
  
  const [selectedYear, setSelectedYear] = useState(''); // 年份
  const [selectedMonth, setSelectedMonth] = useState(''); // 月份
  const [selectTest,setTestData] = useState([]);// 後端回傳的資料
  //測試用資料
  const testDatanew = [
    { 'breakfast': 341, 'lunch': 100, 'dinner': 272, 'others': 188 }
  ];

  const fetchChartData = async (year, month) => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        const data = {
          year: year,
          month:month
        };
        const response = await fetch('http://10.1.1.22:8000/account/cost_record_month/', {
          method: 'POST',
          headers: {
            Authorization: `Token ${userToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        console.log('success')
        const responseData = await response.json();
        setTestData(responseData.data);
      } else {
        console.log('Piechart找不到token');
        setTestData(testDatanew);
      }
    } catch (error) {
      console.error('Error fetching date data:', error);
  }
  };

  const handlePress = () => {
    setIsPickerVisible(false);
    fetchChartData(selectedYear, selectedMonth);
  };
  const togglePickerVisibility = () => {
    setIsPickerVisible(!isPickerVisible);
  };

  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear().toString();
    const currentMonth = (currentDate.getMonth() + 1).toString();

    setSelectedYear(currentYear);//抓取現在的年
    setSelectedMonth(currentMonth);//抓取現在的月
    // 獲取初始數據
    fetchChartData(currentYear, currentMonth);
  }, []);

  const radius = 70;
  const circleCircumference = 2 * Math.PI * radius;
  const total = selectTest.reduce((sum, item) => {return sum + Object.values(item).reduce((mealSum, value) => mealSum + value, 0);}, 0);
  const avg = parseFloat((total/30).toFixed(2));
  let currentAngle = 10;

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={[{alignItems:'center',marginTop:-30,padding:10,}]}>
            <TouchableOpacity onPress={togglePickerVisibility}>
                <Text style={[{fontWeight:'700',fontSize:26}]}>{selectedYear}年,{selectedMonth}月</Text>
            </TouchableOpacity>
        </View>
      <View style={styles.graph}>
        <View style={styles.outgraphWrapper}>
      {total === 0 ? (<View style={styles.noDataTextContainer}><Text style={styles.noDataText}>無圖表資訊 </Text></View>) : (
          <View style={styles.graphWrapper}>
             <Svg height="160" width="160" viewBox="0 0 180 180">
                <G rotation={-90} originX="90" originY="90">
                {selectTest.length > 0 && Object.keys(selectTest[0]).map((meal, index) => {
                const value = selectTest[0][meal]; // 獲取每餐的值
                const percentage = (value / total) * 100;
                const strokeDashoffset = circleCircumference - (circleCircumference * percentage) / 100;
                const angle = (value / total) * 360;
                
                const circleStyle = {
                cx: '50%',
                cy: '50%',
                r: radius,
                stroke: mealColors[meal], // 使用每餐作為 stroke 顏色的 key
                fill: 'transparent',
                strokeWidth: '40',
                strokeDasharray: circleCircumference,
                strokeDashoffset: strokeDashoffset,
                rotation: currentAngle,
                originX: '90',
                originY: '90',
                };
              currentAngle += angle;
              return <Circle key={index} {...circleStyle} />;})}
              </G>
            </Svg>
            <Text style={styles.label}>${total}</Text>
          </View>)}
          <Text style={styles.labelavg}>平均每天消費:{avg} 元</Text>
          </View>

          <View style={styles.detail}>
            {selectTest.length > 0 &&Object.keys(selectTest[0]).map((meal, index) => (
              <View key={index} style={[{ flexDirection: 'row', alignItems: 'center', padding: 10 }]}>
                <View style={[styles.square, { backgroundColor: mealColors[meal] }]} />
                <Text style={[{ fontSize: 16 }]}>{mealTranslation[meal]}</Text>
              </View>
            ))}
          </View>
      </View>
      

      <View style={styles.text}>
        {selectTest.length > 0 &&Object.keys(selectTest[0]).map((meal, index) => {
          const value = selectTest[0][meal]; // 獲取每餐的值
          const percentage = parseFloat((value / total) * 100).toFixed(2);
          return (
            <View key={index} style={[styles.costDetail,{justifyContent: 'space-between'}]}>
              <View style={[{flexDirection:'row',alignItems:'center'}]}>
                <View style={[styles.square, { backgroundColor: mealColors[meal] }]} />
                <Text style={[{ fontSize: 20,marginLeft: 10, }]}>{mealTranslation[meal]}</Text>
              </View>
              <Text style={[{ fontSize: 20}]}>{isNaN(percentage) ? '0.00 % ' : percentage + '%'}</Text>
              
              <Text style={[{ fontSize: 20}]}>{value}元</Text>
            </View>
        );})}
      </View>

      {isPickerVisible && (
      <TouchableOpacity style={[{ alignItems: 'flex-end',}]} onPress={handlePress}>
        <View style={styles.button}>
          <Text style={styles.buttontext}>完成</Text>
        </View>
      </TouchableOpacity>
      )}
      {isPickerVisible && (
      <View>
        
        <View style={styles.selectone}>
          <Picker
            selectedValue={selectedYear}
            style={{ height: 50, width: 180 }}
            mode="dropdown"
            onValueChange={(itemValue) => setSelectedYear(itemValue)}
          > 
          {['2023','2024'].map(item => (
            <Picker.Item
              label={`${item}年`}
              value={item}
              key={item}
            />
          ))}
          </Picker>
          <Picker
            selectedValue={selectedMonth}
            style={{ height: 50, width: 110 }}
            mode="dropdown"
            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
          >
          {['1','2','3','4','5','6','7','8','9','10','11','12'].map(item => (
            <Picker.Item
              label={`${item}月`}
              value={item}
              key={item}
            />
          ))}
          </Picker>
        </View>


      </View>
      )}
    
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  selectone:{
    flexDirection: 'row',
    padding:10,
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
  },
  detail:{
    flex:2,
    padding:10,
    justifyContent: 'center',
  },
  square: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  costDetail:{ 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 10,
    borderBottomWidth:1,
    borderBottomColor:'#C0C0C0',
    width:350,
  },
  graph:{
    padding:10,
    flexDirection:'row',
    borderBottomWidth:1,
    borderBottomColor:'#c0c0c0',
  },
  text:{
    padding:20,
  },
  graphWrapper: {
    justifyContent:'center',
    alignItems: 'center',
  },
  outgraphWrapper:{
    flex:5,
    //padding:5,
  },
  label: {
    position: 'absolute',
    textAlign:'center',
    fontWeight: '700',
    fontSize: 16,
  },
  labelavg: {
    //position: 'absolute',
    paddingTop:10,
    fontWeight: '700',
    fontSize: 16,
  },
  button: {
    padding: 5,
    width:80,
  },
  buttontext: {
    color: '#415CA4',
    textAlign: 'center',
    fontSize:22,
  },
  noDataText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
  noDataTextContainer:{
    flex:5,
    padding:20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PiechartMoney;
