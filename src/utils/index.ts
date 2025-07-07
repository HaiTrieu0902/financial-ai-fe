import { CURRENCY_FORMAT } from '@/constants'

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

export const calculatePercentage = (current: number, total: number): number => {
  if (total === 0) return 0
  return Math.round((current / total) * 100)
}

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9)
}

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.substr(0, maxLength) + '...'
}
