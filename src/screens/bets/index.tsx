import { ClockIcon, SearchIcon, TrophyIcon } from "@/assets/icons";
import { EmptyList } from "@/components/EmptyList";
import InputField from "@/components/InputField";
import { BetSkeleton } from "@/components/skeleton/BetSkeleton";
import { Text } from "@/components/Text";
import { useGetAllBets } from "@/queries/bets";
import { BetsData } from "@/types";
import { capitalizeText, formatDate, formatPrice } from "@/utils";
import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  TouchableOpacity,
  View,
  Vibration,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BetCard = ({ item }: ListRenderItemInfo<BetsData[0]>) => {

  const handleLongPress = () => {
    Vibration.vibrate(50);
    router.push(`/(modals)/confirm-delete-bet?id=${item.aposta_id}&name=${item.nome_produto}`);
  };

  const handlePress = () => {
    router.push(`/bet-viewer?id=${item.aposta_id}&nome=${item.nome_produto}`);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      key={item.aposta_id}
      onPress={handlePress}
      onLongPress={item.status_produto === "inactivo" ? () => {} : handleLongPress}
    >
      <View className="flex-row justify-between items-center">
        <View className="flex-row justify-center items-center gap-4">
          <Image src={item.imagem_url} className="w-16 h-16" />
          <View className="w-36 gap-1.5">
            <Text numberOfLines={1} className="font-urbanist-bold">
              {capitalizeText(item.nome_produto)}
            </Text>
            <Text className="text-gray-400">{formatPrice(item.valor)}</Text>
            <Text className="text-gray-400">
              {formatDate({
                date: item.aposta_created_at.split("T")[0],
                inverse: true,
              })}
            </Text>
          </View>
        </View>
        <View className="flex-col justify-center items-end gap-2">
          {item.status_produto === "activo" ? (
            <View className="flex-row gap-2 items-center">
              <ClockIcon width={15} color={"#4ADE80"} />
              <Text
                numberOfLines={1}
                className="font-urbanist-bold text-right w-18 text-success"
              >
                Em andamento
              </Text>
            </View>
          ) : (
            <View className="flex-row gap-2 items-center">
              <TrophyIcon width={15} color={"#F75555"} />
              <Text
                numberOfLines={1}
                className="font-urbanist-bold text-right w-18 text-error"
              >
                Encerrada
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export function Bets() {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useGetAllBets(search);

  return (
    <SafeAreaView className="flex-1 bg-white h-screen w-full pt-4 px-6 gap-8">
      <View className="gap-2">
        <Text className="font-urbanist-bold text-2xl text-primary">
          Apostas
        </Text>
        <Text className="text-gray-600">
          Veja as suas apostas concluidas e pendentes.
        </Text>
      </View>
      <InputField
        label="Pesquisar..."
        icon={<SearchIcon width={16} />}
        onChangeText={setSearch}
      />
        <View className="flex-1">
          {isLoading ? (
            <BetSkeleton />
              ) : (
                  <FlatList
                    data={data}
                    renderItem={BetCard}
                    ItemSeparatorComponent={() => (
                      <View className="w-full border border-gray-100 my-4" />
                    )}
                    ListEmptyComponent={
                      <EmptyList description="Nenhuma aposta encontrada." />
                    }
                    ListFooterComponent={<View className="h-8" />}
                  />
              )}
        </View>
    </SafeAreaView>
  );
}
