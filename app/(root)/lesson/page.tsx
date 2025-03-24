"use client";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Trash2, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Lesson } from "@/type";
import { useSubtitleStore } from "@/store/subtitle.store";
import { useLessonStore } from "@/store/lesson.store";
import { useRouter } from "next/navigation";

export default function SubtitleList() {
  const { subtitle, removeSubtitle } = useSubtitleStore((state) => state);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedLesson, setGeneratedLesson] = useState<Lesson | null>(null);
  const {addLesson} = useLessonStore((state) => state);
  const router = useRouter();

  type MovieData = {
    name: string;
    image: string | null;
    subtitle: string;
    type: "movie" | "series";
  };

  const handleGenerateLesson = async (subtitleItem: MovieData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/open-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subtitleItem }),
      });

      if (!res.ok) {
        setError(`Failed to generate lesson: ${res.status}`);
        throw new Error(`Failed to generate lesson: ${res.status}`);
      }

      const data = await res.json();
      setGeneratedLesson(data);
      setError(null);

      if(data) {
        addLesson(data);
        console.log(data, 'data');
        router.push(`/lesson/${data.lessonTitle}`);
      }

      console.log("Generated lesson:", data);
    } catch (error) {
      setError(`Error generating lesson: ${error instanceof Error ? error.message : "Unknown error"}`);
      console.error("Error generating lesson:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl flex flex-col h-full">
      <div className="text-center mb-10 space-y-3">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-stone-800 to-stone-900 dark:bg-gradient-to-r dark:from-stone-50 dark:to-stone-100 bg-clip-text text-transparent">
          Welcome to Our World
        </h1>
        <p className="text-lg bg-gradient-to-r from-stone-700 to-stone-800 dark:bg-gradient-to-r dark:from-stone-500 dark:to-stone-600 bg-clip-text text-transparent">You're almost there, just one step more</p>
      </div>

      {error && (
        <div className="text-center py-4 mb-4 bg-red-100 text-red-800 rounded-md">
          <p>{error}</p>
        </div>
      )}

      {subtitle.length === 0 ? (
        <div className="text-center py-16 bg-muted/30 rounded-lg border border-border/30">
          <p className="text-muted-foreground">No subtitles added yet</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 border border-gray-300 dark:border-gray-600 p-4 rounded-lg">
          {subtitle.map((subtitleItem) => (
            <motion.div
              key={subtitleItem.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-md border border-gray-300 dark:border-gray-600">
                <CardHeader className="pb-2 pt-6">
                  <h2 className="text-xl font-semibold text-center truncate">{subtitleItem.name}</h2>
                </CardHeader>
                <CardContent className="flex justify-center pb-4">
                  <div className="relative w-32 h-32 overflow-hidden rounded-lg">
                    <Image
                      src={subtitleItem.image || "/no_poster.png"}
                      fill
                      sizes="(max-width: 768px) 100vw, 128px"
                      style={{ objectFit: "cover" }}
                      alt={`${subtitleItem.name} poster`}
                      className="transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center gap-4 pt-2 pb-6">
                  <Button
                    variant="destructive"
                    size="sm"
                    className="gap-1 px-4 py-2 rounded-lg bg-transparent text-stone-800 dark:text-stone-100 cursor-pointer"
                    onClick={() => removeSubtitle(subtitleItem.name)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    className="gap-1 rounded-full px-4 py-2 cursor-pointer bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-white dark:text-stone-800"
                    onClick={() => handleGenerateLesson(subtitleItem)}
                    disabled={loading} 
                  >
                    {loading ? (
                      <span>Generating...</span>
                    ) : (
                      <>
                        <BookOpen className="h-4 w-4" />
                        Generate Lesson
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

    </div>
  );
}
