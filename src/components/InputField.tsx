import { cn } from "@/utils/cn";
import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  ViewProps,
  TextInputProps,
} from "react-native";

interface InputFieldProps extends ViewProps {
  label?: string;
  icon?: React.ReactNode;
  secureTextEntry?: boolean;
  value?: string;
  keyboardType?: TextInputProps["keyboardType"];
  onChangeText?: (text: string) => void;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
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
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // Função para clonar o ícone e adicionar a prop de cor
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

  return (
    <View
      className={cn(
        "flex-row items-center py-2 px-4 rounded-xl bg-gray-50",
        isFocused && "border border-primary/50 bg-primary/5",
        className,
      )}
    >
      <View className="mr-3">{renderIconWithColor(icon)}</View>
      <TextInput
        className="flex-1 text-gray-900 font-urbanist-regular text-base"
        value={value}
        onChangeText={onChangeText}
        placeholder={label}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
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
