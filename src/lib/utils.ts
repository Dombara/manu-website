import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getGetInTouchPath(pathname: string) {
  const parentPath = pathname
    .replace(/\/get-in-touch\/?$/, "")
    .replace(/\/+$/, "");
  return `${parentPath}/get-in-touch`;
}

export function isGetInTouchPath(pathname: string) {
  return /\/get-in-touch\/?$/.test(pathname);
}