import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
const Privacy = () => {
    const navigation = useNavigation();
    return (
        
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>歡迎使用XXX App!</Text>
        <View>
        
        <ScrollView>
        
        <Text style={styles.description}>
        在您註冊並使用本App之前，請仔細閱讀以下隱私政策與使用條款，以確保您充分理解我們收集、使用、儲存和分享您的個人資訊的方式。{'\n'}</Text>
        <Text style={styles.boldText}>1. 接受條款</Text>
        <Text style={styles.description}>
        {'\n'}通過註冊並使用本App，您表示您已閱讀、理解並同意遵守本條款中所述的所有條款和條件。如果您不同意這些條款，請不要註冊或使用本App。{'\n'}</Text>
        <Text style={styles.boldText}>2. 收集的資訊</Text>
        <Text style={styles.description}>
        {'\n'}當您註冊使用本App時，我們可能會收集以下類型的資訊：
        {'\n'}{'\n'}(1.)個人資訊： {'\n'}包括但不限於您的姓名、電子郵件地址、聯絡資訊等，以便我們建立您的帳戶並聯繫您。
        {'\n'}{'\n'}(2.)使用資訊： {'\n'}包括但不限於您在本App上的活動、搜索、瀏覽紀錄、評分和點評等，這些資訊將被用於生成個性化的美食推薦。
        {'\n'}{'\n'}(3.)設備資訊： {'\n'}包括但不限於您的設備型號、操作系統、瀏覽器類型等，以優化您的使用體驗。{'\n'}</Text>
        <Text style={styles.boldText}>3. 資訊使用目的</Text>
        <Text style={styles.description}>
        {'\n'}我們收集的資訊將用於以下目的：
        {'\n'}{'\n'}(1.)個性化推薦： {'\n'}您的評分、瀏覽紀錄等將作為生成個性化美食推薦的參考依據，以提供更符合您口味的餐廳推薦。
        {'\n'}{'\n'}(2.)帳戶管理： {'\n'}我們使用您的個人資訊來管理您的帳戶，包括通知您有關帳戶的更新和變更。
        {'\n'}{'\n'}(3.)改進服務： {'\n'}我們可能會使用匿名的彙整資訊來改進本App的功能和性能。
        {'\n'}{'\n'}(4.)聯繫您： {'\n'}我們可能會通過您提供的聯絡方式向您發送相關通知和促銷資訊。
        {'\n'}</Text>
        <Text style={styles.boldText}>4. 資訊共享</Text>
        <Text style={styles.description}>
        {'\n'}我們不會向第三方出售、出租或交易您的個人資訊。我們可能會與以下類別的實體共享您的資訊：
        {'\n'}{'\n'}(1.)合作夥伴： {'\n'}我們可能與我們的合作夥伴共享一些必要的資訊，以提供更好的服務和體驗。
        {'\n'}{'\n'}(2.)法律要求： {'\n'}我們可能根據適用的法律法規和法院命令，分享您的資訊。
        {'\n'}</Text>
        <Text style={styles.boldText}>5. 保障措施</Text>
        <Text style={styles.description}>
        {'\n'}我們將採取適當的技術和組織措施，以確保您的資訊受到適當的保護，避免未經授權的訪問、損壞、丟失或洩露。
        {'\n'}</Text>
        <Text style={styles.boldText}>6. 您的選擇與控制</Text>
        <Text style={styles.description}>
        {'\n'}您可以在設定中查看和更改您的個人資訊，包括註銷帳戶。您也可以選擇不參與個性化推薦功能。
        {'\n'}</Text>
        <Text style={styles.boldText}>7. 隱私政策的變更</Text>
        <Text style={styles.description}>
        {'\n'}我們可能會不時更新本隱私政策。更新後的政策將在本App上發布，並在生效前通知您。請定期查看以獲取最新信息。
        {'\n'}</Text>
        <Text style={styles.boldText}>8. 聯繫我們</Text>
        <Text style={styles.description}>
        {'\n'}如果您對於本隱私政策有任何疑問、意見或疑慮，請通過以下聯絡方式與我們聯繫：
        {'\n'}電子郵件：contact@exampleapp.com
        {'\n'}{'\n'}感謝您閱讀並接受我們的隱私政策與使用條款。我們致力於保護您的隱私，並提供優質的使用體驗。</Text>
      </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  title: {
    marginTop:-50,
    padding: 10,
    fontSize: 20,
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  description: {
    fontSize: 16,
  },
});

export default Privacy;