import React, { useState, useRef, useEffect } from "react";
import { View, ScrollView, TextInput } from "react-native";
import { Text } from "@/components/Text";
import Button from "@/components/Button";
import { OtpImage } from "@/assets/icons";
import { useRecoveryPassword, useVerifyOtp } from "@/queries/auth";
import { usePhoneStore } from "@/stores/phone";

export default function ForgotPassword() {

  const {mutateAsync: recoveryPassword} = useRecoveryPassword()
  const {mutateAsync, isPending} = useVerifyOtp()
  const {phone} = usePhoneStore()

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    recoveryPassword({phone: phone!})
  }, [])

  const handleCodeChange = (text: string, index: number) => {
    // Aceita apenas números
    if (text && !/^\d+$/.test(text)) return;

    // Caso o usuário cole ou o sistema preencha todos os dígitos de uma vez
    if (text.length > 1) {
      const digits = text.slice(0, 6).split(""); // limita a 6 dígitos
      const newCode = [...code];

      digits.forEach((d, i) => {
        if (index + i < 6) newCode[index + i] = d;
      });

      setCode(newCode);

      // Move o foco para o próximo campo disponível ou remove o foco se completo
      const nextIndex = index + digits.length;
      if (nextIndex < 6) {
        inputRefs.current[nextIndex]?.focus();
    } else {
      inputRefs.current[5]?.blur();
    }

    return;
  }

  // Lógica normal (um dígito por campo)
  const newCode = [...code];
  newCode[index] = text;
  setCode(newCode);

  // Move para o próximo campo se um número foi digitado
  if (text && index < 5) {
    inputRefs.current[index + 1]?.focus();
  }
};


  const handleKeyPress = (e: any, index: number) => {
    // Move para o campo anterior ao pressionar backspace em campo vazio
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const fullCode = code.join("");
    if (fullCode.length === 6) {
      mutateAsync({
        otp: fullCode,
        phone: phone!,
        type: 'recovery'
      })
    }
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1 px-6 pt-6"
        contentContainerStyle={{ alignItems: "center" }}
      >
        <OtpImage width={200} />

        {/* Título */}
        <Text className="text-center text-gray-900 my-4">
          Código enviado para <Text className="font-urbanist-bold text-gray-600 text-sm">+244 {phone?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</Text>
        </Text>

        {/* Campos de Código */}
        <View className="flex-row justify-center flex-wrap w-full my-8">
          {code.map((digit, index) => (
            <View
              key={index}
              className="flex-1 min-w-[40px] max-w-[60px] aspect-square mx-1 rounded-xl bg-gray-50 border border-gray-200 justify-center items-center focus:rounded-xl focus:border focus:border-primary/50 focus:bg-primary/5"
            >
              <TextInput
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                className="text-center text-2xl font-urbanist-bold text-gray-900 w-full"
                value={digit}
                onChangeText={(text) => handleCodeChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
              />
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Botão Fixo na Parte Inferior */}
      <View className="px-6 pb-20 pt-4 bg-white border-t border-gray-100">
        <Button
          title={isPending ? "Verificando..." : "Verificar"}
          onPress={handleVerify}
          disabled={code.join("").length !== 6 || isPending}
        />
      </View>
    </View>
  );
}
