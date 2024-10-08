import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Image, FlatList, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { images } from '../../data/babyImage';
import { baby_DATA } from '../../data/baby';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { link } from '../../data/apiLink';

const BabyCollect = () => {
    const navigation = useNavigation();
    const [ownedBabies, setOwnedBabies] = useState([baby_DATA[0].id]);
    const [coins, setCoins] = useState(0);  // 用戶餘額
    const [myskin,setmyskin] = useState();  // 用戶選擇的皮膚

    useEffect(() => {
        const fetchOwnedBabiesAndCoins = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                const avatar = await AsyncStorage.getItem('avatarId');
                if (token) {
                    if (avatar){
                        setmyskin(avatar);
                    }else{
                        setmyskin(null);
                    }
                    fetch(link.babyBaby, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Token ${token}`
                        },
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error("Failed to fetch data");
                            }
                            return response.json();
                        })
                        .then(data => {
                            let updatedOwnedBabies = [...new Set([...data.ownedBabies, baby_DATA[0].id])];
                            setOwnedBabies(updatedOwnedBabies);
                            setCoins(data.coins);
                        })
                        .catch((error) => {
                            console.error('獲取數據出錯:', error);
                            Alert.alert('錯誤', '無法從伺服器獲取數據，請稍後再試。');
                        });
                } else {
                    console.log('未能取得token');
                    Alert.alert('錯誤', '未能取得使用者Token，請重新登入。');
                }
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };

        fetchOwnedBabiesAndCoins();
    }, []);

    const changeAvatar = useCallback((baby) => {
        Alert.alert(
          '更換大頭貼',
          `您確定要更換該大頭貼嗎？`,
          [
            { text: '取消', style: 'cancel' },
            {
              text: '確認更換',
              onPress: async () => {
                try {
                  const token = await AsyncStorage.getItem('userToken');
                  if (!token) {
                    throw new Error('未能取得token');
                  }
    
                  const response = await fetch(link.getUsrSkin, { // 請填寫正確的後端接口
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Token ${token}`
                    },
                    body: JSON.stringify({
                      baby_image_id: baby.id,  // 修改成使用baby的id
                      baby_name: baby.name    // 假設baby物件有name屬性
                    })
                  });
    
                  const data = await response.json();
    
                  if (data.success) {
                    // Save the baby id to local storage as well
                    await AsyncStorage.setItem('avatarId', baby.id.toString());
                    // Update the myskin state to reflect the new avatar
                    setmyskin(baby.id.toString());
                    Alert.alert('成功', '已成功更換大頭貼！');
                  } else {
                    Alert.alert('失敗', '更換大頭貼失敗，請稍後再試。');
                  }
                } catch (error) {
                  console.error('Error changing avatar:', error);
                  Alert.alert('錯誤', '更換大頭貼失敗，請稍後再試。');
                }
              },
            },
          ],
        );
      }, [navigation]);
    

      const purchaseBaby = useCallback(async (baby) => {
        if (coins < baby.price) {
            Alert.alert('雞腿幣不足', '您的雞腿幣不足，無法購買！');
            return;
        }

        Alert.alert(
            '購買確認',
            `您確定要花費 ${baby.price} 雞腿幣購買嗎？`,
            [
                { text: '取消', style: 'cancel' },
                {
                    text: '確認購買',
                    onPress: async () => {
                        try {
                            const token = await AsyncStorage.getItem('userToken');
                            if (!token) {
                                console.error('未能取得token');
                                return;
                            }

                            const response = await fetch(link.buyBaby, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Token ${token}`
                                },
                                body: JSON.stringify({
                                    baby_Id: baby.id
                                })
                            });

                            if (!response.ok) {
                                console.error('購買失敗，請檢查您的網絡連接或伺服器狀態');
                                return;
                            }

                            const data = await response.json();
                            setCoins(data.coins);
                            if (data.success) {
                                let newOwnedBabies = [...ownedBabies, baby.id];
                                setOwnedBabies(newOwnedBabies);
                                Alert.alert('購買成功', `您已成功購買此項目，目前餘額為 ${data.coins} 雞腿幣。`);
                            } else {
                                Alert.alert('購買失敗', '您的雞腿幣不足，請獲得更多雞腿幣後再試。');
                            }

                        } catch (error) {
                            console.error('購買過程中出現錯誤:', error);
                        }
                    },
                },
            ],
        );
    }, [coins, ownedBabies]);

    const renderItem = ({ item, index }) => (
        <View style={styles.circle}>
            <TouchableOpacity
                style={[styles.image, ownedBabies.includes(baby_DATA[index].id) ? styles.greenCircle : null]}  // 使用greenCircle樣式顯示綠色圓圈
                onPress={() => {
                    if(ownedBabies.includes(baby_DATA[index].id)){
                        changeAvatar(baby_DATA[index])
                    } else {
                        purchaseBaby(baby_DATA[index]);
                    }
                }}
            >
                <Image style={styles.pic} source={item} />
                {!ownedBabies.includes(baby_DATA[index].id) &&  <View style={[styles.mask]} />}
                {baby_DATA[index].id.toString() === myskin ? (
                    <View style={styles.overlay}>
                        <Image source={require('../../assets/images/checked.png')} style={styles.overlayImage} />
                    </View>
                    ):null}
            </TouchableOpacity>
            {!ownedBabies.includes(baby_DATA[index].id) && (
                <View style={styles.money}>
                    <Image style={styles.icon} source={require('../../assets/images/coin.png')} />
                    <Text> {baby_DATA[index].price}</Text>
                </View>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.coinsContainer}>
                <Image style={styles.coinIcon} source={require('../../assets/images/coin.png')} />
                <Text style={styles.coinsText}>雞腿幣：{coins}</Text>
            </View>
            
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
        justifyContent: 'center',
    },
    coinsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        alignSelf: 'center',
    },
    flatlist: {},
    listContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
        padding: 5,
    },
    circle: {
        flexDirection: 'column',
        width: '33%',
        height: 160,
        alignItems: 'center',
//        marginVertical: 5, // 增加垂直間距
    },
    image: {
        borderWidth: 1,
        borderColor: '#f6d58a',
        width: '90%',
        aspectRatio: 1,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    overlay: {
        position: 'absolute', //把疊加圖片放在圓圈上方
        top: 5, //控制疊加綠色圖片的位置，可以根據需要微調
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      },
      overlayImage: {
        width: '100%',
        height: '100%',
        opacity: 0.7, //控制疊加綠色圖片的透明度
      },
    mask: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: 60,
    },
    greenCircle: {  // 定義綠色圓圈的樣式
        borderColor: 'green',
        borderWidth: 3,
    },
    money: {
//        marginTop: 'auto',
        flexDirection: 'row',
        padding: 5,
        width: '60%',
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
    coinIcon: {
        width: 24,
        height: 24,
        marginRight: 8,
    },
    coinsText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default BabyCollect;
