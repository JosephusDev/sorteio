import { AvatarImage, PencilStrokeIcon } from "@/assets/icons";
import { Image, TouchableOpacity, View } from "react-native";

export const ProfilePhoto = ({
  onEditPress,
  url,
  isEditable = false,
}: {
  isEditable?: boolean;
  url?: string;
  onEditPress?: () => void;
}) => (
  <View className="relative">
    <View className="bg-white w-24 h-24 rounded-full items-center justify-center border-4 border-white">
      {url ? (
        <Image source={{ uri: url }} className="w-20 h-20 rounded-full" />
      ) : (
        <AvatarImage />
      )}
    </View>
    {isEditable && (
      <TouchableOpacity
        className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-2xl items-center justify-center border-2 border-white"
        onPress={onEditPress}
        activeOpacity={0.9}
      >
        <PencilStrokeIcon />
      </TouchableOpacity>
    )}
  </View>
);
