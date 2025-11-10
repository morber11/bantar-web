export type HistoryType = 'icebreaker' | 'debate' | 'ai' | 'mindreader';

export interface HistoryItemShape {
  id: string;
  text: string;
  type: HistoryType;
  categories?: string[];
  timestamp: number;
}


