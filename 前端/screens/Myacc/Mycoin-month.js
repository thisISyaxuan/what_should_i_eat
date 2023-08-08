import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Import the desired icon from the library
import React from "react";

export default function TodayTasks() {
  const navigation = useNavigation();

  // Define tasks for the page
  const tasks = [{ name: "Task 1", coins: 10 }, { name: "Task 2", coins: 20 }];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Adding the back button */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>

        <Text style={styles.title}>今日任務</Text>
        <View style={styles.coins}>
          <Text style={styles.coinsIcon}>Coins ICON</Text>
          <Text style={styles.coinsValue}>{tasks.reduce((total, task) => total + task.coins, 0)}</Text>
        </View>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('本日任務')}>
          <Text style={styles.buttonText}>本日任務</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.selectedButton} onPress={() => navigation.navigate('本月任務')}>
          <Text style={styles.buttonText}>本月任務</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('特別任務')}>
          <Text style={styles.buttonText}>特別任務</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tasks}>
        {tasks.map((task, index) => (
          <View key={index} style={styles.task}>
            <Text style={styles.taskName}>{task.name}</Text>
            <View style={styles.coins}>
              <Text style={styles.coinsIcon}>Coins ICON</Text>
              <Text style={styles.coinsValue}>{task.coins}</Text>
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
    padding: 10,
    backgroundColor: '#FFFACD',
  },
  backButton: {
    padding: 10,
  },
  title: {
    fontSize: 20,
  },
  coins: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  coinsIcon: {
    fontSize: 20,
  },
  coinsValue: {
    fontSize: 16,
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

