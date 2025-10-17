import { Notification } from "@/types/database.types";
import { capitalizeText } from "@/utils";
import { ListRenderItemInfo, View } from "react-native";
import { Text } from "./Text";
import {
  AccountNotificationIcon,
  ErrorNotificationIcon,
  SuccessNotificationIcon,
} from "@/assets/icons";

export function NotificationCard({ item }: ListRenderItemInfo<Notification>) {
  return (
    <View className="w-full bg-white overflow-hidden shadow-xl mb-1">
      <View className="p-4 flex-row justify-center items-center gap-4">
        {item.type === "transaction" ? (
          item.status === "success" ? (
            <SuccessNotificationIcon />
          ) : (
            <ErrorNotificationIcon />
          )
        ) : item.status === "success" ? (
          <AccountNotificationIcon />
        ) : (
          <ErrorNotificationIcon />
        )}
        <View className="w-[60%]">
          <Text
            className="text-greyscale-900 text-base font-urbanist-bold mb-1"
            numberOfLines={2}
          >
            {capitalizeText(item.titulo || "Título")}
          </Text>
          <Text
            className="text-greyscale-600 text-xs font-urbanist-regular mb-2"
            numberOfLines={2}
          >
            {capitalizeText(item.descricao || "Mensagem")}
          </Text>
        </View>
      </View>
    </View>
  );
}
