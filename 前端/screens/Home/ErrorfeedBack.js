import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet,TouchableWithoutFeedback,Keyboard } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
const Errorfb = () => {
  const [restaurant, setRestaurant] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [businessHours, setBusinessHours] = useState('');
  const [menuFile, setMenuFile] = useState('');
  const [otherInfo, setOtherInfo] = useState('');
  const handleSubmit = () => {
    console.log('表單送出');
  };
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
      <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>店家名稱</Text>
        <Picker
          style={styles.dropdown}
          selectedValue={restaurant}
          onValueChange={(itemValue) => setRestaurant(itemValue)}
        >
          <Picker.Item label="請選擇" value="" />
          <Picker.Item label="餐廳A" value="餐廳A" />
          <Picker.Item label="餐廳B" value="餐廳B" />
          <Picker.Item label="餐廳C" value="餐廳C" />
          <Picker.Item label="餐廳D" value="餐廳D" />
          <Picker.Item label="餐廳E" value="餐廳E" />
        </Picker>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>電話</Text>
        <View style={[styles.inputContainer, { borderColor: '#F6D58A' }]}>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={text => setPhone(text)}
            placeholder="請輸入更正資訊，無則免填"
            textAlignVertical="center" // 讓文字垂直置中
          />
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>地址</Text>
        <View style={[styles.inputContainer, { borderColor: '#F6D58A' }]}>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={text => setAddress(text)}
            placeholder="請輸入更正資訊，無則免填"
            textAlignVertical="center" // 讓文字垂直置中
          />
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>營業時間</Text>
        <View style={[styles.inputContainer, { borderColor: '#F6D58A' }]}>
          <TextInput
            style={styles.input}
            value={businessHours}
            onChangeText={text => setBusinessHours(text)}
            placeholder="請輸入更正資訊，無則免填"
            textAlignVertical="center" // 讓文字垂直置中
          />
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>菜單更新</Text>
        <TouchableOpacity style={styles.fileButton}>
          <Text style={[styles.buttonText, { color: 'white' }]}>選擇檔案</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>其他資訊</Text>
        <View style={[styles.inputContainer, { borderColor: '#F6D58A', height: 4 * 40 }]}>
          <TextInput
            style={styles.input}
            value={otherInfo}
            onChangeText={text => setOtherInfo(text)}
            placeholder="輸入更正資訊，無則免填"
            multiline
            textAlignVertical="center" // 讓文字垂直置中
          />
        </View>
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={[styles.buttonText, { color: 'white' }]}>送出</Text>
      </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  row: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 5,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    height: 40,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    color: 'black',
  },
  fileButton: {
    backgroundColor: 'green',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
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

export default Errorfb;