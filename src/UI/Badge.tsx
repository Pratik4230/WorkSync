import React from 'react';
import { View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const VARIANTS = ['default', 'secondary', 'destructive', 'outline'] as const;
type Variant = typeof VARIANTS[number];
const SIZES = {
  sm: { height: 18, paddingHorizontal: 6, fontSize: 12 },
  md: { height: 22, paddingHorizontal: 10, fontSize: 14 },
  lg: { height: 28, paddingHorizontal: 14, fontSize: 16 },
} as const;
type Size = keyof typeof SIZES;

interface BadgeProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const styles = StyleSheet.create((theme) => ({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: theme.colors.primary,
    height: SIZES.md.height,
    paddingHorizontal: SIZES.md.paddingHorizontal,
    minWidth: SIZES.md.height,
  },
  text: {
    color: theme.colors.background,
    fontWeight: 'bold',
    fontSize: SIZES.md.fontSize,
    textAlign: 'center',
  },
  default: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
  },
  destructive: {
    backgroundColor: theme.colors.error,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  sm: {
    height: SIZES.sm.height,
    paddingHorizontal: SIZES.sm.paddingHorizontal,
    minWidth: SIZES.sm.height,
  },
  md: {
    height: SIZES.md.height,
    paddingHorizontal: SIZES.md.paddingHorizontal,
    minWidth: SIZES.md.height,
  },
  lg: {
    height: SIZES.lg.height,
    paddingHorizontal: SIZES.lg.paddingHorizontal,
    minWidth: SIZES.lg.height,
  },
  smText: {
    fontSize: SIZES.sm.fontSize,
  },
  mdText: {
    fontSize: SIZES.md.fontSize,
  },
  lgText: {
    fontSize: SIZES.lg.fontSize,
  },
}));

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  style,
  textStyle,
}) => {
  return (
    <View style={[styles.root, styles[variant], styles[size], style]}>
      <Text style={[styles.text, styles[`${size}Text`], textStyle]}>{children}</Text>
    </View>
  );
};

export default Badge;
