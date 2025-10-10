import React, { useState, useRef } from "react";
import { View, ScrollView, TextInput, Image } from "react-native";
import { Text } from "@/components/Text";
import Button from "@/components/Button";
import { router } from "expo-router";

export default function ForgotPassword() {
  const [code, setCode] = useState(["", "", "", ""]);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleCodeChange = (text: string, index: number) => {
    // Aceita apenas números
    if (text && !/^\d+$/.test(text)) return;

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Move para o próximo campo se um número foi digitado
    if (text && index < 3) {
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
    if (fullCode.length === 4) {
      console.log("Código:", fullCode);
      // Adicione sua lógica de verificação aqui
      router.push("/recovery-password");
    }
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 pt-12">
        <Image
          source={require("@/assets/images/recovery.png")}
          resizeMode="contain"
          className="w-48 h-48 self-center"
        />

        {/* Título */}
        <Text className="text-center text-gray-900 my-4">
          Código enviado para +244*******99
        </Text>

        {/* Campos de Código */}
        <View className="flex-row justify-center gap-4 my-8">
          {code.map((digit, index) => (
            <View
              key={index}
              className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-200 justify-center items-center focus:rounded-xl focus:border focus:border-primary/50 focus:bg-primary/5"
            >
              <TextInput
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                className="text-center text-2xl font-urbanist-bold text-gray-900 w-full h-full"
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
      <View className="px-6 pb-8 pt-4 bg-white border-t border-gray-100">
        <Button
          title="Verificar"
          onPress={handleVerify}
          disabled={code.join("").length !== 4}
        />
      </View>
    </View>
  );
}
