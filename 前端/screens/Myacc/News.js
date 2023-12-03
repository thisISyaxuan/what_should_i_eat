import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";


//NewsCard 組件
const NewsCard = ({ date, backgroundColor, imageSource }) => (
    <View style={styles.card}>
        <Text style={styles.cardtext}>{date}</Text>
        <View style={[styles.content, { backgroundColor }]}>
            <View style={styles.circleout}>
                <View style={[styles.circle, { backgroundColor }]}>
                    <Image style={styles.image} source={imageSource}/>
                </View>
            </View>
            <View style={styles.contenttext}>
                <Text style={styles.usrtext}>全新精靈上架啦!</Text>
            </View>
        </View>
    </View>
);

// News 主組件
const News = () => {
    const navigation = useNavigation();

    return (
        <ScrollView>
            <NewsCard 
                date="2023/11/27" 
                backgroundColor='#ffd8c3' 
                imageSource={require('../../assets/images/baby/baby0/510.png')} 
            />
            <NewsCard 
                date="2023/11/27" 
                backgroundColor='#ffe4e4' 
                imageSource={require('../../assets/images/baby/baby0/468.png')} 
            />
            <NewsCard 
                date="2023/11/27" 
                backgroundColor='#cda686' 
                imageSource={require('../../assets/images/baby/baby0/426.png')} 
            />
            <NewsCard 
                date="2023/11/27" 
                backgroundColor='#9d8b8b' 
                imageSource={require('../../assets/images/baby/baby0/384.png')} 
            />
            <NewsCard 
                date="2023/11/27" 
                backgroundColor='#b1a9a9' 
                imageSource={require('../../assets/images/baby/baby0/342.png')} 
            />
            <NewsCard 
                date="2023/11/27" 
                backgroundColor='#666666' 
                imageSource={require('../../assets/images/baby/baby0/300.png')} 
            />
            <NewsCard 
                date="2023/11/27" 
                backgroundColor='#e2c997' 
                imageSource={require('../../assets/images/baby/baby0/258.png')} 
            />
            <NewsCard 
                date="2023/11/27" 
                backgroundColor='#ece1cf' 
                imageSource={require('../../assets/images/baby/baby0/216.png')} 
            />
            <NewsCard 
                date="2023/11/27" 
                backgroundColor='#fbcda1' 
                imageSource={require('../../assets/images/baby/baby0/174.png')} 
            />
            <NewsCard 
                date="2023/11/27" 
                backgroundColor='#a8aab3' 
                imageSource={require('../../assets/images/baby/baby0/132.png')} 
            />
            <NewsCard 
                date="2023/11/27" 
                backgroundColor='#cdb4a6' 
                imageSource={require('../../assets/images/baby/baby0/90.png')} 
            />
            <NewsCard 
                date="2023/11/27" 
                backgroundColor='#ffc3bc' 
                imageSource={require('../../assets/images/baby/baby0/48.png')} 
            />
            <NewsCard 
                date="2023/11/27" 
                backgroundColor='#f5eab8' 
                imageSource={require('../../assets/images/baby/baby0/6.png')} 
            />
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
    //backgroundColor:'#f5eab8',
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
