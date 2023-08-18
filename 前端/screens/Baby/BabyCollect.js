import React from 'react';
import { View, StyleSheet, Image, FlatList,Text} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { images } from '../../data/dummyImage';
import { TouchableOpacity } from 'react-native';
const BabyCollect = () => {
    const navigation = useNavigation();
    const renderItem = ({ item }) => (
        <View style={styles.circle}>
            <TouchableOpacity style={styles.image}>
              <Image style={styles.pic} source={item} />
            </TouchableOpacity>

            <View  style={styles.money}>
              <Image style={styles.icon} source={require('../../assets/images/coin.png')}/>
              <Text> 30</Text></View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={images}
                renderItem={renderItem}
                numColumns={3}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.listContainer}
                style={styles.flatlist}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
    },
    flatlist:{
        
    },
    listContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
        padding:5,
    },
    itemContainer: {
        marginBottom: 10,
        alignItems: 'center', 
    },
    circle: {
        flexDirection: 'column',
        width: '33%',
        height:140,
        alignItems: 'center', 
    },
    image: {
        borderWidth:1,
        borderColor:'#f6d58a',
        width: '90%',
        aspectRatio: 1,
        borderRadius:60,
        alignItems: 'center', 
        justifyContent:'center',
        padding:5,
    },
    money:{
        marginTop: 'auto',
        flexDirection: 'row',
        padding:5,
        width:'60%',
        alignItems: 'center', 
        justifyContent: 'center',
    },
    icon: {
        width: 20,
        height: 20,
      },
    pic: {
        width: '100%',
        height: '100%',
        aspectRatio: 1,
      },
    imageText: {
        marginTop: 5,
        fontSize: 12,
        color: 'gray',
    },
});

export default BabyCollect;
