export type DebateItem = {
  id: number;
  text: string;
  categories: string[];
};

export const DebateCategory = {
  CASUAL: 'Casual',
  POLICY: 'Policy',
  ETHICS: 'Ethics',
  TECHNOLOGY: 'Technology',
  ENVIRONMENT: 'Environment',
  EDUCATION: 'Education',
} as const;

export type DebateCategory = keyof typeof DebateCategory;
export const debateCategoryKeys = Object.keys(DebateCategory) as DebateCategory[];
