import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import {
  EmailIcon,
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
import { useSignUpMutation } from "@/queries/auth";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpType, SignUpSchema } from "@/schemas/Auth";
import { LabelError } from "@/components/LabelError";

export default function SignUp() {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignUpSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync: signUp, isPending } = useSignUpMutation();

  const onSubmit = (data: SignUpType) => {
    signUp(data)
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 pt-12">
        {/* Título */}
        <Text className="text-3xl font-urbanist-bold text-gray-900 my-12">
          Crie sua conta
        </Text>

        {/* Formulário */}
        <View className="flex-col gap-4 mb-8">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Nome"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                icon={<UserIcon />}
              />
            )}
            name="name"
          />
          {errors.name && <LabelError message={errors.name.message!} />}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Telefone"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                icon={<PhoneIcon />}
                keyboardType="number-pad"
                hasMask
                mask={[
                  /\d/,
                  /\d/,
                  /\d/,
                  " ",
                  /\d/,
                  /\d/,
                  /\d/,
                  " ",
                  /\d/,
                  /\d/,
                  /\d/,
                ]}
              />
            )}
            name="phone"
          />
          {errors.phone && <LabelError message={errors.phone.message!} />}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
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

          <Controller
            control={control}
            rules={{
              required: true,
            }}
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
            title={isPending ? "Carregando..." : "Criar Conta"}
            onPress={handleSubmit(onSubmit)}
            disabled={isPending}
            className="mt-4"
          />
        </View>

        {/* Login Link */}
        <View className="flex-row justify-center items-center mb-8">
          <Text className="text-gray-500">Já tem uma conta?</Text>
          <TouchableOpacity
            className="ml-1"
            onPress={() => router.push("/sign-in")}
          >
            <Text className="text-primary font-urbanist-bold">Fazer Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
