import apiClient, { toExtendedError } from '../../../shared/api/client';
import endpoints from '../../../shared/api/endpoints';
import type { MindReaderResponse } from '../types';

export async function fetchMindReaderPrompts(): Promise<MindReaderResponse> {
    try {
        const response = await apiClient.get(endpoints.getAllMindReader);
        return response.data;
    } catch (error) {
        throw toExtendedError(error, 'Failed to fetch mind reader prompts');
    }
}