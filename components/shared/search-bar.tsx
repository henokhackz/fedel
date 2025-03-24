"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select"
import { ChevronDown } from "lucide-react"

export function SearchBar() {
  const [selectedValue, setSelectedValue] = useState("movies")

  return (
    <form
      action={'/search'}
      method="GET"
      className="flex w-full max-w-lg items-center space-x-3 px-4 py-2 bg-gradient-to-r from-stone-100 to-gray-50 dark:from-stone-800 dark:via-stone-900 dark:to-stone-800 rounded-full border border-stone-300 dark:border-stone-700"
    >
      {/* Search Input */}
      <Input
        type="text"
        name="query"
        placeholder="Search movies & shows..."
        className="flex-1  border-none outline-none text-stone-800 dark:text-stone-200 placeholder-stone-400 dark:placeholder-stone-500 h-full ring-0 focus:ring-0 shadow-none bg-transparent"
        required
      />
      
      {/* Select Dropdown */}
      <Select onValueChange={(value) => setSelectedValue(value)} value={selectedValue}>
        <SelectTrigger className="bg-transparent transition-all duration-300 flex items-center gap-2 text-gray-800 dark:text-gray-200">
          <SelectValue>{selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1)}</SelectValue>
          <ChevronDown size={20} />
        </SelectTrigger>
        <SelectContent className="bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-md">
          <SelectItem value="movies">Movies</SelectItem>
          <SelectItem value="series">Series</SelectItem>
        </SelectContent>
      </Select>

      {/* Hidden Input to Submit Type */}
      <input type="hidden" name="type" value={selectedValue} />

      {/* Search Button */}
      <Button
         variant="primary"
        className="flex items-center gap-2 p-2 bg-stone-800 dark:text-stone-50 hover:bg-stone-700 dark:bg-stone-700 dark:hover:bg-stone-600 text-white dark:hover:text-stone-50 cursor-pointer font-semibold px-4 py-2 rounded-full transition-all duration-300"
      >
        Search
      </Button>
    </form>
  )
}
