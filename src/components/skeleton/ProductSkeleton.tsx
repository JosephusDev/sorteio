import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";

export function ProductSkeleton() {
  const opacity = useRef(new Animated.Value(0.3)).current;

  // animação de pulsar
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 700, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View className="flex-row flex-wrap justify-between px-4 mt-2">
      {[1, 2, 3, 4].map((_, index) => (
        <Animated.View
          key={index}
          style={{ opacity }}
          className={`w-[48%] bg-white rounded-2xl mb-4 border border-greyscale-200 overflow-hidden`}
        >
          {/* imagem */}
          <View className="bg-greyscale-200 h-40 w-full" />

          {/* conteúdo */}
          <View className="p-3 space-y-2">
            <View className="bg-greyscale-200 h-4 w-3/4 rounded-md" />
            <View className="bg-greyscale-200 h-5 w-1/2 rounded-md mt-2" />
          </View>
        </Animated.View>
      ))}
    </View>
  );
}
