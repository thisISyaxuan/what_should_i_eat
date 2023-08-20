import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const FavoriteHeader = ({ title, navigation }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Back</Text>
      </TouchableOpacity>
      <Text style={{ flex: 1, textAlign: 'center' }}>{title}</Text>
    </View>
  );
};

export default FavoriteHeader;
