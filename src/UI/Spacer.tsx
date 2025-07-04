import React from 'react';
import { View, StyleProp, ViewStyle, DimensionValue } from 'react-native';

interface SpacerProps {
  height?: number;
  width?: number | `${number}%`;
  style?: StyleProp<ViewStyle>;
}

export const Spacer: React.FC<SpacerProps> = ({ height = 24, width = '100%', style }) => {
  return <View style={[{ height, width: width as DimensionValue }, style]} />;
};

export default Spacer; 