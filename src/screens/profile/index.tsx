import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { LogOutIcon, UserStrokeIcon, HelpStrikeIcon } from "@/assets/icons";
import { Text } from "@/components/Text";
import { ProfilePhoto } from "@/components/ProfilePhoto";
import { router } from "expo-router";
import { ProfileSkeleton } from "@/components/skeleton/ProfileSkeleton";

interface ProfileProps {
  isLoading?: boolean;
  userName?: string;
  userPhone?: string;
  avatarUrl?: string;
}

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress: () => void;
  isDestructive?: boolean;
}
export function Profile({
  userName = "",
  userPhone = "",
  avatarUrl,
  isLoading
}: ProfileProps) {

  const MenuItem = ({
    icon,
    title,
    subtitle,
    onPress,
    isDestructive = false,
  }: MenuItemProps) => (
    <TouchableOpacity
      className="flex-row items-center justify-center py-4 px-6 border-b border-gray-100"
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

  const loading = isLoading || !userName || !userPhone

  return (
    <View className="flex-1 relative">
      <View className="flex-1 bg-white">
        {
          loading ? (
            <ProfileSkeleton />
          ) : (
            <View className="items-center pt-16 pb-4 px-12 bg-gray-300 border-b border-b-gray-200">
              <View className="bg-white absolute rounded-full mt-24 mr-60">
                <ProfilePhoto url={avatarUrl} className="w-28 h-28" />
              </View>
              <Text className="text-xl font-urbanist-bold text-center mt-4 ml-16">
                {userName}
              </Text>
              <Text className="text-gray-400 mt-1 text-center font-urbanist-semiBold ml-16">
                +244 {userPhone.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
              </Text>
            </View>
          )}
        <ScrollView
          className={`flex-1 ${loading ? 'mt-6' : 'mt-20'}`}
          showsVerticalScrollIndicator={false}
        >
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
              onPress={() => router.push("/(modals)/confirm-logout")}
              isDestructive={true}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
