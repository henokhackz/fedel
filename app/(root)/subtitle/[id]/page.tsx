'use client'
import { useSubtitleStore } from '@/store/subtitle.store';
import React, { use, useEffect, useState } from 'react';
import Loading from '@/components/ui/loading';
import useOsAuth from '@/hooks/use-os-auth';

export default function Subtitle({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { subtitle } = useSubtitleStore((state) => state);
    const {token} = useOsAuth()

    const subtitleData = subtitle.find((item) => item.id === id);
    //@ts-expect-error
    const file_id = subtitleData?.files?.map((item) => item.file_id);

    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const downloadSubtitle = async () => {
            try {
                setIsLoading(true);
                const res = await fetch(`/api/subtitle/download`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'file_id': file_id,
                          token: token
                    }),
                })
                const data = await res.json();
                console.log(data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
                
            }
        }
        downloadSubtitle()
    }, [file_id]);

    
       

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen w-screen">
                <Loading />
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center h-screen w-screen">
            <div>Subtitle download complete!</div>
        </div>
    );
}
