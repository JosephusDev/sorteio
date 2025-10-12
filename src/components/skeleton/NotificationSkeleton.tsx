import React from "react";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import { View } from "react-native";

export function NotificationSkeleton() {
  return (
    <View className="px-5 mt-4">
      {/* Item 1 */}
      <ContentLoader
        speed={1.5}
        width="100%"
        height={80}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        style={{ marginBottom: 16 }}
      >
        {/* Círculo (ícone) */}
        <Circle cx="25" cy="40" r="20" />
        {/* Título */}
        <Rect x="60" y="25" rx="6" ry="6" width="60%" height="14" />
        {/* Descrição */}
        <Rect x="60" y="48" rx="6" ry="6" width="40%" height="12" />
      </ContentLoader>

      {/* Item 2 */}
      <ContentLoader
        speed={1.5}
        width="100%"
        height={80}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        style={{ marginBottom: 16 }}
      >
        <Circle cx="25" cy="40" r="20" />
        <Rect x="60" y="25" rx="6" ry="6" width="60%" height="14" />
        <Rect x="60" y="48" rx="6" ry="6" width="40%" height="12" />
      </ContentLoader>

      {/* Item 3 */}
      <ContentLoader
        speed={1.5}
        width="100%"
        height={80}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <Circle cx="25" cy="40" r="20" />
        <Rect x="60" y="25" rx="6" ry="6" width="60%" height="14" />
        <Rect x="60" y="48" rx="6" ry="6" width="40%" height="12" />
      </ContentLoader>
    </View>
  );
}
