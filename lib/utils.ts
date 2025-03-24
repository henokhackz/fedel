import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function cleanSubtitle(subtitle: string): string {
  return subtitle
    .replace(/\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3}/g, "")
    .replace(/<\/?[^>]+(>|$)/g, "") 
    .replace(/[^a-zA-Z\s]/g, "") 
    .replace(/\s+/g, " ") 
    .trim();
}
