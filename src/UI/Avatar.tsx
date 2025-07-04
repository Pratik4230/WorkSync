import React from 'react';
import { Image, View, Text, StyleProp, ViewStyle, TextStyle, ImageSourcePropType } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const SIZES = {
  sm: 32,
  md: 40,
  lg: 56,
  xl: 72,
} as const;
type Size = keyof typeof SIZES;

interface AvatarProps {
  source?: ImageSourcePropType;
  alt?: string;
  size?: Size;
  rounded?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const styles = StyleSheet.create((theme) => ({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: theme.colors.primary,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  fallback: {
    color: theme.colors.text,
    fontWeight: 'bold',
    textAlign: 'center',
  },
}));

export const Avatar: React.FC<AvatarProps> = ({
  source,
  alt,
  size = 'md',
  rounded = true,
  style,
  textStyle,
}) => {
  const dimension = SIZES[size];
  const borderRadius = rounded ? dimension / 2 : 8;
  const s = styles;

  // Fallback: show initials from alt, or '?' if not provided
  const getInitials = (text?: string) => {
    if (!text) return '?';
    const words = text.trim().split(' ');
    if (words.length === 1) return words[0][0]?.toUpperCase() || '?';
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  return (
    <View
      style={[s.root, { width: dimension, height: dimension, borderRadius }, style]}
      accessibilityLabel={alt}
    >
      {source ? (
        <Image source={source} style={[s.image]} />
      ) : (
        <Text style={[s.fallback, { fontSize: dimension / 2 }, textStyle]}>{getInitials(alt)}</Text>
      )}
    </View>
  );
};

export default Avatar; 