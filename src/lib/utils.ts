import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number | Date): string {
  const date = new Date(input)
  // 使用固定的日期格式，避免语言环境差异
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}${path}`
}

export function truncateText(text: string, length: number) {
  if (text.length <= length) {
    return text
  }
  return text.slice(0, length) + "..."
}

export function formatNumber(number: number): string {
  return new Intl.NumberFormat('zh-CN').format(number)
}

export function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
} 