import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from 'react-native-gesture-handler';

const News = () => {
    const navigation = useNavigation();

    return (
        <ScrollView >
          <View style={styles.card}>
            <Text style={styles.cardtext}>2023/11/27</Text>
            <View style={[styles.content,{backgroundColor:'#ffd8c3'}]}>
                <View style={styles.circleout}>
                <View style={styles.circle}>
                    <Image style={styles.image} source={require('../../assets/images/baby/baby0/510.png')}/>
                </View></View>

                <View style={styles.contenttext}>
                <Text style={styles.usrtext}>                    全新精靈上架啦!                    </Text></View>
            </View>
        </View>
        <View style={styles.card}>
            <Text style={styles.cardtext}>2023/11/27</Text>
            <View style={[styles.content,{backgroundColor:'#ffe4e4'}]}>
                <View style={styles.circleout}>
                <View style={styles.circle}>
                    <Image style={styles.image} source={require('../../assets/images/baby/baby0/468.png')}/>
                </View></View>

                <View style={styles.contenttext}>
                <Text style={styles.usrtext}>                    全新精靈上架啦!                    </Text></View>
            </View>
        </View>
        <View style={styles.card}>
            <Text style={styles.cardtext}>2023/11/27</Text>
            <View style={[styles.content,{backgroundColor:'#cda686'}]}>
                <View style={styles.circleout}>
                <View style={styles.circle}>
                    <Image style={styles.image} source={require('../../assets/images/baby/baby0/426.png')}/>
                </View></View>

                <View style={styles.contenttext}>
                <Text style={styles.usrtext}>                    全新精靈上架啦!                    </Text></View>
            </View>
        </View>
        <View style={styles.card}>
            <Text style={styles.cardtext}>2023/11/27</Text>
            <View style={[styles.content,{backgroundColor:'#9d8b8b'}]}>
                <View style={styles.circleout}>
                <View style={styles.circle}>
                    <Image style={styles.image} source={require('../../assets/images/baby/baby0/384.png')}/>
                </View></View>

                <View style={styles.contenttext}>
                <Text style={styles.usrtext}>                    全新精靈上架啦!                    </Text></View>
            </View>
        </View>
        <View style={styles.card}>
            <Text style={styles.cardtext}>2023/11/27</Text>
            <View style={[styles.content,{backgroundColor:'#b1a9a9'}]}>
                <View style={styles.circleout}>
                <View style={styles.circle}>
                    <Image style={styles.image} source={require('../../assets/images/baby/baby0/342.png')}/>
                </View></View>

                <View style={styles.contenttext}>
                <Text style={styles.usrtext}>                    全新精靈上架啦!                    </Text></View>
            </View>
        </View>
        <View style={styles.card}>
            <Text style={styles.cardtext}>2023/11/27</Text>
            <View style={[styles.content,{backgroundColor:'#666666'}]}>
                <View style={styles.circleout}>
                <View style={styles.circle}>
                    <Image style={styles.image} source={require('../../assets/images/baby/baby0/300.png')}/>
                </View></View>

                <View style={styles.contenttext}>
                <Text style={styles.usrtext}>                    全新精靈上架啦!                    </Text></View>
            </View>
        </View>
        <View style={styles.card}>
                <Text style={styles.cardtext}>2023/11/27</Text>
                <View style={[styles.content,{backgroundColor:'#e2c997'}]}>
                    <View style={styles.circleout}>
                    <View style={styles.circle}>
                        <Image style={styles.image} source={require('../../assets/images/baby/baby0/258.png')}/>
                    </View></View>

                    <View style={styles.contenttext}>
                    <Text style={styles.usrtext}>                    全新精靈上架啦!                    </Text></View>
                </View>
        </View>
        <View style={styles.card}>
                <Text style={styles.cardtext}>2023/11/27</Text>
                <View style={[styles.content,{backgroundColor:'#ece1cf'}]}>
                    <View style={styles.circleout}>
                    <View style={styles.circle}>
                        <Image style={styles.image} source={require('../../assets/images/baby/baby0/216.png')}/>
                    </View></View>

                    <View style={styles.contenttext}>
                    <Text style={styles.usrtext}>                    全新精靈上架啦!                    </Text></View>
                </View>
        </View>
        <View style={styles.card}>
                <Text style={styles.cardtext}>2023/11/27</Text>
                <View style={[styles.content,{backgroundColor:'#fbcda1'}]}>
                    <View style={styles.circleout}>
                    <View style={styles.circle}>
                        <Image style={styles.image} source={require('../../assets/images/baby/baby0/174.png')}/>
                    </View></View>

                    <View style={styles.contenttext}>
                    <Text style={styles.usrtext}>                    全新精靈上架啦!                    </Text></View>
                </View>
        </View>
        <View style={styles.card}>
                <Text style={styles.cardtext}>2023/11/27</Text>
                <View style={[styles.content,{backgroundColor:'#a8aab3'}]}>
                    <View style={styles.circleout}>
                    <View style={styles.circle}>
                        <Image style={styles.image} source={require('../../assets/images/baby/baby0/132.png')}/>
                    </View></View>

                    <View style={styles.contenttext}>
                    <Text style={styles.usrtext}>                    全新精靈上架啦!                    </Text></View>
                </View>
        </View>
        <View style={styles.card}>
                <Text style={styles.cardtext}>2023/11/27</Text>
                <View style={[styles.content,{backgroundColor:'#cdb4a6'}]}>
                    <View style={styles.circleout}>
                    <View style={styles.circle}>
                        <Image style={styles.image} source={require('../../assets/images/baby/baby0/90.png')}/>
                    </View></View>

                    <View style={styles.contenttext}>
                    <Text style={styles.usrtext}>                    全新精靈上架啦!                    </Text></View>
                </View>
        </View>
        <View style={styles.card}>
                <Text style={styles.cardtext}>2023/11/27</Text>
                <View style={[styles.content,{backgroundColor:'#ffc3bc'}]}>
                    <View style={styles.circleout}>
                    <View style={[styles.circle]}>
                        <Image style={styles.image} source={require('../../assets/images/baby/baby0/48.png')}/>
                    </View></View>

                    <View style={styles.contenttext}>
                    <Text style={styles.usrtext}>                    全新精靈上架啦!                    </Text></View>
                </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardtext}>2023/11/27</Text>
            <View style={[styles.content,{backgroundColor:'#f5eab8'}]}>
              <View style={styles.circleout}>
                  <View style={[styles.circle,{backgroundColor:'#f5eab8'}]}>
                      <Image style={styles.image} source={require('../../assets/images/baby/baby0/6.png')}/>
                  </View>
              </View>

            <View style={styles.contenttext}> <Text style={styles.usrtext}>                    全新精靈上架啦!                    </Text></View>
            </View>
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
  cardtext:{
    fontWeight:'300',
    fontSize:16,
  },
  content: {
    backgroundColor:'white',
    flexDirection: 'column',
    marginTop: 10,
    alignItems: 'center',
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor:'#fff5c5',
    //backgroundColor:'#fec3bc',
  },
  circleout:{
    margin:5,
    height:220,
    width:220,
    borderRadius:120,
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',
  },
  circle:{
    borderRadius:100,
    backgroundColor:'#f5eab8',
  },
  contenttext:{
    flex: 1,
    backgroundColor:'white',
    width:'100%',
  },
  image:{
    height:200,
    width:200,
    resizeMode:'contain'
  },
  usrtext:{
    fontSize:18,
    fontWeight:'500',
    padding:5,
    margin:10,
    //color:'#338168'
  },
  info:{
    margin:20,
    backgroundColor:'white',
    borderRadius:30,
  },
  data:{
    margin:10,
    padding:10,
  },
  datatext:{
    fontSize:20,
  },
});

// 導出該組件供其他組件使用
export default News;
