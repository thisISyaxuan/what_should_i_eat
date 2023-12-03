//要先下載 npm i react-native-image-view --force
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { View,Text,StyleSheet,Image, Alert ,Modal} from "react-native";
import { ScrollView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from "react";
import { imag } from '../../data/menu';
import { Linking } from 'react-native'; //超連結
import { link } from "../../data/apiLink";
import { ActivityIndicator } from 'react-native';//loading的圖示



export default RandomRes = ({navigation}) =>{
    const route = useRoute();

    //const data = route.params && route.params.data.data ? route.params.data.data : {success: 2 };
    const [ResData, setUserData] = useState({ rID: 0,
                                            rName:'',
                                            rMap_Score:0.0,
                                            rPhone:'',
                                            rAddress:'',
                                            open:0,
                                            collect:0,});

    const [modalVisible, setModalVisible] = useState(false);
    const [isloading,setloading] = useState(false);
    const [isCollected, setIsCollected] = useState(0);
    const menuImg = imag.find(image => image.imgID === (5).toString());

    setUserData(route.params.data);
    console.log("是嗎",route.params.data);
    setIsCollected(route.params.data.collect);


    setloading(true);


    const toggleRandom = async() => {
      const userToken = await AsyncStorage.getItem('userToken');
      if(userToken){
        try{//跟後端要餐廳的資訊
          const response = await fetch(link.randomRes, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${userToken}`,
              },
              //body: JSON.stringify(data),
          });
          console.log(response.success)
          const responseData = await response.json();//後端回傳資料
          console.log("後端回傳的responseData為:",responseData);
          setUserData(responseData.success)
          setloading(true);
        }catch(error){
          console.error('Baby Error sending request:', error);
        }
      }
    }

    const toggleCollect = () => {
      setIsCollected((prevCollected) => (prevCollected === 1 ? 0 : 1));
      sendcollectState();//傳token、rID給後端存起來
    };
    const sendcollectState = async () => {//傳token、rID、Collect
      try {
        const userToken = await AsyncStorage.getItem('userToken'); // 從AsyncStorage中取得token
        if (userToken) {//抓完token抓定位
            const requestdata = {
              rID:ResData.rID,
              collect:isCollected,
            };
            const response = await fetch(link.resDetail, {
              method: 'POST',
              headers: {'Content-Type': 'application/json',Authorization: `Token ${userToken}`,},
              body: JSON.stringify(requestdata)
            });
            if (response.ok) {
              console.log("更新成功");
            } else {
              Alert.alert("更新收藏店家失敗");
            }
        } else {
          console.log("你是不是連結媒改?我在res-detail-screen的第44行");
        }
    } catch (error) {
        console.error('res-detail-screen Error sending request:', error);
    }
    }
    const openGoogleMaps = (resname) => {
      const formattedResName = resname.replace(' ', '+'); // 把地址中有空格的地方替換為+號以構建 Google 地圖 URL
      const mapUrl = `https://www.google.com/maps/search/?api=1&query=${formattedResName}`;
      Linking.openURL(mapUrl)
        .then((result) => {
          if (result) {
            console.log('已打開 Google 地圖');
          } else {
            console.log('無法打開 Google 地圖');
          }
        })
        .catch((error) => {
          console.error('打開 Google 地圖時出錯：', error);
          Alert("發生錯誤，請稍後再試一次");
        });
    };
    
    return(
        isloading ?(
            <ScrollView style={styles.container}>
          <View style={{alignItems:'center'}}>
            <View style={styles.title}>
            <Text style={{flex: 14, textAlign: 'left', fontSize:25,fontWeight:"bold"}}>{ResData.rName}</Text>
            <TouchableOpacity onPress={toggleCollect} style={{flex:3, alignItems: 'flex-end'}}>{ResData.isCollected === 1 ? <Ionicons name="heart" size={45} color={'red'} /> : <Ionicons name="heart-outline" size={45} color={'#C0C0C0'} />}</TouchableOpacity>
            </View>
                <View style={{ borderTOPColor: 'gray', borderBottomWidth: 1 ,width:'100%'}}></View>
            <View horizontal showsVerticalScrollIndicator={false} style={{borderTopWidth:0.5, borderTopColor:'gray', borderBottomWidth:1, top:20}}>
              <View>
                {menuImg ? (
                <TouchableOpacity style={{ width: 250, height: 250, margin: 7, justifyContent: 'center', alignItems: 'center' }} onPress={() => setModalVisible(true)}>
                <Image source={menuImg.image} style={{ width: '100%', height: '100%' }} />
                </TouchableOpacity>
                
                ) : (
                <TouchableOpacity style={{ width: 250, height: 250, margin: 7, justifyContent: 'center', alignItems: 'center' }}>
                <Text>暫無照片</Text></TouchableOpacity>
                )
              }
              </View>
            </View>
            
            <Modal  style={styles.centeredView} animationType="slide" transparent={true} visible={modalVisible} >
              <View style={styles.modalContainer}>
                <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={{fontSize:23,color:'white',fontWeight:'bold'}}>X</Text>
                </TouchableOpacity>
                {menuImg ? (
                <Image source={menuImg.image} style={{ width: '100%', height: '100%',resizeMode:'contain', }} onRequestClose={() => setModalVisible(!modalVisible)}/>
                ) : null}
              </View>
            </Modal>


            {/*
              <ImageView images={images} imageIndex={0}  visible={modalVisible}
                      onRequestClose={() => setModalVisible(!modalVisible)}/>
            */}


            <View style={{height:50}}><Text> </Text></View>
            <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1 ,width:'100%'}}></View>
            <View style={styles.output}>
            <View style={{flexDirection: 'row', height: 50, flex: 2,alignItems:'center'}}>
                <View style={{ justifyContent: 'center', margin: 7 }}><Icon name="circle" size={10} color={ResData.open === -1 ? 'red' :ResData.open ===0 ? '#E5B45A' : 'green' }/></View>
                <Text style={{fontSize:18}}>{ResData.open === -1 ? '已打烊' : ResData.open === 0 ? '即將打烊': '營業中'}</Text>
            </View>
            <Text style={{fontSize:18, borderBottomWidth:1.5, borderBottomColor:'gray', height: 30}}>評分：{ResData.rMap_Score} 顆星</Text>
            

            <TouchableOpacity onPress={() => Linking.openURL(`tel:${ResData.rPhone}`)}>
              <Text style={{ fontSize: 18, height: 30 }}>
                電話：
                <Text style={{ fontSize:18,height: 30,textDecorationLine: 'underline',color:'blue'}}> {ResData.rPhone} </Text>
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => openGoogleMaps(ResData.rName)}>
            <Text style={{fontSize:18, height: 30}}>
              地址：
              <Text style={{ fontSize:18,height: 30,textDecorationLine: 'underline',color:'blue'}}> {ResData.rAddress} </Text>
            </Text>
            </TouchableOpacity>
        </View>

        <View style={styles.bottom}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10, top: -20}}>
            <TouchableOpacity style={styles.ButtonL} onPress={toggleRandom}>
                <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>換一家</Text>
            </TouchableOpacity>
            </View>
        </View>
        </View>
        </ScrollView>
        )
        :( <ActivityIndicator size="large" color="#338168" />)
    );
}
const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalContainer: {
      position: "relative",
      width: "100%",
      height: "100%",
      
      backgroundColor:'black',
    },
    closeButton: {
      position: "absolute",
      top: 100,
      right: 30,
      zIndex: 2,
      backgroundColor:'gray',
      borderRadius:50,
      height:25,
      width:25,
      alignItems:'center',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 5,
        backgroundColor: '#fff',
        //alignItems: 'center',
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
        borderTopWidth:1, 
        borderTopColor:'gray',
        width:'100%',
        margin: 10,
        padding: 15,
      },
      ButtonL: {
        position:'absolute',
        top: 30,
        justifyContent: 'center',
        width: '50%',
        left:'25%'
,       height: 50,
        backgroundColor: '#338168',
        borderRadius: 30
      },
      centeredView: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
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
