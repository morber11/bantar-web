export type HistoryType = 'icebreaker' | 'debate' | 'ai' | 'mindreader' | 'toplist';

export interface HistoryItemShape {
  id: string;
  text: string;
  type: HistoryType;
  categories?: string[];
  timestamp: number;
}


