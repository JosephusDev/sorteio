import React, { useState } from "react";
import { View, ScrollView, Image } from "react-native";
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
} from "@/assets/icons";
import { Text } from "@/components/Text";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import { router } from "expo-router";

export default function RecoveryPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleContinue = () => {
    if (password !== confirmPassword) {
      return;
    }
    router.push("/congrats");
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 pt-12">
        <Image source={require("@/assets/images/new-password.png")} resizeMode="contain" className="w-48 h-48 self-center" />

        {/* Título */}
        <Text className="text-gray-900 mt-12">
          Crie sua nova senha
        </Text>

        {/* Campos de Código */}
        <View className="flex justify-center gap-4 my-8">
          <InputField
            label="Palavra-passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            icon={<LockIcon />}
            rightIcon={showPassword ? <EyeIcon /> : <EyeOffIcon />}
            onRightIconPress={() => setShowPassword(!showPassword)}
          />
          <InputField
            label="Confirmar palavra-passe"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            icon={<LockIcon />}
            rightIcon={showConfirmPassword ? <EyeIcon /> : <EyeOffIcon />}
            onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        </View>
      </ScrollView>

      {/* Botão Fixo na Parte Inferior */}
      <View className="px-6 pb-8 pt-4 bg-white border-t border-gray-100">
        <Button
          title="Continuar"
          onPress={handleContinue}
          disabled={password !== confirmPassword || password.length === 0 || confirmPassword.length === 0}
        />
      </View>
    </View>
  );
}
