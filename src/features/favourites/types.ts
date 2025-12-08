import type { HistoryType } from '../../shared/types/history';

export interface FavouriteItem {
    id: string;
    text: string;
    type: HistoryType;
    categories?: string[];
    timestamp: number;
}
