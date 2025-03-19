import Footer from '@/components/shared/footer'
import Navbar from '@/components/shared/navbar'
import React from 'react'

export default function RootLayout({children}:{children:React.ReactNode}) {
  return (
    <div className='flex flex-col  min-h-screen w-full'>
        <Navbar/>
        <div className='flex flex-col items-center justify-center min-h-screen w-full'>
          {children}
        </div>
        <Footer/>
    </div>
  )
}
