// src/components/Toast.tsx
import { BellIcon, CheckIcon, HelpStrikeIcon, XIcon } from '@/assets/icons';
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from './Text';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top' | 'bottom';

interface ToastProps {
  visible: boolean;
  message: string;
  title?: string;
  variant?: ToastVariant;
  position?: ToastPosition;
  duration?: number;
  onClose: () => void;
}

const variantStyles = {
  success: {
    backgroundColor: '#4ADE80',
  },
  error: {
    backgroundColor: '#F75555',
  },
  warning: {
    backgroundColor: '#FACC15',
  },
  info: {
    backgroundColor: '#246BFD',
  },
};

const Icon = ({ variant }: {variant: ToastVariant}) => {
  switch (variant) {
    case 'success':
      return <CheckIcon color={"#fff"} />
    case 'error':
      return <XIcon color={"#fff"} />
    default:
      <BellIcon color={"#fff"} />;
  }
}

export const Toast: React.FC<ToastProps> = ({
  visible,
  message,
  title,
  variant = 'success',
  position = 'top',
  duration = 3000,
  onClose,
}) => {
  const insets = useSafeAreaInsets();
  const translateY = useSharedValue(position === 'top' ? -200 : 200);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0, {
        damping: 15,
        stiffness: 100,
      });
      opacity.value = withTiming(1, { duration: 300 });

      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    } else {
      translateY.value = withTiming(
        position === 'top' ? -200 : 200,
        { duration: 300 }
      );
      opacity.value = withTiming(0, { duration: 300 });
    }
  }, [visible]);

  const handleClose = () => {
    translateY.value = withTiming(
      position === 'top' ? -200 : 200,
      { duration: 300 },
      () => {
        runOnJS(onClose)();
      }
    );
    opacity.value = withTiming(0, { duration: 300 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const positionStyle =
    position === 'top'
      ? { top: insets.top + 16 }
      : { bottom: insets.bottom + 16 };

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        positionStyle,
        animatedStyle,
      ]}
    >
      <View style={[styles.toast, variantStyles[variant]]}>
        <View style={styles.iconContainer}>{<Icon variant={variant} />}</View>
        
        <View style={styles.content}>
          {title && <Text className='font-urbanist-bold text-lg text-white'>{title}</Text>}
          <Text className='text-white font-urbanist-medium'>{message}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 9999,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  iconContainer: {
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  closeButton: {
    padding: 4,
    marginLeft: 8,
  },
});