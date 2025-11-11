import apiClient, { toExtendedError } from '../../../shared/api/client';
import endpoints from '../../../shared/api/endpoints';

export async function fetchAllIcebreakers() {
  try {
    const res = await apiClient.get(endpoints.getAllIcebreakers);
    return res.data;
  } catch (e) {
    throw toExtendedError(e, 'Failed to fetch all icebreakers');
  }
}

export async function fetchIcebreakersByCategories(categories: string[]) {
  try {
    const url = endpoints.getIcebreakersByCategories(categories);
    const res = await apiClient.get(url);
    return res.data;
  } catch (e) {
    throw toExtendedError(e, 'Failed to fetch icebreakers by categories');
  }
}
