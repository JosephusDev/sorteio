import { CardIcon, HomeIcon, MoneyIcon, UserIcon } from "@/assets/icons";
import { registerForPushNotificationsAsync } from "@/services/notifications";
import { Tabs } from "expo-router";
import { Fragment, useEffect } from "react";
import { StatusBar } from "react-native";
import { useSetPushTokenMutation } from "@/queries/auth";
import { usePushTokenStore } from "@/stores/push-token";

export default function ProtectedLayout() {

  const {mutateAsync: setExpoPushToken} = useSetPushTokenMutation()
  const {pushToken} = usePushTokenStore()

  useEffect(() => {
    setExpoPushToken(pushToken!)
  }, []);

  return (
    <Fragment>
      <StatusBar barStyle={"dark-content"} backgroundColor={"#fff"} />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#4D5DFA",
          tabBarInactiveTintColor: "#9E9E9E",
          tabBarLabelStyle: {
            fontFamily: "Urbanist_600SemiBold",
            fontSize: 13,
          },
          headerShadowVisible: false
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Início",
            tabBarIcon: ({ color, focused }) => (
              <HomeIcon color={color} fill={focused ? color : "none"} />
            ),
          }}
        />
        <Tabs.Screen
          name="bet"
          options={{
            title: "Apostas",
            tabBarIcon: ({ color, focused }) => (
              <MoneyIcon color={color} fill={focused ? color : "none"} />
            ),
          }}
        />
        <Tabs.Screen
          name="card"
          options={{
            title: "Transações",
            tabBarIcon: ({ color, focused }) => (
              <CardIcon color={color} fill={focused ? color : "none"} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Perfil",
            tabBarIcon: ({ color, focused }) => (
              <UserIcon color={color} fill={focused ? color : "none"} />
            ),
          }}
        />
      </Tabs>
    </Fragment>
  );
}
