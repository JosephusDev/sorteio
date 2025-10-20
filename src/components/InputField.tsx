import { cn } from "@/utils/cn";
import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  ViewProps,
  TextInputProps,
} from "react-native";
import MaskInput from "react-native-mask-input";

interface InputFieldProps extends ViewProps {
  label?: string;
  icon?: React.ReactNode;
  secureTextEntry?: boolean;
  value?: string;
  keyboardType?: TextInputProps["keyboardType"];
  onChangeText?: (text: string) => void;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  hasMask?: boolean; // 👈 nova prop
  mask?: (string | RegExp)[]; // 👈 máscara opcional
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  icon,
  secureTextEntry = false,
  value,
  onChangeText,
  rightIcon,
  onRightIconPress,
  className,
  keyboardType = "default",
  hasMask = false,
  mask,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const renderIconWithColor = (iconElement: React.ReactNode) => {
    if (React.isValidElement(iconElement)) {
      const props = iconElement.props as any;
      return React.cloneElement(iconElement as React.ReactElement<any>, {
        color: isFocused ? "#4D5DFA" : "#676767",
        style: props.style,
      });
    }
    return iconElement;
  };

  const commonInputProps = {
    value,
    onChangeText,
    placeholder: label,
    secureTextEntry,
    keyboardType,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    className: "flex-1 text-gray-900 font-urbanist-regular text-base",
  };

  return (
    <View
      className={cn(
        "flex-row items-center py-2 px-4 rounded-xl bg-gray-100",
        isFocused && "border border-primary/50 bg-primary/5",
        className,
      )}
    >
      {icon && <View className="mr-3">{renderIconWithColor(icon)}</View>}

      {hasMask ? (
        <MaskInput {...commonInputProps} mask={mask} />
      ) : (
        <TextInput {...commonInputProps} />
      )}

      {rightIcon && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={onRightIconPress}
          className="ml-2"
        >
          {renderIconWithColor(rightIcon)}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputField;
