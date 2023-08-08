import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Import the desired icon from the library
import React from "react";

export default function TodayTasks() {
  const navigation = useNavigation();

  // Define tasks for the page
  const tasks = [{ name: "任務 1", coins: 10 }, { name: "任務 2", coins: 20 }];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Adding the back button */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>

        <Text style={styles.title}>今日任務</Text>
        <View style={styles.coins}>
          <Image source={require('../../assets/images/coin.png')} style={styles.coinIcon} />
          <Text style={styles.coinsValue}>
            {tasks.reduce((total, task) => total + task.coins, 0)}
          </Text>
        </View>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('本日任務')}>
          <Text style={styles.buttonText}>本日任務</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('本月任務')}>
          <Text style={styles.buttonText}>本月任務</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.selectedButton} onPress={() => navigation.navigate('特別任務')}>
          <Text style={styles.buttonText}>特別任務</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tasks}>
        {tasks.map((task, index) => (
          <View key={index} style={styles.task}>
            <Text style={styles.taskName}>{task.name}</Text>
            <View style={styles.coins}>
              <Image source={require('../../assets/images/coin.png')} style={{ width: 30, height: 30 }} />
              <Text style={styles.coinsValue} >{task.coins} </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20, // Increase header padding
    backgroundColor: '#FFFACD',
  },
  backButton: {
    padding: 10,
  },
  title: {
    fontSize: 20,
  },
  coins: {
    flexDirection: 'row', // Change to row to align image and text horizontally
    alignItems: 'center',
  },
  coinIcon: {
    width: 40,
    height: 40,
  },
  smallCoinIcon: {
    width: 20,
    height: 20,
  },
  coinsValue: {
    fontSize: 16,
    marginLeft: 5,
    flexWrap: 'wrap', //換行   
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  button: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: '#FFFACD',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
  },
  tasks: {
    flex: 1,
    padding: 10,
  },
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#FFFACD',
    borderRadius: 10,
    width: '85%', // Set width to 85% of screen width
    height: '12%', // Set height to 12% of screen height
    alignSelf: 'center', // Center horizontally
  },
  taskName: {
    fontSize: 16,
  },
});




/*
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { View,Text,StyleSheet } from "react-native";

export default function Mycoin() {
    
   const navigation = useNavigation();
    return (
      <View style={styles.container}>
        <Text>Mycoins screen</Text>
      </View>
    );
  };
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
      },
      text:{
        fontSize:50,
      }
});
*/

