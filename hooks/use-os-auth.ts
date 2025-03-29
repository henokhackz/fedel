'use client'
import React, { useEffect } from 'react'

export default function useOsAuth() {
    const [token, setToken] = React.useState<string | null>(null);
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
            setToken(data.token);
        };
        
        authApp();
     }, []);
 
  return (
   {
    token,
   }
  )
}
