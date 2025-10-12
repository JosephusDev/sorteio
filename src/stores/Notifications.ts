import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NotificationStore } from '@/types'

export const useNotificationCountStore = create<NotificationStore>()(
	persist(
		set => ({
			qtd: 0,
			setQtd: (qtd) => set({ qtd }),
			resetQtd: () => set({ qtd: 0 }),
		}),
		{
			name: 'notification-count-storage',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
)
