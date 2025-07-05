import React from 'react';
import { Pressable, Text, ActivityIndicator, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const VARIANTS = ['primary', 'secondary', 'outline', 'ghost', 'destructive', 'blue', 'green', 'orange'] as const;
type Variant = typeof VARIANTS[number];
const SIZES = ['default', 'sm', 'lg', 'icon'] as const;
type Size = typeof SIZES[number];

interface BtnProps {
  children?: React.ReactNode;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  accessibilityLabel?: string;
}

const styles = StyleSheet.create((theme) => ({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    minHeight: 40,
    gap: theme.gap(0.5),
    backgroundColor: 'transparent',
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  destructive: {
    backgroundColor: theme.colors.error,
  },
  blue: {
    backgroundColor: theme.colors.info,
  },
  green: {
    backgroundColor: theme.colors.success,
  },
  orange: {
    backgroundColor: theme.colors.warning,
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.6,
  },
  fullWidth: {
    width: '100%',
  },
  default: {},
  sm: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    minHeight: 32,
  },
  lg: {
    paddingVertical: 16,
    paddingHorizontal: 28,
    minHeight: 48,
  },
  icon: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    minWidth: 40,
    minHeight: 40,
    borderRadius: 999,
  },
  text: {
    color: theme.colors.background,
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  outlineText: {
    color: theme.colors.text,
  },
  ghostText: {
    color: theme.colors.text,
  },
  destructiveText: {
    color: theme.colors.background,
  },
  blueText: {
    color: theme.colors.background,
  },
  greenText: {
    color: theme.colors.background,
  },
  orangeText: {
    color: theme.colors.background,
  },
  smText: {
    fontSize: 14,
  },
  lgText: {
    fontSize: 18,
  },
  iconText: {},
}));

const textVariantMap = {
  primary: styles.text,
  secondary: styles.text,
  outline: styles.outlineText,
  ghost: styles.ghostText,
  destructive: styles.destructiveText,
  blue: styles.blueText,
  green: styles.greenText,
  orange: styles.orangeText,
} as const;

const textSizeMap = {
  default: {},
  sm: styles.smText,
  lg: styles.lgText,
  icon: styles.iconText,
} as const;

export const Button: React.FC<BtnProps> = ({
  children,
  onPress,
  variant = 'primary',
  size = 'default',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
  accessibilityLabel,
}) => {
  const s = styles;
  return (
    <Pressable
      style={({ pressed }) => [
        s.base,
        s[variant],
        s[size],
        fullWidth && s.fullWidth,
        disabled && s.disabled,
        pressed && !disabled && s.pressed,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: disabled || loading }}
    >
      {loading ? (
        <ActivityIndicator color={s.text.color} />
      ) : (
        typeof children === 'string' ? (
          <Text style={[
            s.text,
            textVariantMap[variant],
            textSizeMap[size],
            textStyle,
          ]}>{children}</Text>
        ) : (
          children
        )
      )}
    </Pressable>
  );
};

export default Button; 