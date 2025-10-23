import { Text } from "@/components/Text";
import { useGetBetDetails, useGetParticipantsByBet } from "@/queries/bets";
import { router, useLocalSearchParams } from "expo-router";
import { View, Image, ScrollView, ActivityIndicator, StatusBar, TouchableOpacity } from "react-native";
import { Fragment, useEffect, useState } from "react";
import { ClockIcon, CalendarFillIcon, MoneyIcon, ChevronLeftIcon, UsersIcon, TrophyIcon, PrizeIcon } from "@/assets/icons";
import { formatPrice, formatToExtensionDate } from "@/utils";
import { EmptyList } from "@/components/EmptyList";
import { SafeAreaView } from "react-native-safe-area-context";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function calculateTimeRemaining(eventDate: string | null): TimeRemaining | null {
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
  const {data: participants} = useGetParticipantsByBet(data?.produto_id!)
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(null);

  useEffect(() => {
    if (!data?.aposta_data_evento) return;

    const updateTimer = () => {
      setTimeRemaining(calculateTimeRemaining(data.aposta_data_evento));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [data?.aposta_data_evento]);

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

  return (
    <Fragment>
      <StatusBar barStyle={"light-content"} backgroundColor={"#4D5DFA"} />
        <ScrollView className="flex-1 bg-greyscale-50" showsVerticalScrollIndicator={false}>
          {/* Header com Status */}
          <View className="px-6 py-16 h-60 bg-primary">
            <View className="flex-row justify-between items-center">
                <TouchableOpacity activeOpacity={0.9} onPress={() => router.back()}>
                    <ChevronLeftIcon color={"#fff"} />
                </TouchableOpacity>
                <View className="flex-row items-start justify-end">
                    {isActive ? <ClockIcon width={20} color={"#fff"} /> : <TrophyIcon width={20} color={"#fff"} />}
                    <Text className="ml-2 text-lg font-urbanist-bold text-white">
                        {isActive ? "Em Andamento" : "Encerrada"}
                    </Text>
                </View>
            </View>
          </View>

          <View className="flex-row">
            {/* Imagem do Produto */}
            <View className="px-6 -mt-24">
              <View className="bg-white w-48 h-48 p-6 rounded-full shadow-lg overflow-hidden">
                <Image
                  source={{ uri: data.imagem_url }}
                  className="w-full h-full"
                  resizeMode="contain"
                />
              </View>
            </View>
            <Text numberOfLines={2} className="-mt-16 w-24 text-xl font-urbanist-bold text-white">
              {data.nome_produto}
            </Text>
          </View>

          {/* Informações do Produto */}
          <View className="px-6 mt-6">
            <View className="mt-6 flex-row items-center">
                <UsersIcon width={20} />
                <Text className="ml-2 text-sm font-urbanist-medium text-greyscale-700">
                    Número de participantes
                </Text>
            </View>
            <Text className="mt-1 text-xl font-urbanist-bold text-primary">
                {participants?.length || 0} apostador{participants?.length === 1 ? "" : "es"}
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
          {hasEventDate && timeRemaining && timeRemaining.isPast && data.status_produto === "inactivo" && (
            <View className="mx-6 mt-6 bg-white rounded-2xl p-6 shadow-sm">
                <View className="flex-row items-center mb-4">
                    <TrophyIcon />
                    <Text className="ml-2 text-sm font-urbanist-medium text-greyscale-700">
                        Vencedor(a)
                    </Text>
                </View>
                <Text className="mt-1 text-xl font-urbanist-bold text-primary">
                    {data.nome_vencedor || "Brevemente..."}
                </Text>
            </View>
          )}

          {/* Timer de Contagem Regressiva */}
          {hasEventDate && timeRemaining && !timeRemaining.isPast && (
            <View className="mx-6 mt-6 bg-white rounded-2xl p-6 shadow-sm">
              <View className="flex-row items-center mb-4">
                <ClockIcon width={20} />
                <Text className="ml-2 text-base font-urbanist-semiBold text-greyscale-900">
                  Tempo Restante
                </Text>
              </View>

              <View className="flex-row justify-between">
                <View className="items-center flex-1">
                  <View className="bg-primary/10 rounded-xl px-4 py-3 w-full items-center">
                    <Text className="text-2xl font-urbanist-bold text-primary">
                      {timeRemaining.days.toString().padStart(2, '0')}
                    </Text>
                  </View>
                  <Text className="mt-2 text-xs font-urbanist-medium text-greyscale-600">
                    Dias
                  </Text>
                </View>

                <View className="items-center flex-1 mx-2">
                  <View className="bg-primary/10 rounded-xl px-4 py-3 w-full items-center">
                    <Text className="text-2xl font-urbanist-bold text-primary">
                      {timeRemaining.hours.toString().padStart(2, '0')}
                    </Text>
                  </View>
                  <Text className="mt-2 text-xs font-urbanist-medium text-greyscale-600">
                    Horas
                  </Text>
                </View>

                <View className="items-center flex-1 mx-2">
                  <View className="bg-primary/10 rounded-xl px-4 py-3 w-full items-center">
                    <Text className="text-2xl font-urbanist-bold text-primary">
                      {timeRemaining.minutes.toString().padStart(2, '0')}
                    </Text>
                  </View>
                  <Text className="mt-2 text-xs font-urbanist-medium text-greyscale-600">
                    Minutos
                  </Text>
                </View>

                <View className="items-center flex-1">
                  <View className="bg-primary/10 rounded-xl px-4 py-3 w-full items-center">
                    <Text className="text-2xl font-urbanist-bold text-primary">
                      {timeRemaining.seconds.toString().padStart(2, '0')}
                    </Text>
                  </View>
                  <Text className="mt-2 text-xs font-urbanist-medium text-greyscale-600">
                    Segundos
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Sorteio ao Vivo */}
          {hasEventDate && timeRemaining && timeRemaining.isPast && data.status_produto === "activo" && (
            <View className="mx-6 mt-6 bg-white rounded-2xl p-6 shadow-sm">
                <View className="flex-row items-center mb-4">
                    <PrizeIcon />
                    <Text className="ml-2 text-sm font-urbanist-medium text-greyscale-700">
                        Sorteio ao vivo
                    </Text>
                </View>
                <Text className="mt-1 text-xl font-urbanist-bold text-primary">
                    Processando...
                </Text>
            </View>
          )}

          {/* Detalhes Adicionais */}
          <View className="mx-6 mt-6 bg-white rounded-2xl p-6 shadow-sm">
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
    </Fragment>
  );
}