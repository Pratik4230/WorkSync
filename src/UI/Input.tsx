import React from 'react';
import { TextInput, View, Text, StyleProp, ViewStyle, TextStyle, TextInputProps, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const VARIANTS = ['default', 'secondary', 'destructive'] as const;
type Variant = typeof VARIANTS[number];

interface InputProps extends Omit<TextInputProps, 'style'> {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: Variant;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  accessibilityLabel?: string;
  onRightIconPress?: () => void;
}

const styles = StyleSheet.create((theme) => ({
  root: {
    width: '100%',
    marginBottom: theme.gap(1),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.gap(1),
    paddingHorizontal: theme.gap(1.5),
    paddingVertical: theme.gap(1),
    gap: theme.gap(0.5),
  },
  input: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 16,
    padding: 0,
    backgroundColor: 'transparent',
  },
  default: {},
  secondary: {
    borderColor: theme.colors.textSecondary,
  },
  destructive: {
    borderColor: theme.colors.error,
  },
  disabled: {
    opacity: 0.6,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 13,
    marginTop: 4,
    marginLeft: 4,
  },
}));

export const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  disabled = false,
  error,
  leftIcon,
  rightIcon,
  variant = 'default',
  style,
  inputStyle,
  accessibilityLabel,
  onRightIconPress,
  ...rest
}) => {
  return (
    <View style={styles.root}>
      <View
        style={[
          styles.container,
          styles[variant],
          disabled && styles.disabled,
          error && styles.destructive,
          style,
        ]}
      >
        {leftIcon && <View style={{ marginRight: 8 }}>{leftIcon}</View>}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          editable={!disabled}
          style={[styles.input, inputStyle]}
          placeholderTextColor={variant === 'destructive' || error ? styles.destructive.borderColor : styles.input.color}
          accessibilityLabel={accessibilityLabel}
          {...rest}
        />
        {rightIcon && (
          onRightIconPress ? (
            <TouchableOpacity onPress={onRightIconPress} disabled={disabled} style={{ marginLeft: 8 }}>
              {rightIcon}
            </TouchableOpacity>
          ) : (
            <View style={{ marginLeft: 8 }}>{rightIcon}</View>
          )
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default Input; 