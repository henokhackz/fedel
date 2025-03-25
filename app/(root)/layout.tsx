import React from 'react'
import Footer from '@/components/shared/footer'
import Navbar from '@/components/shared/navbar'
import { Sub } from '@radix-ui/react-dropdown-menu'

export default function RootLayout({children}:{children:React.ReactNode}) {
  return (
   
    <div className='flex flex-col space-y-2  w-full h-full' suppressHydrationWarning>
        <Navbar/>
        <div className='flex flex-col items-center justify-center min-h-screen w-full'>
          {children}
        </div>
        <Footer/>
    </div>
   
  )
}
