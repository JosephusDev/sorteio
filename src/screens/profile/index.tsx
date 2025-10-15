import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { LogOutIcon, UserStrokeIcon, HelpStrikeIcon } from "@/assets/icons";
import { Text } from "@/components/Text";
import { ProfilePhoto } from "@/components/ProfilePhoto";
import { router } from "expo-router";

interface ProfileProps {
  onLogout: () => void;
  isLoading?: boolean;
  userName?: string;
  userEmail?: string;
}

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress: () => void;
  isDestructive?: boolean;
}
export function Profile({
  userName = "Usuario",
  userEmail = "usuario@email.com",
}: ProfileProps) {
  const MenuItem = ({
    icon,
    title,
    subtitle,
    onPress,
    isDestructive = false,
  }: MenuItemProps) => (
    <TouchableOpacity
      className="flex-row items-center justify-center py-4 px-4 border-b border-gray-100"
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View className="flex-row items-center flex-1">
        <View className="w-8 mr-3">{icon}</View>
        <View className="flex-1">
          <Text
            className={`font-urbanist-medium ${isDestructive ? "text-error" : "text-gray-800"}`}
          >
            {title}
          </Text>
          {subtitle && (
            <Text className="text-gray-500 text-sm mt-1">{subtitle}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      {/* Header do Perfil - REMOVIDO O BG AZUL */}
      <View className="items-center pt-8 pb-4 px-6 bg-white">
        <ProfilePhoto />
        <Text className="text-2xl font-urbanist-bold text-gray-800 text-center mt-4">
          {userName}
        </Text>
        <Text className="text-gray-600 mt-1 text-center">{userEmail}</Text>
      </View>

      <ScrollView className="flex-1 mt-4" showsVerticalScrollIndicator={false}>
        {/* SEÇÃO PERFIL */}
        <View>
          <MenuItem
            icon={<UserStrokeIcon />}
            title="Editar Perfil"
            subtitle="Altere suas informações pessoais"
            onPress={() => router.push("/edit-profile")}
          />
        </View>

        {/* SEÇÃO AJUDA */}
        <View>
          <MenuItem
            icon={<HelpStrikeIcon />}
            title="Ajuda"
            subtitle="Tire suas dúvidas e obtenha suporte"
            onPress={() => router.push("/help")}
          />
        </View>

        {/* SEÇÃO CONFIGURAÇÕES */}
        <View className="pb-4 pt-2">
          <MenuItem
            icon={<LogOutIcon />}
            title="Terminar Sessão"
            onPress={() => router.push("/modal-logout")}
            isDestructive={true}
          />
        </View>
      </ScrollView>
    </View>
  );
}
