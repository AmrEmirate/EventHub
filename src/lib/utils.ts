import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, showFree: boolean = false): string {
  if (showFree && price === 0) return "Gratis";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export type DateFormat = "short" | "long" | "full" | "datetime";

export function formatDate(
  dateString: string,
  format: DateFormat = "long"
): string {
  if (!dateString) return "Tanggal tidak tersedia";

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    year: "numeric",
  };

  switch (format) {
    case "short":
      options.month = "short";
      break;
    case "long":
      options.month = "long";
      break;
    case "full":
      options.weekday = "long";
      options.month = "long";
      break;
    case "datetime":
      options.month = "long";
      options.hour = "2-digit";
      options.minute = "2-digit";
      break;
  }

  return new Date(dateString).toLocaleDateString("id-ID", options);
}

export function timeAgo(date: string): string {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  );
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " tahun lalu";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " bulan lalu";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " hari lalu";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " jam lalu";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " menit lalu";
  return Math.floor(seconds) + " detik lalu";
}
