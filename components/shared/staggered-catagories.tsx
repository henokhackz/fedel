'use client';
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Modal from "./modal";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import useCatagoryStatus from "@/hooks/useCatagoryStatus";

const StaggeredCategories = ({lessonId}:{lessonId:string}) => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);


  const {
    isVocabularyCompleted,
    isSlangCompleted,
    isIdiomsCompleted,
    isPhrasalVerbsCompleted,
    isGrammarCompleted,
    isQuizCompleted
  } = useCatagoryStatus({ lessonId });



  const categories = [
    {
      id: "vocabulary",
      color: "text-blue-500",
      name: "Vocabulary",
      isLocked: false,
    },
    {
      id: "phrasal-verbs",
      color: "text-green-500",
      name: "Phrasal Verbs",
      isLocked: !isPhrasalVerbsCompleted,
    },
    {
      id: "idioms",
      color: "text-yellow-500",
      name: "Idioms",
      isLocked: !isIdiomsCompleted,
    },
    {
      id: "slang",
      color: "text-purple-500",
      name: "Slang",
      isLocked: !isSlangCompleted, 
    },
    {
      id: "grammar",
      color: "text-red-500",
      name: "Grammar",
      isLocked: !isGrammarCompleted, 
    },
    {
      id: "quiz",
      
      color: "text-teal-500",
      name: "Quiz",
      isLocked: !isQuizCompleted,
    },
  ];

  const handleCategoryClick = (categoryId: string, isLocked: boolean) => {
    if (isLocked) {
      setSelectedCategory(categoryId);
    }
    router.push(`/lesson/${lessonId}/${categoryId}`);
  };

  const closeModal = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="flex flex-col items-center   w-full py-10 bg-stone-300 text-white dark:bg-stone-800 dark:text-stone-50 rounded-lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, staggerChildren: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl px-4"
      >
        {categories.map((category) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex flex-col items-center p-6 rounded-2xl shadow-lg bg-stone-400 hover:bg-opacity-90 dark:bg-stone-700 transition ${
              category.isLocked ? "cursor-not-allowed bg-stone-400 dark:bg-stone-600" : ""
            }`}
            onClick={() => handleCategoryClick(category.id, category.isLocked ?? false)}
          >
            <motion.div
              className={`p-4 rounded-full border ${
                category.isLocked
                  ? "border-stone-500 bg-stone-500"
                  : "border-stone-600 bg-stone-700"
              }`}
              whileHover={{ rotate: 10 }}

            >
              <Image
                src={category.isLocked ? "/lock.png" : "/start.png"}
                alt={category.isLocked ? "lock" : "star"}
                width={80}
                height={80}
                className={`transition-transform duration-300 ${
                  !category.isLocked ? "hover:scale-110" : ""
                }`}
              />
            </motion.div>
            <h2
              className={`mt-4 text-xl font-semibold px-4 py-2 rounded-lg ${
                category.isLocked ? "bg-stone-500 text-stone-300" : category.color
              }`}
            >
              {category.name}
            </h2>
          </motion.div>
        ))}
      </motion.div>

      {selectedCategory && (
        <div className="inset-0 flex items-center justify-center z-50 fixed">
          <Modal open={!!selectedCategory} setOpen={closeModal}>
            <div className="w-full flex flex-col gap-4 px-6 py-12 bg-stone-100 dark:bg-stone-800 backdrop-blur-md rounded-2xl">
              <div className="flex items-center justify-center">
                <Image src="/lock.png" alt="lock" width={80} height={80} className="object-cover" />
              </div>
              <h3 className="text-center text-3xl font-bold text-red-400">
                This category is locked.
              </h3>
              <p className="text-center text-stone-800 dark:text-stone-50">
                Please unlock it first.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  className="w-1/2 text-stone-800 dark:text-stone-50 hover:bg-stone-200 dark:hover:bg-stone-600 transition-colors duration-300"
                  onClick={closeModal}
                >
                  Cancel
                </Button>
                <Button
                  className="w-1/2 bg-stone-800 text-stone-100 dark:bg-stone-700 dark:text-stone-50 hover:bg-stone-900 dark:hover:bg-stone-600 transition-colors duration-300"
                  onClick={() => {
                    router.push(`/${selectedCategory.toLowerCase()}`);
                    setSelectedCategory(null);
                  }}
                >
                  Unlock
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default StaggeredCategories;
