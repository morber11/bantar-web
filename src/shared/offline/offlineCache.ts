import localForage from 'localforage';

const CACHE_LIMIT = 100;

const KEYS = {
    icebreakers: 'offline_icebreakers',
    debates: 'offline_debates',
    toplists: 'offline_toplists',
    mindreader: 'offline_mindreader',
    slop: 'offline_slop',
} as const;

export type CacheKey = keyof typeof KEYS;

export function readCache<T>(key: CacheKey): Promise<T[] | null> {
    return localForage.getItem<T[]>(KEYS[key]);
}

export async function writeCache<T>(key: CacheKey, items: T[]): Promise<void> {
    await localForage.setItem(KEYS[key], items.slice(0, CACHE_LIMIT));
}
