'use client'


import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSubtitleStore } from "@/store/subtitle.store";

export default function SubtitleUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [cleanedSubtitle, setCleanedSubtitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const addSubtitle = useSubtitleStore((state) => state.addSubtitle)

  const router = useRouter();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append("subtitle", file);

      const res = await fetch("/api/upload-subtitle", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Upload failed with status: ${res.status}`);
      }

      const data = await res.json();
      setCleanedSubtitle(data.cleanedSubtitle);
      const subtitleData = {
        name: 'social network',
        subtitle: data.cleanedSubtitle,
        type: "movie" as "movie",
        image: '/The_Social_Network_film_poster.png'
      }
            
      addSubtitle(subtitleData)
       
      console.log("Cleaned subtitle:", data.cleanedSubtitle);
      router.push('/lesson');
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "File upload failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 rounded-lg shadow h-full" >
      <h2 className="text-xl font-bold mb-4">Subtitle Processor</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Upload subtitle file (.srt, .vtt)
        </label>
        <input 
          type="file" 
          accept=".srt,.vtt" 
          onChange={handleFileChange}
          className="block w-full text-sm border border-gray-300 rounded p-2"
          disabled={isLoading}
        />
      </div>
      
      {error && (
        <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <button 
        onClick={handleUpload}
        disabled={isLoading || !file}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded disabled:opacity-50"
      >
        {isLoading ? "Processing..." : "Upload & Process"}
      </button>
    </div>
  );
}