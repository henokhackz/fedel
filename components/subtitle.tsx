'use client'
import React from 'react';

type SubtitleData = {
    id: string;
    attributes: {
        language: string;
        release: string;
        url: string;
    };
};

export default function Subtitle({ subtitleData }: { subtitleData: SubtitleData }) {
    const handleDownload = async () => {
        try {
            const response = await fetch(subtitleData.attributes.url);
            if (!response.ok) {
                throw new Error('Failed to fetch the subtitle file');
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${subtitleData.attributes.language}-${subtitleData.attributes.release}.srt`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading subtitle:', error);
        }
    };

    return (
        <div className="w-full  mx-auto p-6 bg-white  rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Subtitle Information</h3>
            <p className="text-gray-600 mb-2">
                <strong className="font-medium text-gray-700">Language:</strong> {subtitleData.attributes.language}
            </p>
            <p className="text-gray-600 mb-4 whitespace-normal max-w-[50px] overflow-hidden overflow-ellipsis">
                <strong className="font-medium ">URL:</strong> {subtitleData.attributes.url}
            </p>
            <p className="text-gray-600 mb-4">  
                <strong className="font-medium ">Release:</strong> {subtitleData.attributes.release}
            </p>
            <button
                onClick={handleDownload}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition duration-200"
            >
                Download Subtitle
            </button>
        </div>
    );
}
