export type SlopItem = {
    id: number;
    text: string;
    categories?: string[];
};

export const aiCategoryKeys = [] as const;
export type AiCategory = typeof aiCategoryKeys[number];
export type AiItem = SlopItem;