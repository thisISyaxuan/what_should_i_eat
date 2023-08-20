import React from 'react';
import { View } from 'react-native';
import FavoriteHeader from '../../components/FavoriteHeader';

const DistanceNearToFarScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <FavoriteHeader title="距離近->遠" navigation={null} />

      {/* Content for DistanceNearToFarScreen */}
      {/* ... */}
    </View>
  );
};

export default DistanceNearToFarScreen;
