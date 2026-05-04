import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export function formatDateTime(date: string | Date) {
  const d = new Date(date);
  const formattedDate = d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const formattedTime = d.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).replace('.', ':');
  return `${formattedDate}, ${formattedTime}`;
}

export function formatTime(date: string | Date) {
  return new Date(date).toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).replace('.', ':');
}

export function getTimeDifferenceInHours(date: string | Date) {
  const diff = new Date(date).getTime() - new Date().getTime();
  return diff / (1000 * 60 * 60);
}

export function isPastDeadline(date: string | Date) {
  return new Date(date).getTime() < new Date().getTime();
}
