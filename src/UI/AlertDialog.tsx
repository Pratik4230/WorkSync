import React from 'react';
import { Modal, View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import Button from './Button';

interface AlertDialogProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
  confirmButtonStyle?: StyleProp<ViewStyle>;
  cancelButtonStyle?: StyleProp<ViewStyle>;
  confirmVariant?: React.ComponentProps<typeof Button>["variant"];
  cancelVariant?: React.ComponentProps<typeof Button>["variant"];
}

const styles = StyleSheet.create((theme) => ({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.gap(2),
    padding: theme.gap(3),
    minWidth: 280,
    maxWidth: '90%',
    alignItems: 'center',
    shadowColor: theme.colors.text,
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.gap(1),
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: theme.gap(2),
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    gap: theme.gap(1),
    marginTop: theme.gap(1),
  },
  button: {
    flex: 1,
  },
}));

export const AlertDialog: React.FC<AlertDialogProps> = ({
  visible,
  onClose,
  title,
  description,
  confirmLabel = 'OK',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  children,
  style,
  contentStyle,
  titleStyle,
  descriptionStyle,
  confirmButtonStyle,
  cancelButtonStyle,
  confirmVariant = 'primary',
  cancelVariant = 'secondary',
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={[styles.overlay, style]}>
        <View style={[styles.content, contentStyle]}>
          {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
          {description && <Text style={[styles.description, descriptionStyle]}>{description}</Text>}
          {children}
          <View style={styles.actions}>
            <Button
              variant={cancelVariant}
              style={[styles.button, cancelButtonStyle]}
              onPress={onCancel || onClose}
            >
              {cancelLabel}
            </Button>
            <Button
              variant={confirmVariant}
              style={[styles.button, confirmButtonStyle]}
              onPress={onConfirm || onClose}
            >
              {confirmLabel}
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AlertDialog; 