import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";

const SearchRes = () => {
  const [radius, setRadius] = useState(1);
  const [rating, setRating] = useState({ min: 0.0, max: 5.0 });
  const [reviewCount, setReviewCount] = useState(0);
  const [sortOption, setSortOption] = useState('個人化推薦');
  const [isOpen, setIsOpen] = useState('全部');
  const [category, setCategory] = useState('全部');
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>搜尋條件</Text>
    </View>
    <View style={styles.button}>
      <TouchableOpacity style={[styles.button, { alignSelf: 'flex-end' }]}>
        <Text style={styles.buttonText}>預設</Text>
      </TouchableOpacity>
    </View>
      <View style={styles.optionContainer}>
        <Text style={styles.optionTitle}>搜尋半徑</Text>
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={10}
            step={1}
            value={radius}
            onValueChange={value => setRadius(value)}
            minimumTrackTintColor="#F6D58A" 
            maximumTrackTintColor="gray" 
            thumbTintColor="#F6D56E"
          />
          <Text style={styles.sliderValue}>{radius} 公里</Text>
        </View>
      </View>
      <View style={styles.optionContainer}>
        <Text style={styles.optionTitle}>評價</Text>
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={0.0}
            maximumValue={rating.max}
            step={0.1}
            value={rating.min}
            onValueChange={value => setRating({ ...rating, min: value })}
            minimumTrackTintColor="gray" 
            maximumTrackTintColor="#F6D58A" 
            thumbTintColor="#F6D56E"
          />
          <Slider
            style={styles.slider}
            minimumValue={rating.min}
            maximumValue={5.0}
            step={0.1}
            value={rating.max}
            onValueChange={value => setRating({ ...rating, max: value })}
            minimumTrackTintColor="#F6D58A" 
            maximumTrackTintColor="gray" 
            thumbTintColor="#F6D56E"
          />
          <Text style={styles.sliderValue}>
            {rating.min.toFixed(1)} - {rating.max.toFixed(1)}
          </Text>
        </View>
      </View>
      <View style={styles.optionContainer}>
        <Text style={styles.optionTitle}>評論數</Text>
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={5000}
            step={100}
            value={reviewCount}
            onValueChange={value => setReviewCount(value)}
            minimumTrackTintColor="#F6D58A" 
            maximumTrackTintColor="gray" 
            thumbTintColor="#F6D56E"
          />
          <Text style={styles.sliderValue}>{reviewCount}</Text>
        </View>
      </View>
      <View style={styles.optionContainer}>
        <Text style={styles.optionTitle}>排序方式</Text>
        <View style={styles.sortButtonsContainer}>
          {['個人化推薦', '評分高到低', '評論數多到少', '距離近到遠'].map(option => (
            <TouchableOpacity
              key={option}
              style={[styles.sortButton, option === sortOption ? styles.activeSortButton : null]}
              onPress={() => setSortOption(option)}
            >
              <Text style={[styles.sortButtonText, option === sortOption ? styles.activeSortButtonText : null]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.optionContainer}>
        <Text style={styles.optionTitle}>營業時間</Text>
        <View style={styles.isOpenButtonsContainer}>
          <TouchableOpacity
            style={[styles.isOpenButton, isOpen === '全部' ? styles.activeIsOpenButton : null]}
            onPress={() => setIsOpen('全部')}
          >
            <Text style={[styles.isOpenButtonText, isOpen === '全部' ? styles.activeIsOpenButtonText : null]}>全部</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.isOpenButton, isOpen === '營業中' ? styles.activeIsOpenButton : null]}
            onPress={() => setIsOpen('營業中')}
          >
            <Text style={[styles.isOpenButtonText, isOpen === '營業中' ? styles.activeIsOpenButtonText : null]}>營業中</Text>
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
            {['全部', '飲料', '早餐', '中式', '炸物', '便當', '蛋餅', '麵', '咖啡'].map(option => (
              <Picker.Item key={option} label={option} value={option} />
            ))}
          </Picker>
        </View>
      </View>
      <TouchableOpacity style={styles.searchButton}>
        <Text style={styles.buttonText}>搜尋</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'transparent',
    padding: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  optionContainer: {
    marginBottom: 20,
  },
  optionTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
 
  },
  slider: {
    flex: 1,
    height: 40,

  },
  sliderValue: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 14,
  },
  sortButtonsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  sortButton: {
    flex: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  activeSortButton: {
    backgroundColor: '#F6D58A',
  },
  sortButtonText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  activeSortButtonText: {
    color: 'white',
  },
  isOpenButtonsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  isOpenButton: {
    flex: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  activeIsOpenButton: {
    backgroundColor: '#F6D58A',
  },
  isOpenButtonText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  activeIsOpenButtonText: {
    color: 'white',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  picker: {
    height: 40,
    color: 'black',
  },
  searchButton: {
    backgroundColor: '#F6D58A',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
});

export default SearchRes;
