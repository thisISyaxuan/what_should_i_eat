import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const QA = () => {
    const navigation = useNavigation();
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const toggleAnswer = (question) => {
        if (selectedQuestion === question) {
            setSelectedQuestion(null);
        } else {
            setSelectedQuestion(question);
        }
    };

    return (
      <ScrollView >
        <View style={styles.card}>
          {/* 帳號設定與登入 */}
          <Text style={styles.title}>1. 帳號設定與登入</Text>
          <TouchableOpacity onPress={() => toggleAnswer('q1')}>
              <Text style={styles.question}>Q：我可以註冊兩個帳號嗎？</Text>
          </TouchableOpacity>
          {selectedQuestion === 'q1' && (
              <Text style={styles.answer}>A：為了確保每位使用者的帳號正常運作，我們限制每位使用者的帳號名稱與電子郵件必須不相同。所以若您想要註冊一個以上的帳號，請在上述提及的欄位輸入不同資訊。</Text>
          )}

          {/* 系統推薦餐廳 */}
          <Text style={styles.title}>2. 系統推薦餐廳</Text>
          <TouchableOpacity onPress={() => toggleAnswer('q2')}>
              <Text style={styles.question}>Q：登入後為什麼要等這麼久才有畫面？</Text>
          </TouchableOpacity>
          {selectedQuestion === 'q2' && (
              <Text style={styles.answer}>A：系統在登入且尋求您的同意之後，會抓取您的定位，所以需要稍等約 10 秒。</Text>
          )}
          <TouchableOpacity onPress={() => toggleAnswer('q3')}>
              <Text style={styles.question}>Q：系統如何進行推薦機制？</Text>
          </TouchableOpacity>
          {selectedQuestion === 'q3' && (
              <Text style={styles.answer}>A：本系統透過您註冊時所勾選之喜好項目、歷史記帳記錄以及其他使用者之歷史記帳記錄作為推薦的依據！若您想要更精準的系統推薦清單，那就多多記帳吧！</Text>
          )}
          <TouchableOpacity onPress={() => toggleAnswer('q4')}>
              <Text style={styles.question}>Q：如何將餐廳加入收藏清單？</Text>
          </TouchableOpacity>
          {selectedQuestion === 'q4' && (
              <Text style={styles.answer}>A：在點進餐廳資訊頁面之後，按下右上角的愛心，即可將該餐廳加入您的收藏清單！。</Text>
          )}

          {/* 記帳功能 */}
          <Text style={styles.title}>3. 記帳功能</Text>
          <TouchableOpacity onPress={() => toggleAnswer('q5')}>
              <Text style={styles.question}>Q：如何記錄餐飲花費？</Text>
          </TouchableOpacity>
          {selectedQuestion === 'q5' && (
              <Text style={styles.answer}>A：系統提供兩個方式能夠記帳！第一是在餐廳資訊頁面中的「造訪餐廳」，系統會將餐廳名稱自動填入；第二是「記一筆」功能，輸入指定欄位資訊即可完成記帳。</Text>
          )}
          <TouchableOpacity onPress={() => toggleAnswer('q6')}>
              <Text style={styles.question}>Q：如何查看月支出圖表？</Text>
          </TouchableOpacity>
          {selectedQuestion === 'q6' && (
              <Text style={styles.answer}>A：在「我的錢包」頁面中，點選右上角的圓餅圖圖示，即可清楚地看到每月的餐飲花費情形。</Text>
          )}

          {/* 精靈與雞腿幣 */}
          <Text style={styles.title}>4. 精靈與雞腿幣</Text>
          <TouchableOpacity onPress={() => toggleAnswer('q7')}>
              <Text style={styles.question}>Q：精靈在系統中可以做什麼？</Text>
          </TouchableOpacity>
          {selectedQuestion === 'q7' && (
              <Text style={styles.answer}>A：精靈主要提供兩種用途，一為使用者可蒐集、更改大頭貼與介面；二為點擊「我的精靈」頁面之下方精靈，系統將會隨機抽選一間餐廳，提供建議給猶豫不決的使用者們。</Text>
          )}
          <TouchableOpacity onPress={() => toggleAnswer('q8')}>
              <Text style={styles.question}>Q：如何簽到賺取雞腿幣？</Text>
          </TouchableOpacity>
          {selectedQuestion === 'q8' && (
              <Text style={styles.answer}>A：方法有二，一是在「我的精靈」頁面，每日提供一次簽到機會，可賺取 100 雞腿幣；二是透過記帳，每成功記帳一筆記錄，也可賺取 20 雞腿幣。</Text>
          )}
          <TouchableOpacity onPress={() => toggleAnswer('q9')}>
              <Text style={styles.question}>Q：如何購買精靈與更換大頭貼？</Text>
          </TouchableOpacity>
          {selectedQuestion === 'q9' && (
              <Text style={styles.answer}>A：在「我的精靈」頁面中點選精靈圖鑑，即可看見所有系統精靈，尚未擁有的精靈可透過雞腿幣購買，已經擁有的精靈可選擇成為帳號大頭貼。</Text>
          )}
          {/* 5. 其他 */}
          <Text style={styles.title}>5. 其他</Text>
          <TouchableOpacity onPress={() => toggleAnswer('q9')}>
              <Text style={styles.question}>Q：隨機抽選一間餐廳之後，要去哪裡可以再看到剛剛那間的餐廳資訊？</Text>
          </TouchableOpacity>
          {selectedQuestion === 'q9' && (
              <Text style={styles.answer}>A：在帳號設定中可點選「瀏覽紀錄」，便可以依序找到您瀏覽過的店家，隨時找回您感興趣的餐廳。</Text>
          )}
          <TouchableOpacity onPress={() => toggleAnswer('q10')}>
              <Text style={styles.question}>Q：系統資訊什麼時候會更新？</Text>
          </TouchableOpacity>
          {selectedQuestion === 'q10' && (
              <Text style={styles.answer}>A：為了提供使用者最完整的服務，我們將定期維護系統資訊。若使用者仍然發現系統資訊有誤，歡迎在餐廳資訊頁面點選「錯誤回報」，提供系統最新資訊，我們將會在審核過後，更新系統資訊，並獎勵使用者 200 雞腿幣。</Text>
          )}
        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  card:{
    flex:1,
    marginLeft:20,
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
    fontWeight:'400',
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
