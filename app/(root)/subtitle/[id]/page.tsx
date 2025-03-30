'use client';

import { useSubtitleStore } from '@/store/subtitle.store';
import React, { useEffect, useState } from 'react';
import Loading from '@/components/ui/loading';
import { useTokenStore } from '@/store/token.store';
import { useRouter } from 'next/navigation';

interface SubtitleParams {
    id: string;
}

export default function Subtitle({ params }: { params: Promise<SubtitleParams> }) {
    const [isLoading, setIsLoading] = useState(true);
    const [subtitleId, setSubtitleId] = useState<string | null>(null);

    const { subtitle, addSubtitle } = useSubtitleStore((state) => state);
    const { token } = useTokenStore((state) => state);
    const router = useRouter();

    useEffect(() => {
        const fetchParams = async () => {
            try {
                const resolvedParams = await params;
                setSubtitleId(resolvedParams.id);
            } catch (error) {
                console.error('Failed to resolve params:', error);
                setSubtitleId(null);
            }
        };

        fetchParams();
    }, [params]);

    const subtitleData = subtitle.find((item) => item.id === subtitleId);
    const fileId = subtitleData?.attributes.files?.[0]?.file_id;

    useEffect(() => {
        if (!fileId || !token) return;

        const downloadSubtitle = async () => {
            try {
                setIsLoading(true);

                const response = await fetch('/api/subtitle/download', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ file_id: fileId, token }),
                });

                if (!response.ok) {
                    throw new Error(`Failed to download subtitle: ${response.statusText}`);
                }

                const { cleaned_subtitle: cleanedSubtitle, ...restSubtitleData } = await response.json();

                if (subtitleData?.id) {
                    addSubtitle({ cleanedSubtitle, ...restSubtitleData });
                    router.push('/lesson');
                } else {
                    console.error('Subtitle data is missing a valid id.');
                }
            } catch (error) {
                console.error('Error downloading subtitle:', error);
            } finally {
                setIsLoading(false);
            }
        };

        downloadSubtitle();
    }, [fileId, token, subtitleData, addSubtitle, router]);

    if (!subtitleId) {
        return (
            <div className="flex items-center justify-center h-screen w-screen">
                <h1>Invalid subtitle ID</h1>
            </div>
        );
    }

    if (!fileId) {
        return (
            <div className="flex items-center justify-center h-screen w-screen">
                <h1>Subtitle not found</h1>
            </div>
        );
    }

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
