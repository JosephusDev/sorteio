// ProfileSkeleton.tsx
import React from "react";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import { View } from "react-native";

export function ProfileSkeleton() {
  return (
    <View className="bg-white">
      {/* Header */}
      <View className="items-center pt-16 pb-6 px-12 bg-gray-300 border-b border-b-gray-200">

        {/* Avatar */}
        <View className="absolute mt-20 mr-60">
          <ContentLoader
            speed={2}
            width={112}
            height={112}
            viewBox="0 0 112 112"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <Circle cx="50" cy="50" r="50" />
          </ContentLoader>
        </View>

        {/* Nome */}
        <ContentLoader
          speed={2}
          width={200}
          height={28}
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          style={{ marginTop: 50, marginLeft: 120 }}
        >
          <Rect x="0" y="0" rx="6" ry="6" width="180" height="20" />
        </ContentLoader>

        {/* Telefone */}
        <ContentLoader
          speed={2}
          width={160}
          height={20}
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          style={{ marginTop: 8, marginLeft: 80 }}
        >
          <Rect x="0" y="0" rx="6" ry="6" width="140" height="18" />
        </ContentLoader>
      </View>
    </View>
  );
}
