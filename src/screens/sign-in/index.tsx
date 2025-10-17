import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { EmailIcon, EyeIcon, EyeOffIcon, LockIcon } from "@/assets/icons";
import { Text } from "@/components/Text";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import { router } from "expo-router";
import Divider from "@/components/Divider";
import { useSignInMutation } from "@/queries/auth";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LabelError } from "@/components/LabelError";
import { SignInSchema } from "@/schemas/Auth";

export default function SignIn() {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignInSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const {
    mutateAsync: signIn,
    isPending,
    error,
  } = useSignInMutation({
    email: getValues("email"),
    password: getValues("password"),
  });

  const onSubmit = () => {
    signIn();
    console.log(error);
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 pt-12">
        {/* Título */}
        <Text className="text-3xl font-urbanist-bold text-gray-900 mb-12">
          Fazer Login
        </Text>

        {/* Formulário */}
        <View className="flex-col gap-4 mb-8">
          {/* E-mail */}
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="E-mail"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                icon={<EmailIcon />}
                keyboardType="email-address"
              />
            )}
            name="email"
          />
          {errors.email && <LabelError message={errors.email.message!} />}

          {/* Palavra-passe */}
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Palavra-passe"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry={!showPassword}
                icon={<LockIcon />}
                rightIcon={showPassword ? <EyeIcon /> : <EyeOffIcon />}
                onRightIconPress={() => setShowPassword(!showPassword)}
              />
            )}
            name="password"
          />
          {errors.password && <LabelError message={errors.password.message!} />}

          <Button
            title={isPending ? "Entrando..." : "Entrar"}
            onPress={handleSubmit(onSubmit)}
            disabled={isPending}
            className="mt-4"
          />
        </View>

        {/* Esqueceu a senha */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => router.push("/forgot-password")}
        >
          <Divider text="Esqueceu a palavra-passe?" />
        </TouchableOpacity>

        {/* Criar conta */}
        <View className="flex-row justify-center items-center my-8">
          <Text className="text-gray-500">Ainda não tem uma conta?</Text>
          <TouchableOpacity
            className="ml-1"
            onPress={() => router.push("/sign-up")}
          >
            <Text className="text-primary font-urbanist-bold">Criar Conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
