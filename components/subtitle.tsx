'use client';
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

type SubtitleData = {
    id: string;
    attributes: {
        language: string;
        release: string;
        url: string;
    };
};

export default function Subtitle({ subtitles }: { subtitles: SubtitleData[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [episode, setEpisode] = useState('');

    const handleChoose = (subtitleId: string) => {
        console.log('Chosen subtitle ID:', subtitleId);
        // Implement selection logic
    };

    

    const filteredSubtitles = subtitles.filter(sub => 
        sub.attributes.release.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.attributes.language.toLowerCase().includes(searchTerm.toLowerCase())
    );


    // useEffect(() => {
    //     const authenticaateApp = async () => {
    //         try {
    //             const res = await fetch(
    //                 `http://www.omdbapi.com/?`
    //             );
    //             console.log(res, 'response is ')
               
    // }
    // , [subtitles]);

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-stone-100 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-stone-800 mb-4">Choose Subtitle</h3>
            <div className="mb-4">
                <Input
                    placeholder="Search subtitles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-2"
                />
                <Input
                    placeholder="Episode"
                    value={episode}
                    onChange={(e) => setEpisode(e.target.value)}
                />
            </div>
            <ScrollArea className="h-60 border rounded-lg bg-stone-50 p-2">
                <ul className="space-y-2">
                    {filteredSubtitles.map((subtitle) => (
                        <Card key={subtitle.id} className="p-3 flex justify-between items-center cursor-pointer hover:bg-stone-200 transition">
                            <span className="text-stone-700">
                                {subtitle.attributes.release} ({subtitle.attributes.language})
                            </span>
                            <Button variant="secondary" onClick={() => handleChoose(subtitle.id)}>
                                Choose
                            </Button>
                        </Card>
                    ))}
                </ul>
            </ScrollArea>
        </div>
    );
}