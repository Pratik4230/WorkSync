import React from 'react';
import { View, StyleProp, ViewStyle, Animated } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

interface SkeletonProps {
  width?: number | `${number}%`;
  height?: number | `${number}%`;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create((theme) => ({
  base: {
    backgroundColor: theme.colors.border,
    overflow: 'hidden',
  },
}));

export const Skeleton: React.FC<SkeletonProps> = ({ width = '100%', height = 16, borderRadius = 8, style }) => {
  // Simple shimmer animation
  const shimmer = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(shimmer, { toValue: 0, duration: 1200, useNativeDriver: true }),
      ])
    ).start();
  }, [shimmer]);

  const animatedStyle = {
    opacity: shimmer.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] }),
  };

  return (
    <Animated.View
      style={[
        styles.base,
        { width: width as any, height: height as any, borderRadius },
        animatedStyle,
        style,
      ]}
    />
  );
};

// Composite skeletons
export const CardSkeleton: React.FC<{ style?: StyleProp<ViewStyle> }> = ({ style }) => (
  <View style={[{ width: '100%', padding: 16, borderRadius: 16, backgroundColor: 'transparent' }, style]}>
    <Skeleton width={'100%'} height={120} borderRadius={12} />
    <View style={{ height: 12 }} />
    <Skeleton width={'60%'} height={18} />
    <View style={{ height: 8 }} />
    <Skeleton width={'40%'} height={14} />
  </View>
);

export const PostSkeleton: React.FC<{ style?: StyleProp<ViewStyle> }> = ({ style }) => (
  <View style={[{ width: '100%', padding: 16, borderRadius: 16, backgroundColor: 'transparent', flexDirection: 'row', gap: 12 }, style]}>
    <Skeleton width={48} height={48} borderRadius={24} />
    <View style={{ flex: 1 }}>
      <Skeleton width={'80%'} height={16} />
      <View style={{ height: 8 }} />
      <Skeleton width={'100%'} height={12} />
      <View style={{ height: 8 }} />
      <Skeleton width={'90%'} height={12} />
    </View>
  </View>
);

export const ProfileSkeleton: React.FC<{ style?: StyleProp<ViewStyle> }> = ({ style }) => (
  <View style={[{ width: '100%', alignItems: 'center', padding: 24, backgroundColor: 'transparent' }, style]}>
    <Skeleton width={80} height={80} borderRadius={40} />
    <View style={{ height: 16 }} />
    <Skeleton width={120} height={18} />
    <View style={{ height: 8 }} />
    <Skeleton width={80} height={14} />
  </View>
);

export const ListItemSkeleton: React.FC<{ style?: StyleProp<ViewStyle> }> = ({ style }) => (
  <View style={[{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 12, backgroundColor: 'transparent' }, style]}>
    <Skeleton width={36} height={36} borderRadius={18} />
    <View style={{ width: 12 }} />
    <Skeleton width={'60%'} height={14} />
  </View>
);

export default Skeleton; 