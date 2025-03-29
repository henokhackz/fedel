import {  X } from 'lucide-react'
import React from 'react'

export default function Modal({open, setOpen, children}: {open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, children: React.ReactNode}) {
  return (
    <div className="fixed inset-0 z-10 bg-stone-800/50 bg-opacity-50 backdrop-blur-sm">
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg dark:bg-stone-800">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          {children}
        </div>
      </div>
    </div>
  )
}
