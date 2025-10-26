import React from "react";
import { View, FlatList } from "react-native";
import { ProductCard } from "@/components/ProductCard";
import { Carousel } from "@/components/Carousel";
import { Header } from "@/components/Header";
import { useGetActiveProducts } from "@/queries/products";
import { ProductSkeleton } from "@/components/skeleton/ProductSkeleton";
import { EmptyList } from "@/components/EmptyList";

export function Home() {
  const { data: products, isLoading } = useGetActiveProducts();

  return (
    <View className="bg-greyscale-50 flex-1">
      <Header />
      <FlatList
        ListHeaderComponent={<Carousel />}
        data={products}
        renderItem={isLoading ? () => <ProductSkeleton /> : ProductCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <View className="items-center justify-center py-12">
            <EmptyList description="Nenhum produto disponível" />
          </View>
        }
      />
    </View>
  );
}
