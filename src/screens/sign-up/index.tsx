import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import {
  ChevronLeftIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  PhoneIcon,
  UserIcon,
} from "@/assets/icons";
import { Text } from "@/components/Text";
import InputField from "@/components/InputField";
import Button from "@/components/Button";

export default function SignUp() {
  const [name, setName] = useState("");
  const [telefone, setTelefone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 pt-12">
        {/* Navbar */}
        <View className="flex-row items-center mb-8">
          <TouchableOpacity className="py-2">
            <ChevronLeftIcon />
          </TouchableOpacity>
        </View>

        {/* Título */}
        <Text className="text-3xl font-urbanist-bold text-gray-900 mb-12">
          Crie sua conta
        </Text>

        {/* Formulário */}
        <View className="flex-col gap-4 mb-8">
          <InputField
            label="Nome"
            value={name}
            onChangeText={setName}
            icon={<UserIcon />}
          />

          <InputField
            label="Telefone"
            value={telefone}
            onChangeText={setTelefone}
            icon={<PhoneIcon />}
            keyboardType="phone-pad"
          />

          <InputField
            label="Palavra-passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            icon={<LockIcon />}
            rightIcon={showPassword ? <EyeIcon /> : <EyeOffIcon />}
            onRightIconPress={() => setShowPassword(!showPassword)}
          />

          <Button title="Criar Conta" onPress={() => {}} className="mt-4" />
        </View>

        {/* Login Link */}
        <View className="flex-row justify-center items-center mb-8">
          <Text className="text-gray-500">Já tem uma conta?</Text>
          <TouchableOpacity className="ml-1">
            <Text className="text-primary font-urbanist-bold">Fazer Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
