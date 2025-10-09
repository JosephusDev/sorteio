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
import { router } from "expo-router";
import Divider from "@/components/Divider";

export default function SignIn() {
  const [name, setName] = useState("");
  const [telefone, setTelefone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 pt-12">

        {/* Título */}
        <Text className="text-3xl font-urbanist-bold text-gray-900 mb-12">
          Fazer Login
        </Text>

        {/* Formulário */}
        <View className="flex-col gap-4 mb-8">

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

          <Button title="Entrar" onPress={() => router.push('/(protected)/home')} className="mt-4" />
        </View>

        <TouchableOpacity activeOpacity={1} onPress={()=>router.push("/forgot-password")}>
          <Divider text="Esqueceu a palavra-passe?" />
        </TouchableOpacity>

        {/* Login Link */}
        <View className="flex-row justify-center items-center my-8">
          <Text className="text-gray-500">Ainda não tem uma conta?</Text>
          <TouchableOpacity className="ml-1" onPress={()=>router.push("/sign-up")}>
            <Text className="text-primary font-urbanist-bold">Criar Conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
