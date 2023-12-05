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
    //const route = useRoute();
    //const { rID,rName,rMap_Score,rPhone,rAddress,open,collect}=route.params.data;
    const [isloading,setloading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const [rID,setrID] = useState(0);
    const [rName,setrName]=useState('');
    const [rMap_Score,setrMap_Score]=useState('');
    const [rPhone,setrPhone]=useState('');
    const [rAddress,setrAddress]=useState('');
    const [open,setopen]=useState(0);
    const [isCollected, setIsCollected] = useState(0);
    const [sendimg,setSendImg] = useState(false);
    const [menuImg,setmenuImg] = useState()

    //const menuImg = imag.find(image => image.imgID === (rID).toString());

    useEffect(() => {
        toggleRandom();
    }, []);
    const ClickResName = async (rID) => {
      try {
        const userToken = await AsyncStorage.getItem('userToken'); // 從AsyncStorage中取得token
        if (userToken) {//抓時間，token，rID
          const currentDate = new Date();//先抓時間 格式為年-月-日-時-分-秒
          const formattedTime = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}-${currentDate.getHours()}-${currentDate.getMinutes()}-${currentDate.getSeconds()}`;
          const postdata = {
            Time:formattedTime,//裡面放當下時間
            rID:rID,//餐廳id
          };
          const response = await fetch(link.eventItem, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
               Authorization: `Token ${userToken}`,
            },
            body: JSON.stringify(postdata)
          });
          if (response.ok) {
          console.log("OK")
          } else {
            Alert.alert("這裡哪");
          }
        }
      }catch{
        console.log('43 行')
        console.log("發生錯誤，可能連結沒改")
      }
    }

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
          });
          const responseData = await response.json();//後端回傳資料
          mydata = responseData.success;
          setrID(mydata.rID);
          setrName(mydata.rName);
          setrMap_Score(mydata.rMap_Score);
          setrPhone(mydata.rPhone);
          setrAddress(mydata.rAddress);
          setopen(mydata.open);
          setIsCollected(mydata.collect);
          ClickResName(mydata.rID);
          const menuImgT = imag.find(image => image.imgID === (mydata.rID).toString());

          console.log("ID:",mydata.rID," 檔名:",menuImgT)
          setmenuImg(menuImgT);
          await setSendImg(true);
          await setloading(true);
          //console.log("ID:",mydata.rID," 檔名:",menuImg, menuImgT)
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
              rID:rID,
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

    return (
      isloading ? (
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
              <View style={styles.innerContainer}>
                  <View style={styles.title}>
                  <Text style={{flex: 14, textAlign: 'left', fontSize:25,fontWeight:"bold"}}>{rName}</Text>
                  <TouchableOpacity onPress={toggleCollect} style={{flex:3, alignItems: 'flex-end'}}>{isCollected === 1 ? <Ionicons name="heart" size={45} color={'red'} /> : <Ionicons name="heart-outline" size={45} color={'#C0C0C0'} />}</TouchableOpacity>
                  </View>
                      <View style={{ borderTOPColor: 'gray', borderBottomWidth: 1 ,width:'100%'}}></View>
                  <View horizontal showsVerticalScrollIndicator={false} style={{borderTopWidth:0.5, borderTopColor:'gray', borderBottomWidth:1, top:20}}>
                    <View>
                      {sendimg ? (
                        menuImg ? (
                          <TouchableOpacity style={{ width: 250, height: 250, margin: 7, justifyContent: 'center', alignItems: 'center' }} onPress={() => setModalVisible(true)}>
                              <Image source={menuImg.image} style={{ width: '100%', height: '100%' }} />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity style={{ width: 250, height: 250, margin: 7, justifyContent: 'center', alignItems: 'center' }}>
                              <Text>暫無照片</Text>
                          </TouchableOpacity>
                        )
                        ) : null}
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
                        <View style={{ justifyContent: 'center', margin: 7 }}><Icon name="circle" size={15} color={open === -1 ? 'red' :open ===0 ? '#E5B45A' : 'green' }/></View>
                        <Text style={{fontSize:18}}>{open === -1 ? '已打烊' : open === 0 ? '即將打烊': '營業中'}</Text>
                    </View>
                    <Text style={{fontSize:18, borderBottomWidth:1.5, borderBottomColor:'gray', height: 30}}>評分：{rMap_Score} 顆星</Text>


                    <TouchableOpacity onPress={() => Linking.openURL(`tel:${rPhone}`)}>
                      <Text style={{ fontSize: 18, height: 30 }}>
                        電話：
                        <Text style={{ fontSize:18,height: 30,textDecorationLine: 'underline',color:'blue'}}> {rPhone} </Text>
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => openGoogleMaps(rName)}>
                    <Text style={{fontSize:18, height: 30}}>
                      地址：
                      <Text style={{ fontSize:18,height: 30,textDecorationLine: 'underline',color:'blue'}}> {rAddress} </Text>
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
        ) : (
            <ActivityIndicator size="large" color="#338168" />
        )
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
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingBottom: 20,
    },
    innerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 20,  // 確保滾動視圖內部有足夠的底部間距
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
