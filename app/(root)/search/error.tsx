'use client';
import { Button } from '@/components/ui/button';
import React from 'react';

interface ErrorPageProps {
    error: Error;
    reset: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error, reset }) => {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen h-full space-y-4'>
            <h1 className='text-2xl font-bold text-stone-800 dark:text-stone-100'>Something went wrong</h1>
            <p className='text-red-500 text-md font-semibold'> {error.message}</p>
            <Button
                variant="outline"
                onClick={reset}
                className='text-stone-800 dark:text-stone-100 cursor-pointer hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors'
                >
                Try Again
            </Button>
        </div>
    );
};

export default ErrorPage;