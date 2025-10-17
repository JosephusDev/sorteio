import React, { useEffect, useState } from "react";
import { View, ScrollView, Alert } from "react-native";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import { ProfilePhoto } from "@/components/ProfilePhoto";
import * as ImagePicker from "expo-image-picker";
import {
  CalendarFillIcon,
  EmailIcon,
  PhoneIcon,
  UserIcon,
} from "@/assets/icons";
import { router } from "expo-router";
import { usePickerImageStore } from "@/stores/Image";

export function EditProfile({ avatarUrl }: { avatarUrl?: string }) {
  const [image, setImage] = useState<string | null>(avatarUrl!);
  const { setImage: setPickerResult } = usePickerImageStore();

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.log("Permissão negada");
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const file_size = result.assets[0].fileSize || 0;
      console.log("Tamanho em MB:", file_size / (1024 * 1024));
      if (file_size > 5 * 1024 * 1024) {
        Alert.alert("Aviso", "O Tamanho máximo permitido é 5 MB");
        return;
      }
      setImage(result.assets[0].uri);
      setPickerResult(result);
      router.push(`/(modals)/confirm-upload?uri=${result.assets[0].uri}`);
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  return (
    <ScrollView
      className="flex-1 px-6 pt-6 bg-white"
      showsVerticalScrollIndicator={false}
    >
      {/* Foto de Perfil com ícone de edição */}
      <View className="items-center mb-6">
        <ProfilePhoto onEditPress={pickImage} isEditable url={image!} />
      </View>

      {/* Formulário */}
      <View className="flex-col gap-4 my-8">
        <InputField label="Nome Completo" icon={<UserIcon width={15} />} />

        <InputField
          label="E-mail"
          keyboardType="email-address"
          icon={<EmailIcon width={15} />}
        />

        <InputField
          label="Telefone"
          keyboardType="phone-pad"
          icon={<PhoneIcon width={15} />}
        />

        <InputField label="Endereço" icon={<UserIcon width={15} />} />

        <InputField
          label="Data de Nascimento"
          keyboardType="numeric"
          icon={<CalendarFillIcon width={15} />}
        />

        {/* Botão Salvar Alterações apenas */}
        <View className="mt-4">
          <Button title="Salvar Alterações" onPress={() => {}} />
        </View>
      </View>
    </ScrollView>
  );
}
