import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

export default function TodayTasks() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>

        <Text style={styles.title}>今日任務</Text>

        {/* Replace with your coin icon */}
        <Icon name="coin" size={24} color="#000000" />
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 16,
          },
          tabBarStyle: {
            backgroundColor: "#FFFACD",
          },
        }}
      >
        <Tab.Screen name="本日任務" component={DailyTasksScreen} />
        <Tab.Screen name="本月任務" component={MonthlyTasksScreen} />
        <Tab.Screen name="特別任務" component={SpecialTasksScreen} />
      </Tab.Navigator>
    </View>
  );
}

const TaskCard = ({ title, coins }) => {
  return (
    <View style={styles.taskCard}>
      <Text style={styles.taskTitle}>{title}</Text>
      <View style={styles.coinsContainer}>
        <Image
          source={require("../../assets/images/coin.png")}
          style={styles.coinImage}
        />
        <Text style={styles.coinsText}>{coins}</Text>
      </View>
    </View>
  );
};

const DailyTasksScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.tabContainer}>
      <TaskCard title="今日簽到" coins={5} />
      <TaskCard title="尋找餐廳" coins={5} />
      <TaskCard title="瀏覽推薦餐廳" coins={10} />
      <TaskCard title="紀錄用餐消費" coins={10} />
      <TaskCard title="完成今日所有任務" coins={10} />
    </ScrollView>
  );
};

const MonthlyTasksScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.tabContainer}>
      <TaskCard title="累積記帳5次" coins={20} />
      <TaskCard title="累積記帳10次" coins={25} />
      <TaskCard title="累積記帳15次" coins={30} />
      <TaskCard title="累積記帳20次" coins={40} />
      <TaskCard title="累積記帳25次" coins={60} />
      <TaskCard title="累積記帳30次" coins={80} />
      <TaskCard title="累積記帳30次" coins={80} />
      <TaskCard title="累積記帳30次" coins={80} />
      <TaskCard title="累積記帳30次" coins={80} />
    </ScrollView>
  );
};

const SpecialTasksScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.tabContainer}>
      <TaskCard title="完成滿意度調查" coins={30} />
      <TaskCard title="累積記帳100次" coins={50} />
      <TaskCard title="錯誤資訊回報成功" coins={50} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFACD",
  },
  scrollView: {
    flex: 1,
    width: "100%", // 100% 螢幕寬度
  },
  backButton: {
    padding: 10,
  },
  title: {
    fontSize: 20,
  },
  tabContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  taskCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EFEFEF",
    padding: 10,
    marginBottom: 10,
    width: "80%", // 80% 螢幕寬度
    height: Dimensions.get("window").height * 0.12, // 螢幕高度的12%
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // 讓錢幣和文字對齊
  },
  taskTitle: {
    fontSize: 16,
  },
  coinsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  coinImage: {
    width: 40,
    height: 40,
    alignSelf: "center", // 將錢幣圖片置中對齊
    marginRight: 5,
  },
  coinsText: {
    fontSize: 22,
    alignSelf: "center", // 將錢幣數字靠右對齊
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

