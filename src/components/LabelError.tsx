import { Text } from "./Text";

export function LabelError({ message }: { message: string }) {
  return <Text className="text-red-600 text-sm -mt-4">* {message}</Text>;
}
