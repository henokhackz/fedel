'use client'
import { useTokenStore } from '@/store/token.store';
import React, { useEffect } from 'react'

export default function useOsAuth() {
    const [token, setToken] = React.useState<string | null>(null);
    const { setToken: updateToken } = useTokenStore((state) => state as { setToken: (token: string | null) => void });
    useEffect(() => {
        const authApp = async () => {
            const res = await fetch(
                "/api/auth",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                   
                }
            );
            if (!res.ok) {
                throw new Error(`Failed to generate lesson: ${res.status}`);
            }
            const data = await res.json();
            updateToken(data.token);

        };
        
        authApp();
     }, []);
 
  return (
   {
    token,
   }
  )
}
