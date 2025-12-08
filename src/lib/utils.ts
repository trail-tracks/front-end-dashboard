import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(path: string | null | undefined): string | null { 
  if (!path) return null;

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const baseUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;

  return `${baseUrl}/${path}`;
}
