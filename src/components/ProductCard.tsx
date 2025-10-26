import React from "react";
import { Text } from "@/components/Text";
import { ProductsData } from "@/types";
import {
  View,
  Image,
  TouchableOpacity,
  ListRenderItemInfo,
} from "react-native";
import { capitalizeText, formatPrice } from "@/utils";
import { DeliveryIcon, LocationIcon } from "@/assets/icons";

export function ProductCard({
  item,
  index,
}: ListRenderItemInfo<ProductsData[0]>) {
  const isLeft = index % 2 === 0;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={`w-[48%] bg-white rounded-2xl overflow-hidden shadow-md mb-4 ${
        isLeft ? "mr-[4%]" : ""
      }`}
      style={{ borderWidth: 1, borderColor: "#E0E0E0" }}
    >
      <View className="bg-greyscale-100 h-40 relative">
        {item.imagem_produto?.[0]?.url ? (
          <Image
            source={{ uri: item.imagem_produto[0].url }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-full items-center justify-center">
            <Text className="text-greyscale-400 text-sm font-urbanist-medium">
              Sem imagem
            </Text>
          </View>
        )}

        <View className="absolute top-2 right-2 bg-primary px-3 py-1 rounded-full">
          <Text
            className="text-white text-xs font-urbanist-semiBold"
            numberOfLines={1}
          >
            {capitalizeText(item.categoria)}
          </Text>
        </View>
      </View>

      <View className="p-3">
        <Text
          className="text-greyscale-900 text-base font-urbanist-bold mb-1"
          numberOfLines={1}
        >
          {capitalizeText(item.nome || "Nome")}
        </Text>

        <Text
          className="text-greyscale-600 text-xs font-urbanist-regular mb-2"
          numberOfLines={2}
        >
          {capitalizeText(item.descricao || "Descrição")}
        </Text>
        <Text
          className="text-greyscale-500 text-xs font-urbanist-regular pb-2"
          numberOfLines={1}
        >
          <DeliveryIcon width={10} />{" "}
          {capitalizeText(item.fornecedor?.nome || "Fornecedor")}
        </Text>
        <Text
          className="text-greyscale-500 text-xs font-urbanist-regular pb-2"
          numberOfLines={1}
        >
          <LocationIcon width={10} />{" "}
          {capitalizeText(item.localizacao || "Localização")}
        </Text>
        <Text
          className="text-primary text-lg font-urbanist-bold"
          numberOfLines={1}
        >
          {formatPrice(item.preco!)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
