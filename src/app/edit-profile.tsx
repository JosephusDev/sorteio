import { useGetUserInfo } from "@/queries/auth";
import { EditProfile } from "@/screens/edit-profile";

export default function EditProfileScreen() {
  const { data: userInfo } = useGetUserInfo();
  return <EditProfile avatarUrl={userInfo?.avatarUrl} />;
}
