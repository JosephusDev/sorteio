import { useState, useEffect } from "react";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";

export const useNotificationNavigation = (isReady: boolean) => {
  const [pendingRoute, setPendingRoute] = useState<any>(null);

  const navigateNotification = (data: any) => {
    if (data?.screen) {
      setPendingRoute({
        pathname: data.screen,
        params: data.params || {},
      });
    }
  };

  useEffect(() => {
    const checkInitial = () => {
      const response = Notifications.getLastNotificationResponse();
      if (response) {
        navigateNotification(response.notification.request.content.data);
      }
    };

    checkInitial();

    const sub = Notifications.addNotificationResponseReceivedListener(res => {
      navigateNotification(res.notification.request.content.data);
    });

    return () => sub.remove();
  }, []);

  useEffect(() => {
    if (isReady && pendingRoute) {
      router.push(pendingRoute);
      setPendingRoute(null);
    }
  }, [isReady, pendingRoute]);
};
