import { NotFoundImage } from "@/assets/icons";
import { View } from "react-native";
import { Text } from "./Text";


export function EmptyList({description}: {description: string}){
    return(
        <View>
            <NotFoundImage width={50} />
            <Text className="text-greyscale-400 text-base font-urbanist-medium text-center">{description}</Text>
        </View>
    )
}