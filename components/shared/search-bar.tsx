"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select"
import { ChevronDown } from "lucide-react"

export function SearchBar() {
  const [selectedValue, setSelectedValue] = useState("movie")

  return (
    <form
      action={'/search'}
      method="GET"
      className="flex w-full max-w-lg items-center space-x-3 px-4  border border-stone-200 dark:border-stone-800  h-[50px] rounded-full"
    >
      {/* Search Input */}
      <input name="query" required type="text" placeholder="search for your favorite movie or series" className="w-full h-full px-2 text-stone-800 outline-none placeholder:text-bg-none bg-none focus:outline-none focus:bg-none rounded-full"/>
      
      {/* Select Dropdown */}
      <Select onValueChange={(value) => setSelectedValue(value)} value={selectedValue}>
        <SelectTrigger className="bg-transparent transition-all duration-300 flex items-center gap-2 text-gray-800 dark:text-gray-200">
          <SelectValue>{selectedValue}</SelectValue>
          <ChevronDown size={20} />
        </SelectTrigger>
        <SelectContent
          className="bg-stone-100 p-4 shadow-lg border border-gray-500 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-md"
          position="popper"
        >
          <SelectItem value="movie">Movie</SelectItem>
          <SelectItem value="series">Series</SelectItem>
        </SelectContent>
      </Select>

      {/* Hidden Input to Submit Type */}
      <input type="hidden" name="type" value={selectedValue} />

      {/* Search Button */}
      <Button
         variant={'default'}
        className="flex items-center gap-2 p-2 bg-stone-800 dark:text-stone-100 hover:bg-stone-700 dark:bg-stone-700 dark:hover:bg-stone-600 text-white dark:hover:text-stone-50 cursor-pointer font-semibold px-4 py-2 rounded-full transition-all duration-300"
      >
        Search
      </Button>
    </form>
  )
}
