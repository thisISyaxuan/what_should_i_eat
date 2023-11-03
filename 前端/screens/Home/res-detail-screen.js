//要先下載 npm i react-native-image-view --force
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { View,Text,StyleSheet,Image, Alert ,Modal} from "react-native";
import { ScrollView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from "react";
import ImageView from "react-native-image-view";
import { imag } from '../../data/menu';

export default ResInfo = ({navigation}) =>{
    const route = useRoute()
    const {rID,rName,rMap_Score,rPhone,rAddress,open,collect,distance,labelID} = route.params
    const [isCollected, setIsCollected] = useState(collect);
    const [modalVisible, setModalVisible] = useState(false);
    const menuImg = imag.find(image => image.imgID === (rID+1).toString());
    
    const images = [//測試圖片
      {
        source: require('../../assets/images/restaurant/30-1.jpeg'),
        title: '測試照片第一張',
        width: 1522,
        height: 1077,
      },{
        source: require('../../assets/images/restaurant/30-2.jpg'),
        title: '測試照片第二張',
        width: 1147,
        height: 881,
      }
    ];

    const toggleCollect = () => {
      setIsCollected((prevCollected) => (prevCollected === 1 ? 0 : 1));
      sendcollectState();
    };
    const sendcollectState = async () => {//傳token、rID、Collect
      try {
        const userToken = await AsyncStorage.getItem('userToken'); // 從AsyncStorage中取得token
        if (userToken) {//抓完token抓定位
                const requestdata = {rID:rID,collect:isCollected,};
                const response = await fetch('http://172.20.10.2:8000/recommend/collect/', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json',Authorization: `Token ${userToken}`,},
                    body: JSON.stringify(requestdata)
                });
                if (response.ok) {
                  Alert.alert("已更新");
              } else {
                  console.error('更新收藏店家失敗', response.status);
              }
        } else {
          //console.log("你是不是連結媒改?我在res-detail-screen");
        }
    } catch (error) {
        console.error('res-detail-screen Error sending request:', error);
    }
    }

    return(
        <View style={styles.container}>
            <View style={styles.title}>
            <Text style={{flex: 6,textAlign: 'right', fontSize:25,fontWeight:"bold"}}>{rName}</Text>
            <TouchableOpacity onPress={toggleCollect} style={{flex:3, alignItems: 'flex-end'}}>{isCollected === 1 ? <Ionicons name="heart" size={45} color={'red'} /> : <Ionicons name="heart-outline" size={45} color={'#C0C0C0'} />}</TouchableOpacity>
            </View>
                <View style={{ borderTOPColor: 'gray', borderBottomWidth: 1 ,width:'100%'}}></View>
            <ScrollView horizontal showsVerticalScrollIndicator={false} style={{borderTopWidth:0.5, borderTopColor:'gray', borderBottomWidth:1, borderBottomColor:'gray', top:20}}>
              <View>
              <TouchableOpacity style={{ width: 250, height: 250, margin: 7, justifyContent: 'center', alignItems: 'center' }} onPress={() => setModalVisible(true)}>
                {menuImg ? (
                <Image source={menuImg.image} style={{ width: '100%', height: '100%' }} />
                ) : (<Text>暫無照片</Text>)}
              </TouchableOpacity>
              </View>
            </ScrollView>

            <View style={styles.centeredView}>
              <Modal  animationType="slide" transparent={true} visible={modalVisible} 
                      onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible); 
                      }}> 
                  <ImageView images={images} imageIndex={0}  visible={modalVisible}
                      onRequestClose={() => setModalVisible(!modalVisible)}/>
              </Modal>
            </View>
            
            <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1 ,width:'100%'}}></View>
            <View style={styles.output}>
            <View style={{flexDirection: 'row', height: 50, flex: 2}}>
                <View style={{ justifyContent: 'center', margin: 7 }}><Icon name="circle" size={10} color={open === -1 ? 'red' : 'green' }/></View>
                <Text style={{fontSize:18}}>{open === -1 ? '已打烊' : '營業中'}</Text>
            </View>
            <Text style={{fontSize:18, borderBottomWidth:1.5, borderBottomColor:'gray', height: 30}}>評分: {rMap_Score} 顆星</Text>
            <Text style={{fontSize:18, borderBottomWidth:1.5, borderBottomColor:'gray', height: 30}}>距離: {distance}km</Text>
            <Text style={{fontSize:18, borderBottomWidth:1.5, borderBottomColor:'gray', height: 30}}>電話: {rPhone}</Text>
            <Text style={{fontSize:18, borderBottomWidth:1.5, borderBottomColor:'gray', height: 30}}>地址: {rAddress}</Text>
        </View> 

        <View style={styles.bottom}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10, top: -20}}>
            <TouchableOpacity style={styles.ButtonR}>
                <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}} onPress={() => navigation.navigate("錯誤回報", {rID,rName,rMap_Score,rPhone,rAddress,open,collect,distance,labelID})}>錯誤回報</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ButtonL}>
                <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}} onPress={() => navigation.navigate("造訪餐廳", {rID,rName,rMap_Score,rPhone,rAddress,open,collect,distance,labelID})}>造訪店家</Text>
            </TouchableOpacity>
            </View>
        </View>

        </View>
        
    )
}
const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 5,
        backgroundColor: '#fff',
        alignItems: 'center',
      },
      title: {
        flexDirection: 'row',
        padding: 20,
        fontSize: 25,
        alignItems:"center",
      },
      output: {
        top:10,
        width: '90%',
        flexDirection: 'column',
        textAlign: 'left',
        height:150,
      },  
      bottom: {
        borderTopWidth:1, borderTopColor:'gray',
        flex: 4,
        margin: 10,
        padding: 15,
      },
      ButtonL: {
        top: 20,
        justifyContent: 'center',
        left: 12,
        width: '50%',
        height: 50,
        backgroundColor: '#338168',
        borderRadius: 30
      },
      ButtonR: {
        top: 20,
        justifyContent: 'center',
        right: 12,
        width: '50%',
        height: 50,
        borderRadius: 30,
        backgroundColor: '#C13E27',
      },


      centeredView: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: '#333333',
        borderRadius: 20,
        padding: 5,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width:'100%',
        height:'78%',
        
      },
      image: {
        flex: 1,
        width: '100%', // 图像宽度占满父容器
        height: '100%', // 图像高度占满父容器
      },

      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize:18,
        padding:3
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },

  });
