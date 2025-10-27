import React, { useEffect } from "react";
import { View, Image, Dimensions, StyleSheet, Vibration } from "react-native";
import { Text } from "@/components/Text";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import { useAudioPlayer } from "expo-audio";

interface Participant {
  id: string;
  imagem_url: string;
  nome: string;
}

interface DrawWheelProps {
  participants: Participant[];
  winnerId: string;
  onDrawComplete?: (winnerId: string) => void;
}

const { width } = Dimensions.get("window");
const CARD_SIZE = 200;
const CARD_SPACING = 16;

export function DrawWheel({
  participants,
  winnerId,
  onDrawComplete,
}: DrawWheelProps) {
  const scrollX = useSharedValue(0);
  const isDrawing = useSharedValue(false);

  // Cria array extendido para efeito de loop infinito
  const extendedParticipants = [
    ...participants,
    ...participants,
    ...participants,
    ...participants,
    ...participants,
  ];

  const ONE_SECOND_IN_MS = 1000;

  const PATTERN = [1 * ONE_SECOND_IN_MS, 2 * ONE_SECOND_IN_MS];

  useEffect(() => {
    // Encontra o índice do vencedor no array extendido
    const winnerIndex = extendedParticipants.findIndex(
      (p) => p.id === winnerId,
    );

    if (winnerIndex === -1) return;

    // Calcula posição final centralizada
    const centerOffset = (width - CARD_SIZE) / 2;
    const finalPosition =
      -(winnerIndex * (CARD_SIZE + CARD_SPACING)) + centerOffset;

    // Inicia animação após pequeno delay
    const timer = setTimeout(() => {
      isDrawing.value = true;

      Vibration.vibrate(PATTERN);

      // Animação em 3 fases: rápido -> médio -> lento
      scrollX.value = withSequence(
        // Fase 1: Acelera rápido (1.5s)
        withTiming(-800, {
          duration: 1500,
          easing: Easing.out(Easing.cubic),
        }),
        // Fase 2: Velocidade constante alta (2s)
        withTiming(-2400, {
          duration: 2000,
          easing: Easing.linear,
        }),
        // Fase 3: Desacelera até o vencedor (3.5s)
        withTiming(
          finalPosition,
          {
            duration: 3500,
            easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
          },
          (finished) => {
            if (finished && onDrawComplete) {
              runOnJS(onDrawComplete)(winnerId);
            }
          },
        ),
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [winnerId, participants]);

  return (
    <View className="mx-6 mt-6 bg-greyscale-50 rounded-2xl overflow-hidden shadow-md">
      {/* Header */}
      <View className="p-6 pb-4 border-b border-greyscale-200">
        <Text className="text-lg font-urbanist-bold text-greyscale-900 text-center">
          Carregando...
        </Text>
        <Text className="text-sm font-urbanist-medium text-greyscale-600 text-center mt-2">
          Por favor, aguarde.
        </Text>
      </View>

      {/* Wheel Container */}
      <View className="py-8 relative">
        {/* Cards dos Participantes */}
        <Animated.View
          style={[
            styles.cardsContainer,
            useAnimatedStyle(() => ({
              transform: [{ translateX: scrollX.value }],
            })),
          ]}
        >
          {extendedParticipants.map((participant, index) => (
            <ParticipantCard
              key={`${participant.id}-${index}`}
              participant={participant}
              index={index}
              scrollX={scrollX}
            />
          ))}
        </Animated.View>
      </View>

      {/* Footer */}
      <View className="px-6 pb-6 pt-2">
        <View className="bg-primary/5 rounded-xl p-4">
          <Text className="text-xs font-urbanist-semiBold text-primary text-center">
            Poderá ver o resultado em instantes...
          </Text>
        </View>
      </View>
    </View>
  );
}

/* -------------------------
   Subcomponent: ParticipantCard
   ------------------------- */
interface ParticipantCardProps {
  participant: Participant;
  index: number;
  scrollX: any;
}

const ParticipantCard = React.memo(function ParticipantCard({
  participant,
  index,
  scrollX,
}: ParticipantCardProps) {
  const cardPosition = index * (CARD_SIZE + CARD_SPACING);
  const centerOffset = (width - CARD_SIZE) / 2;

  const animatedStyle = useAnimatedStyle(() => {
    const distance = scrollX.value + cardPosition - centerOffset;
    const absDistance = Math.abs(distance);

    // Scale: maior no centro
    const scale = Math.max(0.7, 1 - absDistance / 400);

    // Opacity: mais opaco no centro
    const opacity = Math.max(0.3, 1 - absDistance / 300);

    // Rotation: leve rotação nas laterais
    const rotate = (distance / 200) * 15;

    return {
      transform: [{ scale }, { rotateY: `${rotate}deg` }],
      opacity,
    };
  });

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <View className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-primary/20">
        <Image
          source={{ uri: participant.imagem_url }}
          style={styles.avatar}
          resizeMode="cover"
        />
        <View className="bg-primary/10 p-3">
          <Text
            className="text-sm font-urbanist-bold text-greyscale-900 text-center"
            numberOfLines={1}
          >
            {participant.nome}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  cardsContainer: {
    flexDirection: "row",
    paddingHorizontal: width / 2,
  },
  card: {
    width: CARD_SIZE,
    marginHorizontal: CARD_SPACING / 2,
  },
  avatar: {
    width: CARD_SIZE,
    height: CARD_SIZE,
  },
  centerIndicator: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: "#4D5DFA",
    zIndex: 10,
    borderRadius: 2,
    shadowColor: "#4D5DFA",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
  leftGradient: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 80,
    backgroundColor: "rgba(255,255,255,0.95)",
    zIndex: 5,
  },
  rightGradient: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 80,
    backgroundColor: "rgba(255,255,255,0.95)",
    zIndex: 5,
  },
});
