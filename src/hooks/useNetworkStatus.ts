import { useEffect, useState, useCallback } from "react";
import NetInfo from "@react-native-community/netinfo";

export function useNetworkStatus() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  const checkConnection = useCallback(async () => {
    const state = await NetInfo.fetch();
    setIsConnected(!!state.isConnected);
  }, []);

  useEffect(() => {
    // Listen to realtime net changes
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(!!state.isConnected);
    });

    // Get initial state
    checkConnection();

    return () => unsubscribe();
  }, [checkConnection]);

  return { isConnected };
}
