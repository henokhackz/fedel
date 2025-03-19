import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, ChevronDown, User } from 'lucide-react'
import { Button } from '../ui/button'
import { ModeToggle } from '../ui/toggle-button'

export default function NavbarIcons() {
  return (
  <div className="flex gap-4 items-center">
    <div className="flex items-center gap-2">
    <div className="flex items-center justify-center gap-2 p-2 rounded-full cursor-pointer hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors">
      <Bell size={20} className="text-stone-800 dark:stroke-stone-50" />
    </div>
    <ModeToggle />
    </div>
    <div>
    <DropdownMenu>
      <DropdownMenuTrigger>
      <Button
        variant="primary"
        className="flex items-center gap-2 p-2 bg-stone-800 hover:bg-stone-700 dark:bg-stone-700 dark:hover:bg-stone-600 text-white font-semibold px-4 py-2 rounded-full transition-all duration-300"
      >
        <User size={20} className='text-stone-50'/>
        <span className="text-sm text-stone-50">John Doe</span>
        <ChevronDown size={20} />
      </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white dark:bg-stone-800 shadow-md rounded-md">
      <DropdownMenuLabel className="text-stone-700 dark:text-stone-300">My Account</DropdownMenuLabel>
      <DropdownMenuSeparator className="border-stone-200 dark:border-stone-600" />
      <DropdownMenuItem className="hover:bg-stone-100 dark:hover:bg-stone-700">Profile</DropdownMenuItem>
      <DropdownMenuItem className="hover:bg-stone-100 dark:hover:bg-stone-700">Billing</DropdownMenuItem>
      <DropdownMenuItem className="hover:bg-stone-100 dark:hover:bg-stone-700">Team</DropdownMenuItem>
      <DropdownMenuItem className="hover:bg-stone-100 dark:hover:bg-stone-700">Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  </div>
  )
}
