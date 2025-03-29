import React from 'react'
import { SearchBar } from './search-bar'
import NavbarIcons from './navbar-icons'
import Link from 'next/link'

export default function Navbar() {
  return (
    <>
      <div className='sticky top-0 z-50 backdrop-blur-lg w-full px-5 py-2 lg:h-[80px] bg-gradient-to-r from-stone-100 to-stone-400 dark:from-stone-800 dark:to-stone-900 flex items-center justify-between border-b border-stone-300 dark:border-stone-800 rounded-lg'>
        {/* for large screens */}
        <Link href={'/'}>
        <div className='text-2xl font-extrabold text-stone-800 dark:text-stone-100 tracking-tight'>
          Fidel <span className='text-stone-500'>AI</span>
        </div>
        </Link>
        <div className='hidden lg:flex items-center space-x-4 lg:w-[50%] justify-center'>
          <SearchBar />
        </div>
        <NavbarIcons />
      </div>

      {/* for small screens */}
      <div className='lg:hidden px-5 py-2 w-full flex items-center justify-center space-x-4'>
        <SearchBar />
      </div>
    </>
  )
}
