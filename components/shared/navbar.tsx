import React from 'react'
import { SearchBar } from './search-bar'
import NavbarIcons from './navbar-icons'

export default function Navbar() {
  return (
    <>
      <div className='w-full px-5 py-2 lg:h-[80px] bg-gradient-to-r from-stone-50 to-stone-100 dark:from-stone-800 dark:to-stone-900  flex items-center justify-between'>
        {/* for large screens */}
        <div className='text-2xl font-extrabold text-stone-800 dark:text-stone-100 tracking-tight'>
          Fidel <span className='text-stone-500'>AI</span>
        </div>
        <div className='hidden lg:flex items-center space-x-4 lg:w-[50%] justify-center'>
          <SearchBar />
        </div>
        <NavbarIcons />
      </div>

      {/* for small screens */}
      <div className='lg:hidden px-5 py-2 w-full flex items-center justify-center bg-white'>
        <SearchBar />
      </div>
    </>
  )
}
