import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
const Timelimit = () => {
    const navigation = useNavigation();
    return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.goBackButton}>
      </TouchableOpacity>
      <Image style={styles.image} source={require('../../assets/images/dice.png')}/>
      <Text style={styles.description}>
        於以下三時段進行用餐紀錄
        {'\n'}
        將可獲得當次限時翻倍資格
        {'\n'}
        於紀錄後當下給予翻倍機會
        {'\n'}{'\n'}
        早上(06:00-08:00)
        {'\n'}
        中午(11:00-13:00)
        {'\n'}
        晚上(18:00-20:00)
      </Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  goBackButton: {
    backgroundColor: 'transparent',
    padding: 10,
    position: 'absolute',
    top: 10,
    left: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  refreshButton: {
    backgroundColor: '#F6D58A',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default Timelimit;