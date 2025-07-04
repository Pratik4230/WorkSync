import React from 'react';
import { Pressable, Text, ActivityIndicator, View, ViewStyle, TextStyle, StyleProp } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';

// Button variants and sizes
const VARIANTS = ['primary', 'secondary', 'outline', 'ghost', 'destructive', 'blue', 'green', 'orange'] as const;
type Variant = typeof VARIANTS[number];
const SIZES = ['default', 'sm', 'lg', 'icon'] as const;
type Size = typeof SIZES[number];

interface ButtonProps {
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

export const Button: React.FC<ButtonProps> = ({
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
  const { theme } = useUnistyles();
  const styles = createStyles(theme, { variant, size, fullWidth, disabled });

  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: disabled || loading }}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.text} />
      ) : (
        typeof children === 'string' ? (
          <Text style={[styles.text, styles[`${variant}Text`], styles[`${size}Text`], textStyle]}>{children}</Text>
        ) : (
          children
        )
      )}
    </Pressable>
  );
};

const createStyles = (theme: any, { variant, size, fullWidth, disabled }: any) => ({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: size === 'lg' ? 16 : size === 'sm' ? 6 : 12,
    paddingHorizontal: size === 'lg' ? 28 : size === 'sm' ? 12 : 20,
    minHeight: size === 'lg' ? 48 : size === 'sm' ? 32 : 40,
    minWidth: size === 'icon' ? 40 : undefined,
    opacity: disabled ? 0.6 : 1,
    borderWidth: variant === 'outline' ? 1 : 0,
    borderColor: variant === 'outline' ? theme.colors.border : 'transparent',
    width: fullWidth ? '100%' : undefined,
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
    backgroundColor: theme.colors.blue ? theme.colors.blue[500] : '#3b82f6',
  },
  green: {
    backgroundColor: theme.colors.green ? theme.colors.green[500] : '#22c55e',
  },
  orange: {
    backgroundColor: theme.colors.orange ? theme.colors.orange[500] : '#f97316',
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
    color: variant === 'outline' || variant === 'ghost' ? theme.colors.text : theme.colors.background,
    fontWeight: '600',
    fontSize: size === 'lg' ? 18 : size === 'sm' ? 14 : 16,
    textAlign: 'center',
  },
  primaryText: {
    color: theme.colors.background,
  },
  secondaryText: {
    color: theme.colors.background,
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
  defaultText: {},
  smText: {
    fontSize: 14,
  },
  lgText: {
    fontSize: 18,
  },
  iconText: {},
});

export default Button; 