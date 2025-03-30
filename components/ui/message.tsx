import React from 'react'

export default function Message({ text, type }: { text: string; type: string }) {
    return (
        <div
            className={`w-full flex items-center justify-center max-w-2xl h-[400px] p-6 rounded-xl  ${
                type === 'success'
                    ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
                    : 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300'
            }`}
        >
            <p className="text-lg font-semibold">{text}</p>
        </div>
    )
}
