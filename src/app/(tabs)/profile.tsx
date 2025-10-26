import { useGetUserInfo, useLogOutMutation } from "@/queries/auth";
import { Profile } from "@/screens/profile";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { mutateAsync: logout, isPending } = useLogOutMutation();
  const { data: userInfo } = useGetUserInfo();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Profile
        onLogout={logout}
        isLoading={isPending}
        avatarUrl={userInfo?.avatarUrl}
        userName={userInfo?.nome}
        userPhone={userInfo?.telefone}
      />
    </SafeAreaView>
  );
}
