import axios from 'axios';
import axiosRetry from 'axios-retry';
import { endpoints } from './endpoints';

export type ExtendedError = Error & { status?: number | null };

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '',
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000,
});

const MAX_RETRY = 3;

axiosRetry(apiClient, {
    retries: MAX_RETRY,
    retryDelay: axiosRetry.exponentialDelay,
    retryCondition: (err: Error) => {
        return axiosRetry.isNetworkError(err) || axiosRetry.isRetryableError(err);
    },
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

export function isAPIAlive(): Promise<boolean> {
    return apiClient.get(endpoints.health)
        .then(response => response.status === 200)
        .catch(error => {
            console.error('API health check failed:', error);
            return false;
        });
}

export default apiClient;
