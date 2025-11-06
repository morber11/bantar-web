import apiClient, { toExtendedError } from '../../../shared/api/client';
import endpoints from '../../../shared/api/endpoints';

export async function fetchAllQuestions() {
  try {
    const res = await apiClient.get(endpoints.getAllQuestions);
    return res.data;
  } catch (e) {
    throw toExtendedError(e, 'Failed to fetch all questions');
  }
}

export async function fetchQuestionsByCategories(categories: string[]) {
  try {
    const url = endpoints.getQuestionsByCategories(categories);
    const res = await apiClient.get(url);
    return res.data;
  } catch (e) {
    throw toExtendedError(e, 'Failed to fetch questions by categories');
  }
}
