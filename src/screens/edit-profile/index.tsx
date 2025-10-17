import React, { useEffect, useState } from "react";
import { View, ScrollView, Alert } from "react-native";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import { ProfilePhoto } from "@/components/ProfilePhoto";
import * as ImagePicker from "expo-image-picker";
import {
  CalendarFillIcon,
  LocationFilledIcon,
  PhoneIcon,
  UserIcon,
} from "@/assets/icons";
import { router } from "expo-router";
import { usePickerImageStore } from "@/stores/Image";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProfileFormValues, ProfileSchema } from "@/schemas/Profile";
import { Controller, useForm } from "react-hook-form";
import { useGetUserInfo, useUpdateProfileMutation } from "@/queries/auth";
import { LabelError } from "@/components/LabelError";
import { formateDate } from "@/utils";

export function EditProfile({ avatarUrl }: { avatarUrl?: string }) {
  const {data} = useGetUserInfo()
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues: {
        name: data?.nome!,
        phone: data?.telefone!,
        address: data?.endereco!,
        birthdate: formateDate({date: data?.data_nascimento!, inverse: true})
    },
  });

  const {
    mutateAsync: updateProfile,
    isPending,
    error,
  } = useUpdateProfileMutation();

const onSubmit = async (values: ProfileFormValues) => {
  try {
    await updateProfile({
      nome: values.name,
      telefone: values.phone,
      data_nascimento: formateDate({ date: values.birthdate }),
      endereco: values.address,
    });
    router.back();
  } catch (err) {
    console.log(err);
  }
};


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
      router.push(`/(modals)/confirm-upload`);
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
           <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Nome Completo"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                icon={<UserIcon width={15}/>}
              />
            )}
            name="name"
          />
          {errors.name && <LabelError message={errors.name.message!} />}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Telefone"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                icon={<PhoneIcon width={15} />}
                keyboardType="number-pad"
                hasMask
                mask={[/\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/]}
              />
            )}
            name="phone"
          />
          {errors.phone && <LabelError message={errors.phone.message!} />}

        <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Endereço"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                icon={<LocationFilledIcon width={15}/>}
              />
            )}
            name="address"
          />
          {errors.address && <LabelError message={errors.address.message!} />}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Data de Nascimento"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                icon={<CalendarFillIcon width={15} />}
                keyboardType="number-pad"
                hasMask
                mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
              />
            )}
            name="birthdate"
          />
          {errors.birthdate && <LabelError message={errors.birthdate.message!} />}


        {/* Botão Salvar Alterações apenas */}
        <View className="mt-4">
          <Button 
          title={isPending ? "Carregando..." : "Salvar Alterações"}
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}  
          />
        </View>
      </View>
    </ScrollView>
  );
}
