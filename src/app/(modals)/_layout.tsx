import { Stack } from "expo-router";
import { Fragment } from "react";

export default function ModalLayout() {
  return (
    <Fragment>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="confirm-logout" />
        <Stack.Screen name="confirm-upload" />
      </Stack>
    </Fragment>
  );
}
