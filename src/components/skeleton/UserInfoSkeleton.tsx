import React from "react";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function UserInfoSkeleton() {
  // safe area
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top ?? 0;

  return (
    <View
      style={{
        backgroundColor: "white",
        paddingTop: statusBarHeight + 10, // fixo e consistente
        paddingHorizontal: 20,
        paddingBottom: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
      }}
    >
      {/* Bloco esquerdo: avatar e textos */}
      <View className="flex-row items-center">
        <ContentLoader
          speed={1.4}
          width={140}
          height={60}
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          {/* Avatar circular */}
          <Circle cx="25" cy="25" r="25" />
          {/* Nome e subtítulo */}
          <Rect x="60" y="10" rx="4" ry="4" width="60" height="10" />
          <Rect x="60" y="30" rx="4" ry="4" width="120" height="12" />
        </ContentLoader>
      </View>

      {/* Ícones lado direito */}
      <View className="flex-row space-x-4">
        <ContentLoader
          speed={1.4}
          width={80}
          height={55}
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <Circle cx="20" cy="20" r="16" />
          <Circle cx="60" cy="20" r="16" />
        </ContentLoader>
      </View>
    </View>
  );
}
