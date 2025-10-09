import { cn } from "@/utils/cn";
import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "outline";
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  className,
  disabled = false,
  ...rest
}) => {
  return (
    <TouchableOpacity
      className={cn(
        `
        py-4 px-6 rounded-full items-center justify-center
        ${variant === "primary" ? "bg-primary" : "bg-white border border-gray-200"}
        ${disabled ? "opacity-80" : ""}
      `,
        className,
      )}
      activeOpacity={0.9}
      disabled={disabled}
      {...rest}
    >
      <Text
        className={`
          font-urbanist-bold text-base
          ${variant === "primary" ? "text-white" : "text-gray-900"}
        `}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
