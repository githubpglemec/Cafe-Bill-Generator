
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date, format: string): string {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const dayOfWeek = date.getDay();
  const hours24 = date.getHours();
  const hours = hours24 % 12 || 12; // 12-hour format
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours24 < 12 ? "am" : "pm";
  
  // Common date formats
  return format
    .replace("yyyy", year.toString())
    .replace("MMMM", months[month])
    .replace("MMM", months[month])
    .replace("MM", (month + 1).toString().padStart(2, "0"))
    .replace("M", (month + 1).toString())
    .replace("dddd", days[dayOfWeek])
    .replace("dd", day.toString().padStart(2, "0"))
    .replace("d", day.toString())
    .replace("HH", hours24.toString().padStart(2, "0"))
    .replace("H", hours24.toString())
    .replace("hh", hours.toString().padStart(2, "0"))
    .replace("h", hours.toString())
    .replace("mm", minutes.toString().padStart(2, "0"))
    .replace("m", minutes.toString())
    .replace("ss", seconds.toString().padStart(2, "0"))
    .replace("s", seconds.toString())
    .replace("a", ampm);
}

export function generateOrderId(): string {
  return Math.random().toString(36).substring(2, 10);
}
