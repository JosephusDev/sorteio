import React, { Fragment, useEffect } from "react";
import { Text } from "@/components/Text";
import {
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  useAnimatedRef,
  runOnUI,
  scrollTo,
  SharedValue,
} from "react-native-reanimated";


const ADS_DATA = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=400&fit=crop",
    title: "Dá pouco, leva muito.",
    subtitle: "Com poucos kwanzas, você pode levar o produto dos seus sonhos.",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop",
    title: "Transparência",
    subtitle: "Todo sorteio acontece ao vivo e 100% aleatório!",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=400&fit=crop",
    title: "Apostas Seguras",
    subtitle: "Cada aposta aumenta suas chances de ganhar o produto.",
  },
];

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.95;
const SPACING = 7;

const AdCard = React.memo(function AdCard({
  item,
  index,
  scrollX,
}: {
  item: typeof ADS_DATA[0];
  index: number;
  scrollX: SharedValue<number>;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * (CARD_WIDTH + SPACING),
      index * (CARD_WIDTH + SPACING),
      (index + 1) * (CARD_WIDTH + SPACING),
    ];

    const scale = interpolate(scrollX.value, inputRange, [0.9, 1, 0.9], "clamp");
    const opacity = interpolate(scrollX.value, inputRange, [0.6, 1, 0.6], "clamp");

    return { transform: [{ scale }], opacity };
  });

  return (
    <Animated.View
      style={[
        { width: CARD_WIDTH, marginHorizontal: SPACING / 2 },
        animatedStyle,
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        className="bg-primary rounded-2xl overflow-hidden h-48 shadow-lg"
      >
        <Image source={{ uri: item.image }} className="w-full h-full absolute opacity-90" resizeMode="cover" blurRadius={3} />
        <View className="absolute inset-0 bg-black/30" />
        <View className="flex-1 justify-end p-6">
          <Text className="text-white text-2xl font-urbanist-bold mb-2">
            {item.title}
          </Text>
          <Text className="text-secondary text-lg font-urbanist-semiBold">
            {item.subtitle}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

/* -------------------------
   Subcomponent: Dot
   ------------------------- */
const Dot = React.memo(function Dot({
  index,
  scrollX,
}: {
  index: number;
  scrollX: SharedValue<number>;
}) {
  const animatedDotStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * (CARD_WIDTH + SPACING),
      index * (CARD_WIDTH + SPACING),
      (index + 1) * (CARD_WIDTH + SPACING),
    ];

    const opacity = interpolate(scrollX.value, inputRange, [0.3, 1, 0.3], "clamp");

    return { opacity };
  });

  return (
    <Animated.View
      className="h-2 bg-primary rounded-full mx-1"
      style={[{ width: 8 }, animatedDotStyle]}
    />
  );
});

export function Carousel(){

  const scrollX = useSharedValue(0);
  const animatedRef = useAnimatedRef<Animated.FlatList>();
  const currentIndex = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  // Auto-scroll: roda no JS, mas delega a chamada scrollTo para a UI thread via runOnUI
  useEffect(() => {
    // cria a função worklet que fará o scroll nativo (protege caso ref seja undefined)
    const scrollToUI = runOnUI((ref: any, offset: number) => {
      "worklet";
      if (!ref) return;
      // scrollTo espera um ref animado válido (useAnimatedRef)
      scrollTo(ref, offset, 0, true);
    });

    const id = setInterval(() => {
      currentIndex.value =
        currentIndex.value < ADS_DATA.length - 1 ? currentIndex.value + 1 : 0;

      const offset = currentIndex.value * (CARD_WIDTH + SPACING);

      // chama a worklet passando a referência animada e o offset
      scrollToUI(animatedRef, offset);
    }, 5_000);

    return () => clearInterval(id);
  }, [animatedRef, currentIndex]);

    return(
        <Fragment>
            <View className="mb-6 mt-4">
              <Animated.FlatList
                ref={animatedRef}
                data={ADS_DATA}
                renderItem={({ item, index }) => (
                  <AdCard item={item} index={index!} scrollX={scrollX} />
                )}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH + SPACING}
                decelerationRate="fast"
                contentContainerStyle={{
                  paddingHorizontal: (width - CARD_WIDTH) / 2,
                }}
                onScroll={onScroll}
                scrollEventThrottle={16}
              />

              {/* Dots */}
              <View className="flex-row justify-center items-center mt-4">
                {ADS_DATA.map((_, i) => (
                  <Dot key={i} index={i} scrollX={scrollX} />
                ))}
              </View>
            </View>
            <View className="px-5 mb-4">
            <View className="flex-row items-center justify-between">
                <Text className="text-greyscale-900 text-lg font-urbanist-bold">Produtos Disponíveis</Text>
              </View>
            </View>
        </Fragment>
    )
}