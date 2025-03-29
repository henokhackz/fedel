'use client'

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSubtitleStore } from "@/store/subtitle.store";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function SubtitleUploader({setOpen}: {setOpen: React.Dispatch<React.SetStateAction<boolean>>}) {
  const [file, setFile] = useState<File | null>(null);
  const [cleanedSubtitle, setCleanedSubtitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const addSubtitle = useSubtitleStore((state) => state.addSubtitle);

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
      console.log(data, 'data');
      setCleanedSubtitle(data.cleanedSubtitle);


      const subtitleData = {
        id: uuidv4(),
        name: 'social network',
        subtitle: data.cleanedSubtitle,
        type: "movie" as "movie",
        image: '/The_Social_Network_film_poster.png'
      }

      if(data && data.cleanedSubtitle) {
        addSubtitle(subtitleData);
        console.log("Cleaned subtitle:", data.cleanedSubtitle);
      }  
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "File upload failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 rounded-lg shadow-md bg-stone-50">
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
      
      {!cleanedSubtitle ? (
        <div className="flex flex-col gap-2">
        <Button
          onClick={handleUpload}
          disabled={isLoading || !file}
          className="w-full bg-stone-900 hover:bg-stone-800 text-white font-medium py-2 px-4 rounded disabled:opacity-50"
        >
          {isLoading ? "Processing..." : "Upload & Process"}
        </Button>
        <Button
          onClick={() => setOpen(false)}
          disabled={isLoading || !file}
          variant={"outline"}
          className="w-full cursor-pointer"
        >
          Close
          </Button>
          </div>
      ) : (
        <Button
          onClick={() => router.push('/lesson')}
          variant="outline"
          className="w-full mt-2"
        >
          Go to Lesson Generator <ChevronRight size={20} className="ml-2 cursor-pointer" />
        </Button>
        
      )}
    </div>
  );
}
