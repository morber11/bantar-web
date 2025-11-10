export interface MindReaderPrompt {
    id: number | string;
    text: string;
    categories?: string[];
}

export type MindReaderResponse = MindReaderPrompt[];