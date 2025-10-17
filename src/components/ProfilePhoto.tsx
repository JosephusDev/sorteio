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
  <TouchableOpacity
     onPress={onEditPress}
      activeOpacity={0.9}
  >


  <View className="relative">
    <View className="bg-white w-24 h-24 rounded-full items-center justify-center border-4 border-white">
      {url ? (
        <Image source={{ uri: url }} className="w-24 h-24 rounded-full" />
      ) : (
        <AvatarImage />
      )}
    </View>
    {isEditable && (
      <View
        className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-2xl items-center justify-center border-2 border-white"
      >
        <PencilStrokeIcon />
      </View>
    )}
  </View>
    </TouchableOpacity>
);
