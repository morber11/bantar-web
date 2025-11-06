import apiClient, { toExtendedError } from '../../../shared/api/client';
import endpoints from '../../../shared/api/endpoints';

export async function fetchDebatesByCategories(categories: string[]) {
  try {
    const url = endpoints.getDebatesByCategories(categories);
    const res = await apiClient.get(url);
    return res.data;
  } catch (e) {
    throw toExtendedError(e, 'Failed to fetch debates by categories');
  }
}

export async function fetchAllDebates() {
  try {
    const res = await apiClient.get(endpoints.getAllDebates);
    return res.data;
  } catch (e) {
    throw toExtendedError(e, 'Failed to fetch all debates');
  }
}
