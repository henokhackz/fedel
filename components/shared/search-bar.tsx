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
      className="flex w-full max-w-lg items-center space-x-3 px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-full border border-gray-300 dark:border-gray-700 shadow-md"
    >
      {/* Search Input */}
      <Input
        type="text"
        name="query"
        placeholder="Search movies & shows..."
        className="flex-1 bg-transparent border-none outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 h-full ring-0 focus:ring-0 shadow-none"
        required
      />
      
      {/* Select Dropdown */}
      <Select onValueChange={(value) => setSelectedValue(value)} value={selectedValue}>
        <SelectTrigger className="bg-transparent transition-all duration-300 flex items-center gap-2 text-gray-800 dark:text-gray-200">
          <SelectValue>{selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1)}</SelectValue>
          <ChevronDown size={20} />
        </SelectTrigger>
        <SelectContent className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md shadow-lg">
          <SelectItem value="movies">Movies</SelectItem>
          <SelectItem value="series">Series</SelectItem>
        </SelectContent>
      </Select>

      {/* Hidden Input to Submit Type */}
      <input type="hidden" name="type" value={selectedValue} />

      {/* Search Button */}
      <Button
        type="submit"
        className="bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-full transition-all duration-300 h-full shadow-md"
      >
        Search
      </Button>
    </form>
  )
}
