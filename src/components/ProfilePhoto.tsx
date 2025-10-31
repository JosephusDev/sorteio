import { AvatarImage, PencilStrokeIcon } from "@/assets/icons";
import { cn } from "@/utils/cn";
import { Image, TouchableOpacity, View, ImageProps } from "react-native";

interface ProfilePhotoProps extends ImageProps {
  isEditable?: boolean;
  url?: string;
  onEditPress?: () => void;
}

export const ProfilePhoto = ({
  onEditPress,
  url,
  isEditable = false,
  className,
  ...rest
}: ProfilePhotoProps) => (
  <TouchableOpacity onPress={onEditPress} activeOpacity={0.9}>
    <View className="relative">
      <View className="bg-white w-24 h-24 rounded-full items-center justify-center border-4 border-white">
        {url ? (
          <Image source={{ uri: url }} className={cn("w-24 h-24 rounded-full", className)} {...rest} />
        ) : (
          <AvatarImage />
        )}
      </View>
      {isEditable && (
        <View className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-2xl items-center justify-center border-2 border-white">
          <PencilStrokeIcon />
        </View>
      )}
    </View>
  </TouchableOpacity>
);
