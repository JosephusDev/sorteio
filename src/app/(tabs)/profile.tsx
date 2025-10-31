import { useGetUserInfo, useLogOutMutation } from "@/queries/auth";
import { Profile } from "@/screens/profile";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { data: userInfo, isLoading } = useGetUserInfo();

  return (
      <Profile
        isLoading={isLoading}
        avatarUrl={userInfo?.avatarUrl}
        userName={userInfo?.nome}
        userPhone={userInfo?.telefone}
      />
  );
}
