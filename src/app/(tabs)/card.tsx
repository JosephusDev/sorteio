import React from "react";
import { 
  View, 
  FlatList,
  ListRenderItemInfo,
} from "react-native";
import { Text } from "@/components/Text";
import { EmptyList } from "@/components/EmptyList";
import { BetSkeleton } from "@/components/skeleton/BetSkeleton";
import { Transaction } from "@/types/database.types";
import { useGetAllTransactions } from "@/queries/transactions";
import { formatPrice, formatToExtensionDate } from "@/utils";
import { SafeAreaView } from "react-native-safe-area-context";


export default function TransactionsScreen() {
  const { data, isLoading } = useGetAllTransactions()


  const TransactionCard = ({ item }: ListRenderItemInfo<Transaction>) => (
      <View className="flex-row items-center justify-between">
        {/* LADO ESQUERDO: Nome do produto e data */}
        <View className="flex-1 gap-2">
          <Text className="text-base font-urbanist-semiBold">
            {item.tipo.toUpperCase()}
          </Text>
          <Text className="text-sm text-gray-500 mt-1">
            {formatToExtensionDate(item.created_at!)}
          </Text>
        </View>
        
        {/* LADO DIREITO: Tipo e valor */}
        <View className="items-end gap-2">
          <Text className="text-base font-urbanist-semiBold">
            Valor
          </Text>
          <Text className={`text-sm font-urbanist-medium ${
            item.tipo === "aposta" ? "text-green-600" : "text-red-600"
          } mt-1`}>
            {formatPrice(item.valor)}
          </Text>
        </View>
      </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white h-screen w-full py-4 px-6 gap-8">
      {/* Header */}
      <View className="mb-6">
        <Text className="font-urbanist-bold text-2xl text-primary">
          Transações
        </Text>
        <Text className="text-gray-600">
          Veja todas as suas Apostas e Retiradas.
        </Text>
      </View>

      {/* Transactions List */}
      <View className="flex-1">
        {isLoading ? (
          <BetSkeleton />
        ) : data?.length === 0 ? (
          <EmptyList description="Nenhuma transação encontrada." />
        ) : (
          <FlatList
            data={data}
            renderItem={TransactionCard}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => (
              <View className="w-full border border-gray-100 my-4" />
            )}
            ListEmptyComponent={
              <EmptyList description="Nenhuma transação realizada" />
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}