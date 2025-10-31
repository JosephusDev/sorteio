import { Text } from "@/components/Text";
import { useGetBetDetails, useGetParticipantsByBet } from "@/queries/bets";
import { router, useLocalSearchParams } from "expo-router";
import { View, Image, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { Fragment, useEffect, useState, useRef } from "react";
import {
  CalendarFillIcon,
  ChevronLeftIcon,
  MoneyIcon,
  TrophyIcon,
} from "@/assets/icons";
import { capitalizeText, formatPrice, formatToExtensionDate } from "@/utils";
import { EmptyList } from "@/components/EmptyList";
import { DrawWheel } from "@/components/DrawWheel";
import { Confetti, ConfettiMethods } from "react-native-fast-confetti";
import { useAudioPlayer } from "expo-audio";
import Divider from "@/components/Divider";
import { SafeAreaView } from "react-native-safe-area-context";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function calculateTimeRemaining(
  eventDate: string | null,
): TimeRemaining | null {
  if (!eventDate) return null;

  const now = new Date().getTime();
  const event = new Date(eventDate).getTime();
  const diff = event - now;

  const isPast = diff < 0;
  const absDiff = Math.abs(diff);

  return {
    days: Math.floor(absDiff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((absDiff % (1000 * 60)) / 1000),
    isPast,
  };
}

export function BetViewer() {
  const { id } = useLocalSearchParams();
  const { data, isLoading } = useGetBetDetails(id as string);
  const { data: participants } = useGetParticipantsByBet(data?.produto_id!);
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(
    null,
  );
  const [showDrawComplete, setShowDrawComplete] = useState(false);
  const confettiRef = useRef<ConfettiMethods>(null);
  const player = useAudioPlayer(require("../../assets/sounds/winner.mp3"));

  useEffect(() => {
    if (!data?.aposta_data_evento) return;

    const updateTimer = () => {
      setTimeRemaining(calculateTimeRemaining(data.aposta_data_evento));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [data?.aposta_data_evento]);

  const handleDrawComplete = (winnerId: string) => {
    setShowDrawComplete(true);
    player.play();
    console.log("Sorteio concluído! Vencedor:", winnerId);

    // Dispara o confetti
    if (confettiRef.current) {
      confettiRef.current.restart();
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#4D5DFA" />
      </View>
    );
  }

  if (!data) {
    return (
      <View className="flex-1 items-center justify-center bg-white p-6">
        <EmptyList description="Aposta não encontrada" />
      </View>
    );
  }

  const isActive = data.status_produto === "activo";
  const hasEventDate = data.aposta_data_evento !== null;
  const isDrawTime =
    hasEventDate && timeRemaining && timeRemaining.isPast && isActive;
  
  const shouldShowWheel =
  isDrawTime &&
  participants &&
  participants.length > 0 &&
  data.id_vencedor &&
  !showDrawComplete;

  const isWaiting = !shouldShowWheel && !data.id_vencedor && isDrawTime


  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center h-48 mb-8">
          <View className="flex-row gap-4 w-full p-4 items-start">
            <TouchableOpacity activeOpacity={0.9} onPress={() => router.push('/(tabs)/bet')}>
              <ChevronLeftIcon />
            </TouchableOpacity>
            <Text className="font-urbanist-bold text-xl">{capitalizeText(data.nome_produto)}</Text>
          </View>
          {/* Imagem do Produto */}
          <View className="bg-white w-full h-48 p-6">
            <Image
              source={{ uri: data.imagem_url }}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>
        </View>

        <Divider />

        {/* Informações do Produto */}
        <View className="px-6">
          <View className="flex-row items-center">
            <Text className="text-sm font-urbanist-medium text-greyscale-700">
              Número de participantes
            </Text>
          </View>
          <Text className="mt-1 text-xl font-urbanist-bold text-primary">
            {participants?.length || 0} apostador
            {participants?.length === 1 ? "" : "es"}
          </Text>
          <View className="flex-row justify-between">
            <View>
              <View className="mt-6 flex-row items-center">
                <MoneyIcon width={20} />
                <Text className="ml-2 text-sm font-urbanist-medium text-greyscale-700">
                  Preço do Produto
                </Text>
              </View>
              <Text className="mt-1 text-xl font-urbanist-bold text-primary">
                {formatPrice(data.preco_produto)}
              </Text>
            </View>
            <View>
              <View className="mt-6 flex-row items-center">
                <MoneyIcon width={20} />
                <Text className="ml-2 text-sm font-urbanist-medium text-greyscale-700">
                  Valor da Aposta
                </Text>
              </View>
              <Text className="mt-1 text-xl font-urbanist-bold text-primary">
                {formatPrice(data.valor)}
              </Text>
            </View>
          </View>
        </View>

        {/* Resultado Final da Aposta */}
        {hasEventDate &&
          timeRemaining &&
          timeRemaining.isPast &&
          data.status_produto === "inactivo" && (
            <View className="mx-6 mt-6 bg-greyscale-50 rounded-2xl p-6 shadow-md">
              <View className="flex-row items-center mb-4">
                <TrophyIcon color={"#4D5DFA"} />
                <Text className="ml-2 text-sm font-urbanist-medium text-greyscale-700">
                  Vencedor(a) 🎉
                </Text>
              </View>
              <View className="justify-center items-center gap-4">
                <Image
                  src={
                    participants?.find((p) => p.id === data.id_vencedor)
                      ?.imagem_url
                  }
                  className="w-20 h-20 rounded-2xl"
                />
                <Text className="mt-1 text-xl font-urbanist-semiBold">
                  {data.nome_vencedor}
                </Text>
              </View>
            </View>
          )}

        {/* Timer de Contagem Regressiva */}
        {hasEventDate && timeRemaining && !timeRemaining.isPast && (
          <View className="mx-6 mt-6 bg-greyscale-50 rounded-2xl p-6 shadow-md">
            <View className="flex-row items-center mb-4">
              <Text className="text-base font-urbanist-semiBold text-greyscale-900">
                Tempo Restante
              </Text>
            </View>

            <View className="flex-row justify-between">
              <View className="items-center flex-1">
                <View className="bg-primary/10 rounded-xl px-4 py-3 w-full items-center">
                  <Text className="text-2xl font-urbanist-bold text-primary">
                    {timeRemaining.days.toString().padStart(2, "0")}
                  </Text>
                </View>
                <Text className="mt-2 text-xs font-urbanist-medium text-greyscale-600">
                  Dias
                </Text>
              </View>

              <View className="items-center flex-1 mx-2">
                <View className="bg-primary/10 rounded-xl px-4 py-3 w-full items-center">
                  <Text className="text-2xl font-urbanist-bold text-primary">
                    {timeRemaining.hours.toString().padStart(2, "0")}
                  </Text>
                </View>
                <Text className="mt-2 text-xs font-urbanist-medium text-greyscale-600">
                  Horas
                </Text>
              </View>

              <View className="items-center flex-1 mx-2">
                <View className="bg-primary/10 rounded-xl px-4 py-3 w-full items-center">
                  <Text className="text-2xl font-urbanist-bold text-primary">
                    {timeRemaining.minutes.toString().padStart(2, "0")}
                  </Text>
                </View>
                <Text className="mt-2 text-xs font-urbanist-medium text-greyscale-600">
                  Minutos
                </Text>
              </View>

              <View className="items-center flex-1">
                <View className="bg-primary/10 rounded-xl px-4 py-3 w-full items-center">
                  <Text className="text-2xl font-urbanist-bold text-primary">
                    {timeRemaining.seconds.toString().padStart(2, "0")}
                  </Text>
                </View>
                <Text className="mt-2 text-xs font-urbanist-medium text-greyscale-600">
                  Segundos
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Wheel aparece somente quando já pode sortear */}
        {shouldShowWheel && (
          <DrawWheel
            participants={participants}
            winnerId={data.id_vencedor}
            onDrawComplete={handleDrawComplete}
          />
        )}

        {/* Loader aparece APENAS quando NÃO deve mostrar a roleta */}
        {
          isWaiting && (
            <View
              className="h-screen absolute top-0 left-0 right-0 bottom-0 justify-center items-center bg-black/80"
              style={{ zIndex: 999 }}
            >
              <View
                className="bg-white rounded-xl p-6 backdrop-blur-md"
                style={{
                  shadowColor: "#000",
                  shadowOpacity: 0.15,
                  shadowOffset: { width: 0, height: 4 },
                  shadowRadius: 8,
                }}
              >
                <ActivityIndicator size="large" color="#4D5DFA" />
                <Text className="mt-6 font-urbanist-medium text-greyscale-800">
                  Sorteio começa em breve...
                </Text>
              </View>
            </View>
        )}


        {/* Mensagem pós-sorteio com Confetti */}
        {isDrawTime && showDrawComplete && (
          <View className="mx-6 mt-6 bg-greyscale-50 rounded-2xl p-6 shadow-md">
            <View className="flex-row items-center mb-4">
              <TrophyIcon color={"#4D5DFA"} />
              <Text className="ml-2 text-sm font-urbanist-medium text-greyscale-700">
                Vencedor 🎉
              </Text>
            </View>
            <View className="justify-center items-center gap-4">
              <Image
                src={
                  participants?.find((p) => p.id === data.id_vencedor)
                    ?.imagem_url
                }
                className="w-20 h-20 rounded-2xl"
              />
              <Text className="mt-1 text-xl font-urbanist-semiBold">
                {data.nome_vencedor}
              </Text>
            </View>
          </View>
        )}

        {/* Detalhes Adicionais */}
        <View className="mx-6 mt-6 bg-greyscale-50 rounded-2xl p-6 shadow-md">
          <Text className="text-lg font-urbanist-semiBold text-greyscale-900 mb-4">
            Detalhes
          </Text>

          <View className="space-y-4">
            <View className="flex-row items-center py-3 border-b border-greyscale-200">
              <CalendarFillIcon />
              <View className="ml-3 flex-1">
                <Text className="text-xs font-urbanist-medium text-greyscale-600">
                  Data da Aposta
                </Text>
                <Text className="mt-1 text-sm font-urbanist-semiBold text-greyscale-900">
                  {formatToExtensionDate(data.aposta_created_at)}
                </Text>
              </View>
            </View>

            {hasEventDate && (
              <View className="flex-row items-center py-3 border-b border-greyscale-200">
                <CalendarFillIcon />
                <View className="ml-3 flex-1">
                  <Text className="text-xs font-urbanist-medium text-greyscale-600">
                    Data do Evento
                  </Text>
                  <Text className="mt-1 text-sm font-urbanist-semiBold text-greyscale-900">
                    {formatToExtensionDate(data.aposta_data_evento)}
                  </Text>
                </View>
              </View>
            )}

            {!hasEventDate && (
              <View className="bg-warning/10 rounded-xl p-4 mt-2">
                <Text className="text-sm font-urbanist-medium text-greyscale-700">
                  Esta aposta não possui data de evento definida
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Espaçamento final */}
        <View className="h-20" />
      </ScrollView>

      {/* Confetti Cannon - posicionado de forma absoluta */}
      {(showDrawComplete || !isActive) && (
        <Confetti
          ref={confettiRef}
          autoStartDelay={2000}
          autoplay={true}
          count={300}
          fadeOutOnEnd
          colors={["#4D5DFA", "#FF6B6B", "#4ECDC4", "#FFD93D", "#6BCB77"]}
        />
      )}
    </SafeAreaView>
  );
}
