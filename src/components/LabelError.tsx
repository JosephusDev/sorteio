import { Text } from "./Text";

export function LabelError({ message }: { message: string }) {
  return <Text className="text-error text-sm -mt-4">* {message}</Text>;
}
