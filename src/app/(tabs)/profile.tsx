import { useGetUserInfo } from "@/queries/auth";
import { Profile } from "@/screens/profile";

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
