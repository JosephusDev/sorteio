import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { View } from "react-native";

export function BetSkeleton() {
  return (
    <View className="flex-col justify-between items-center my-1 ml-12">
      <ContentLoader
        speed={1.5}
        width={360}
        height={70}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        {/* Imagem circular à esquerda */}
        <Rect x="0" y="0" rx="8" ry="8" width="64" height="64" />

        {/* Nome do produto */}
        <Rect x="80" y="8" rx="4" ry="4" width="180" height="14" />

        {/* Data */}
        <Rect x="80" y="30" rx="4" ry="4" width="120" height="12" />
      </ContentLoader>

      <ContentLoader
        speed={1.5}
        width={360}
        height={70}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        {/* Imagem circular à esquerda */}
        <Rect x="0" y="0" rx="8" ry="8" width="64" height="64" />

        {/* Nome do produto */}
        <Rect x="80" y="8" rx="4" ry="4" width="180" height="14" />

        {/* Data */}
        <Rect x="80" y="30" rx="4" ry="4" width="120" height="12" />
      </ContentLoader>

      <ContentLoader
        speed={1.5}
        width={360}
        height={70}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        {/* Imagem circular à esquerda */}
        <Rect x="0" y="0" rx="8" ry="8" width="64" height="64" />

        {/* Nome do produto */}
        <Rect x="80" y="8" rx="4" ry="4" width="180" height="14" />

        {/* Data */}
        <Rect x="80" y="30" rx="4" ry="4" width="120" height="12" />
      </ContentLoader>
    </View>
  );
}
