import React from "react";
import { View } from "react-native";
import ContentLoader, { Rect } from "react-content-loader/native";

export function ProductSkeleton() {
  return (
    <View className="flex-row flex-wrap justify-between px-4 mt-2">
      {[1, 2, 3, 4].map((_, index) => (
        <View
          key={index}
          className="w-[48%] bg-white rounded-2xl mb-4 border border-greyscale-200 overflow-hidden"
        >
          <ContentLoader
            speed={1.2}
            width="100%"
            height={230}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            {/* imagem */}
            <Rect x="0" y="0" rx="8" ry="8" width="100%" height="160" />

            {/* título */}
            <Rect x="12" y="175" rx="6" ry="6" width="70%" height="12" />

            {/* subtítulo/preço */}
            <Rect x="12" y="195" rx="6" ry="6" width="50%" height="14" />
          </ContentLoader>
        </View>
      ))}
    </View>
  );
}
