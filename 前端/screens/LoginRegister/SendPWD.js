import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/global';

const SendPWD = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>忘記密碼</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentText}>驗證碼已傳送! 請查看您的信箱</Text>
        <TextInput style={styles.input} placeholder="請輸入驗證碼" />
      </View>
      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>沒有收到Email嗎?</Text>
        <TouchableOpacity style={styles.resendButton}>
          <Text style={styles.resendButtonText}>重新傳送驗證碼</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={globalStyles.YellowBtn} onPress={() => navigation.navigate('ForgotPWD')}>
          <Text style={styles.buttonText}>返回</Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.GreenBtn}>
          <Text style={styles.buttonText}>傳送驗證碼</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    marginBottom: 20,
  },
  contentText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  resendText: {
    fontSize: 16,
    marginRight: 5,
  },
  resendButton: {
    padding: 5,
  },
  resendButtonText: {
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
  },
  returnButton: {
    backgroundColor: 'red',
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: 'green',
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SendPWD;
