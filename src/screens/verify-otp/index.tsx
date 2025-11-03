import React, { useState, useRef } from "react";
import { View, ScrollView, TextInput, ActivityIndicator } from "react-native";
import { Text } from "@/components/Text";
import Button from "@/components/Button";
import { OtpImage } from "@/assets/icons";
import { useVerifyOtp } from "@/queries/auth";
import { usePhoneStore } from "@/stores/phone";

export default function VerifyOtp() {

  const {mutateAsync} = useVerifyOtp()
  const {phone} = usePhoneStore()

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleCodeChange = (text: string, index: number) => {
    // Aceita apenas números
    if (text && !/^\d+$/.test(text)) return;

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
          Código enviado para <Text className="font-urbanist-bold text-primary">+244 {phone?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</Text>
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
          title="Verificar"
          onPress={handleVerify}
          disabled={code.join("").length !== 6}
        />
      </View>
    </View>
  );
}
