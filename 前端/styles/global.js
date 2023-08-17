import { Button, StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container:{
        flex:1,
        padding:20
    },
  titleText:{
        fontFamily: 'nunito-bold',
        fontSize:18,
        color: '#333'
    },
  paragraph:{
        marginVertical:8,
        lineHeight:20,
    },
  input:{//輸入盒的外觀
    borderBottomWidth: 1,
        borderColor:'#777',
        padding:8,
        margin:10,
        width:250,
    },
  Btn: {//包圍綠跟紅的框框按鈕
      flexDirection: 'row',
      justifyContent: 'space-between',
      //alignItems: 'center',
  },
  RedBtn:{//紅色的按鈕
        backgroundColor: '#c13e27',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
  YellowBtn:{//黃色的按鈕
      backgroundColor: '#E5B45A',
      paddingHorizontal: 30,
      paddingVertical: 10,
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
  },
  GreenBtn:{//綠色的按鈕
    backgroundColor: '#338168',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 40,
    //justifyContent: 'center',
    alignItems: 'center',
  },
  BtnText:{//按鈕文字樣式
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
  },
  BtnBlackText:{//按鈕文字樣式
    fontSize: 16,
    fontWeight: 'bold',
},
  separator: {//分隔線
    height: 1,
    width: '100%',
    backgroundColor: 'gray',
  },
  TextSize:{//內文字體大小
    fontSize:18,
    marginLeft:13,
    marginBottom: 5,
  },
  Gocenter:{//置中
    alignItems: 'center',
  },

});
