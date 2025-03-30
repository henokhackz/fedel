import {create} from 'zustand'
import {persist} from 'zustand/middleware'



export const useTokenStore = create(
    persist<{ token: string; setToken: (token: string) => void }>(
        (set) => ({
            token: '',
            setToken: (token: string) => set({ token }),
        }),
        {
            name: 'token',
        }
    )
)