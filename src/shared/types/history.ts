export type HistoryType = 'icebreaker' | 'debate' | 'ai' | 'mindreader' | 'toplist' | 'event';

export interface HistoryItemShape {
  id: string;
  text: string;
  type: HistoryType;
  categories?: string[];
  timestamp: number;
}


