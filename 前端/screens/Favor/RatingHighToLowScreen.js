import React from 'react';
import { View } from 'react-native';
import FavoriteHeader from '../../components/FavoriteHeader';

const RatingHighToLowScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <FavoriteHeader title="評分高->低" navigation={null} />

      {/* Content for RatingHighToLowScreen */}
      {/* ... */}
    </View>
  );
};

export default RatingHighToLowScreen;
