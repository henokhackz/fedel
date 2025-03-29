import React from 'react'

export default function Modal({open, setOpen, children}: {open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, children: React.ReactNode}) {
  return (
    <div className="fixed inset-0 z-10 bg-stone-800/50 bg-opacity-50 backdrop-blur-sm">
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg dark:bg-stone-800">
          {children}
        </div>
      </div>
    </div>
  )
}

