import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from 'react-native-gesture-handler';

const QA = () => {
    const navigation = useNavigation();

    return (
        <ScrollView >
        <View style={styles.card}>
        <Text style={styles.title}>1. 帳號設定與登入</Text>
        <Text style={styles.question}>Q: 如何創建新帳號？</Text>
        <Text style={styles.answer}>A: 點選APP首頁右上角的「註冊」按鈕，填寫必要資訊即可成功創建帳號。</Text>
        <Text style={styles.question}>Q: 忘記密碼怎麼辦？</Text>
        <Text style={styles.answer}>A: 在登入頁面點選「忘記密碼」，輸入註冊時使用的電子郵件地址，系統將寄送密碼重設郵件至您的信箱。</Text>
        <Text style={styles.question}>Q: 是否支援第三方帳號登入？</Text>
        <Text style={styles.answer}>A: 目前我們提供Google和Facebook帳號登入選項，方便您快速進入APP。</Text>
        
        <Text style={styles.title}>2. 系統推薦餐廳</Text>
        <Text style={styles.question}>Q: 如何使用系統推薦功能？</Text>
        <Text style={styles.answer}>A: 在首頁或餐廳推薦頁面，點選您感興趣的餐廳名稱，即可查看餐廳資訊。利用搜尋功能，可以根據營業狀態、評分高低等條件進行排序。</Text>
        <Text style={styles.question}>Q: 如何將餐廳加入收藏清單？</Text>
        <Text style={styles.answer}>A: 在餐廳資訊頁面點選「加入收藏」，即可將該餐廳加入您的收藏清單中。</Text>
        
        <Text style={styles.title}>3. 記帳功能</Text>
        <Text style={styles.question}>Q: 如何記錄餐飲花費？</Text>
        <Text style={styles.answer}>A: 點選首頁的「記帳」功能，輸入消費金額、選擇用餐日期等資訊，點擊確認即可完成記帳。</Text>
        <Text style={styles.question}>Q: 如何查看月支出圖表？</Text>
        <Text style={styles.answer}>A: 在記帳功能中，點選「月支出圖表」，您可以清楚地看到每月的餐飲花費情形。</Text>
        <Text style={styles.question}>Q: 能否查詢歷史記帳資訊？</Text>
        <Text style={styles.answer}>A: 是的，點選「歷史記帳」，您可以查看以往的記帳紀錄，方便追蹤消費情況。</Text>
        
        
        <Text style={styles.title}>4. 吉祥物蒐集</Text>
        <Text style={styles.question}>Q: 如何簽到賺取遊戲幣？</Text>
        <Text style={styles.answer}>A: 在首頁點選「吉祥物蒐集」，點擊簽到按鈕即可獲得遊戲幣獎勵。每日簽到更有額外獎勵。</Text>
        <Text style={styles.question}>Q: 如何購買吉祥物？</Text>
        <Text style={styles.answer}>A: 在吉祥物蒐集頁面，點選您喜歡的吉祥物，選擇購買即可使用遊戲幣取得。</Text>
        
        <Text style={styles.title}>5. 收藏清單</Text>
        <Text style={styles.question}>Q: 如何查看收藏清單？</Text>
        <Text style={styles.answer}>A: 在首頁點選「收藏清單」，您可以查看已收藏的餐廳清單，隨時找回您感興趣的餐廳。</Text>
        <Text style={styles.question}>Q: 是否能分享收藏清單？</Text>
        <Text style={styles.answer}>A: 目前我們提供分享功能，您可以將收藏清單分享至社交平台或通訊應用，與好友交流美食心得。</Text>
        
            </View>
        </ScrollView>
  );
};

const styles = StyleSheet.create({
  card:{
    flex: 1,
    marginLeft: 20,
    marginRight:20,
    padding:10,
    marginTop:5,
  },
  title:{
    fontWeight:'700',
    fontSize:23,
    marginTop:20,
  },
  question:{
    fontWeight:'500',
    fontSize:18,
    marginTop:20,
  },
  answer:{
    fontWeight:'300',
    fontSize:18,
    marginTop:5,
  }
});

// 導出該組件供其他組件使用
export default QA;
