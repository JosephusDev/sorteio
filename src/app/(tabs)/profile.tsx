import { useLogOutMutation } from "@/queries/auth";
import { Profile } from "@/screens/profile";

export default function ProfileScreen() {
  const { mutateAsync: logout, isPending } = useLogOutMutation();

  return <Profile onLogout={logout} isLoading={isPending} />;
}
