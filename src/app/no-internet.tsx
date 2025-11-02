import { NoInternetImage } from "@/assets/icons";
import Button from "@/components/Button";
import { Text } from "@/components/Text";
import { View, BackHandler, Platform } from "react-native";


export default function NoInternet(){

    return(
        <View className="flex-1 items-center h-screen bg-white gap-4 pt-60">
            <NoInternetImage />
            <Text className="font-urbanist-bold text-xl text-primary">Sem conexão à Internet</Text>
            <Text className="font-urbanist-medium text-gray-500">Por favor, verifique sua conexão e tente novamente.</Text>
            {Platform.OS === "android" && <Button title="Sair" className="w-1/2 mt-4" onPress={() => BackHandler.exitApp()} />}
        </View>
    )
}