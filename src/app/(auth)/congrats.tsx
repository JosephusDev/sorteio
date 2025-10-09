import Button from "@/components/Button";
import { Text } from "@/components/Text";
import { router } from "expo-router";
import { Image, View } from "react-native";


export default function(){
    return(
        <View className="flex min-h-screen items-center justify-center bg-[rgba(0,0,0.8,0.8)]">
            <View className="bg-white flex gap-4 items-center justify-center p-6 rounded-3xl">
                <Image source={require("@/assets/images/success.png")} resizeMode="contain" className="w-32 h-32 self-center" />
                <Text className="text-center text-2xl font-urbanist-bold text-primary">Parabéns!</Text>
                <Text className="text-center text-base font-urbanist-regular text-gray-600">Sua conta está pronta para ser usada</Text>
                <Button className="w-60 mt-2" title="Ir para o Início" onPress={() => router.push("/sign-in")} />
            </View>
        </View>
    )
}