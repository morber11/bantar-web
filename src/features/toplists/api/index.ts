import apiClient, { toExtendedError } from '../../../shared/api/client';
import endpoints from '../../../shared/api/endpoints';
import type { ListItem } from '../types';

export async function fetchToplists(): Promise<ListItem[]> {
    try {
        const response = await apiClient.get(endpoints.getAllToplists);
        return response.data;
    } catch (error) {
        throw toExtendedError(error, 'Failed to fetch top lists');
    }
}
