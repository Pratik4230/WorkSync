import React from 'react';
import { View, Pressable, Animated, StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const VARIANTS = ['default', 'secondary', 'destructive'] as const;
type Variant = typeof VARIANTS[number];

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  variant?: Variant;
  style?: StyleProp<ViewStyle>;
  thumbStyle?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

const SWITCH_WIDTH = 44;
const SWITCH_HEIGHT = 26;
const THUMB_SIZE = 22;

const styles = StyleSheet.create((theme) => ({
  root: {
    width: SWITCH_WIDTH,
    height: SWITCH_HEIGHT,
    borderRadius: SWITCH_HEIGHT / 2,
    backgroundColor: theme.colors.border,
    justifyContent: 'center',
    padding: 2,
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
  disabled: {
    opacity: 0.5,
  },
  track: {
    width: '100%',
    height: '100%',
    borderRadius: SWITCH_HEIGHT / 2,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: theme.colors.background,
    shadowColor: theme.colors.text,
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
}));

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  variant = 'default',
  style,
  thumbStyle,
  accessibilityLabel,
}) => {
  const anim = React.useRef(new Animated.Value(checked ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(anim, {
      toValue: checked ? 1 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [checked, anim]);

  const s = styles;

  const trackColor = checked ? s[variant].backgroundColor : s.root.backgroundColor;
  const thumbTranslate = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, SWITCH_WIDTH - THUMB_SIZE - 2],
  });

  return (
    <Pressable
      style={[s.root, { backgroundColor: trackColor }, disabled && s.disabled, style]}
      onPress={() => !disabled && onChange(!checked)}
      accessibilityRole="switch"
      accessibilityState={{ checked, disabled }}
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
    >
      <View style={s.track}>
        <Animated.View
          style={[
            s.thumb,
            { transform: [{ translateX: thumbTranslate }] },
            thumbStyle,
          ]}
        />
      </View>
    </Pressable>
  );
};

export default Switch; 