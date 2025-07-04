import React from 'react';
import { Text, View, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const VARIANTS = ['default', 'secondary', 'destructive'] as const;
type Variant = typeof VARIANTS[number];

interface LabelProps {
  children: React.ReactNode;
  htmlFor?: string; // for accessibility, not used in RN but for API parity
  required?: boolean;
  variant?: Variant;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  accessibilityLabel?: string;
}


export const Label: React.FC<LabelProps> = ({
  children,
  htmlFor,
  required = false,
  variant = 'default',
  style,
  textStyle,
  accessibilityLabel,
}) => {
  return (
    <View style={[styles.base, style]} accessibilityLabel={accessibilityLabel}>
      <Text style={[styles.text, styles[variant], textStyle]}>{children}</Text>
      {required && <Text style={styles.required}>*</Text>}
    </View>
  );
};


const styles = StyleSheet.create((theme) => ({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.gap(0.5),
    marginBottom: 4,
  },
  text: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  default: {},
  secondary: {
    color: theme.colors.textSecondary,
  },
  destructive: {
    color: theme.colors.error,
  },
  required: {
    color: theme.colors.error,
    marginLeft: 2,
    fontSize: 16,
    fontWeight: 'bold',
  },
}));

export default Label; 