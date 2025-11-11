import { IcebreakerCategory } from '../../features/icebreakers/types';
import { DebateCategory } from '../../features/debates/types';

const buildMap = () => {
  const map: Record<string, string> = {};

  // IcebreakerCategory
  Object.keys(IcebreakerCategory).forEach((k) => {
    const val = (IcebreakerCategory as Record<string, string>)[k];
    map[k.toLowerCase()] = val;
    map[val.toLowerCase()] = val;
  });

  // DebateCategory
  Object.keys(DebateCategory).forEach((k) => {
    const val = (DebateCategory as Record<string, string>)[k];
    map[k.toLowerCase()] = val;
    map[val.toLowerCase()] = val;
  });

  return map;
};

const CATEGORY_MAP = buildMap();

export const normalizeCategory = (input: string) => {
  if (!input) return input;
  const key = input.trim().toLowerCase();
  return CATEGORY_MAP[key] ?? input;
};

export const normalizeCategories = (items: string[] | undefined) => {
  if (!items || items.length === 0) return [] as string[];
  return items.map(normalizeCategory);
};

export default normalizeCategory;
