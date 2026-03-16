import type { EventItem } from '../types';
import apiClient, { toExtendedError } from '../../../shared/api/client';
import { endpoints } from '../../../shared/api/endpoints';

export async function fetchAllEvents(): Promise<EventItem[]> {
    try {
        const resp = await apiClient.get<EventItem[]>(endpoints.getLatestEvents);
        return resp.data;
    } catch (err) {
        throw toExtendedError(err, 'Failed to fetch events');
    }
}
