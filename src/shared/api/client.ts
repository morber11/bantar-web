import axios from 'axios';

export type ExtendedError = Error & { status?: number | null };

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

export function toExtendedError(error: unknown, fallback: string): ExtendedError {
  let message = fallback;
  let status: number | null = null;
  if (axios.isAxiosError(error)) {
    message = error.response?.data?.message || error.message || fallback;
    status = error.response?.status ?? null;
  } else if (error instanceof Error) {
    message = error.message;
  }
  const err = new Error(message) as ExtendedError;
  err.status = status;
  return err;
}

export default apiClient;
