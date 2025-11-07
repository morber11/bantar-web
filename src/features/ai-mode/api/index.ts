import apiClient, { toExtendedError } from '../../../shared/api/client';
import endpoints from '../../../shared/api/endpoints';

export async function fetchAllSlop() {
  try {
    const res = await apiClient.get(endpoints.getAllSlop);
    return res.data;
  } catch (e) {
    throw toExtendedError(e, 'Failed to fetch AI items');
  }
}

export default fetchAllSlop;