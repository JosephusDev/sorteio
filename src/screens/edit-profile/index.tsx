import React from "react";
import { View, ScrollView } from "react-native";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import { ProfilePhoto } from "@/components/ProfilePhoto";
import {
  CalendarFillIcon,
  EmailIcon,
  PhoneIcon,
  UserIcon,
} from "@/assets/icons";

export function EditProfile() {
  return (
    <ScrollView
      className="flex-1 px-6 pt-6 bg-white"
      showsVerticalScrollIndicator={false}
    >
      {/* Foto de Perfil com ícone de edição */}
      <View className="items-center mb-6">
        <ProfilePhoto onEditPress={() => {}} isEditable />
      </View>

      {/* Formulário */}
      <View className="flex-col gap-4 my-8">
        <InputField label="Nome Completo" icon={<UserIcon />} />

        <InputField
          label="E-mail"
          keyboardType="email-address"
          icon={<EmailIcon />}
        />

        <InputField
          label="Telefone"
          keyboardType="phone-pad"
          icon={<PhoneIcon />}
        />

        <InputField label="Endereço" icon={<UserIcon />} />

        <InputField
          label="Data de Nascimento"
          keyboardType="numeric"
          icon={<CalendarFillIcon />}
        />

        {/* Botão Salvar Alterações apenas */}
        <View className="mt-4">
          <Button title="Salvar Alterações" onPress={() => {}} />
        </View>
      </View>
    </ScrollView>
  );
}
