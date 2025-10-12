import { SearchIcon } from "@/assets/icons";
import Divider from "@/components/Divider";
import { EmptyList } from "@/components/EmptyList";
import InputField from "@/components/InputField";
import { ProductCard } from "@/components/ProductCard";
import { ProductSkeleton } from "@/components/skeleton/ProductSkeleton";
import { Text } from "@/components/Text";
import { useGetProductByName } from "@/queries/products";
import { useState } from "react";
import { FlatList, View } from "react-native";

export default function Search() {
    
    const [searchTerm, setSearchTerm] = useState("");
    const { data: products, isLoading } = useGetProductByName(searchTerm);

    return (
        <View className="h-screen bg-white py-8 px-4 gap-4">
            <InputField icon={<SearchIcon width={18} />} label="Digite o que procura" onChangeText={setSearchTerm} />
            <Divider />
            {
                isLoading ? <ProductSkeleton /> :
                <FlatList
                    data={products}
                    renderItem={ProductCard}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    columnWrapperStyle={{ paddingHorizontal: 20 }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    ListHeaderComponent={<Text className="pb-4 font-urbanist-bold">Resultados</Text>}
                    ListEmptyComponent={
                    <View className="items-center justify-center py-12">
                        <EmptyList description="Nenhum produto encontrado" />
                    </View>
                    }
                />
            }
        </View>
    );
}
