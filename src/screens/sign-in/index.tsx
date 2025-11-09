import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { EmailIcon, EyeIcon, EyeOffIcon, LockIcon, PhoneIcon } from "@/assets/icons";
import { Text } from "@/components/Text";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import { router } from "expo-router";
import Divider from "@/components/Divider";
import { useSignInMutation } from "@/queries/auth";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LabelError } from "@/components/LabelError";
import { SignInType, SignInSchema } from "@/schemas/Auth";
import GoogleSignInButton from "@/components/GoogleSignIn";

export default function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignInSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync: signIn, isPending } = useSignInMutation();

  const onSubmit = async (data: SignInType) => {
    await signIn(data)
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 pt-12">
        {/* Título */}
        <Text className="text-3xl font-urbanist-bold text-gray-900 my-12">
          Fazer Login
        </Text>

        {/* Formulário */}
        <View className="flex-col gap-4 mb-8">
          {/* Telefone */}
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Telefone"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                icon={<PhoneIcon />}
                keyboardType="phone-pad"
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
          className="mb-4"
        >
          <Divider text="Esqueceu a palavra-passe?" />
        </TouchableOpacity>

        <GoogleSignInButton />

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
