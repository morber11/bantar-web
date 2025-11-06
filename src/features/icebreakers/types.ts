export type ListItem = {
  id: number;
  text: string;
  categories: string[];
};

export const QuestionCategory = {
  ICEBREAKER: 'Icebreakers',
  CASUAL: 'Casual',
  ROMANTIC: 'Romantic',
  NSFW: 'NSFW/18+',
  BUSINESS: 'Business',
  HOBBIES: 'Hobbies',
  SPORTS: 'Sports',
  PHILOSOPHICAL: 'Philosophical',
  ART: 'Art',
  TRAVEL: 'Travel',
  TELEVISION_MOVIES: 'Television / Movies',
  FASHION: 'Fashion',
  LIFESTYLE: 'Lifestyle',
  FOOD_DRINK: 'Food & Drink',
  FUN_HUMOUR: 'Fun / Humour',
  SCIENCE: 'Science',
  RELATIONSHIPS: 'Relationships',
  CHILDHOOD: 'Childhood',
} as const;

export type QuestionCategory = keyof typeof QuestionCategory;

export const questionCategoryKeys = Object.keys(QuestionCategory) as QuestionCategory[];
