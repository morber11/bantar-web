import axios from 'axios';
import endpoints from './apiConfig';

const apiService = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const fetchAllQuestions = async () => {
    try {
        const response = await apiService.get(endpoints.getAllQuestions);
        return response.data;
    } catch (error) {
        console.error('Error fetching all questions:', error);
        throw new Error('Failed to fetch all questions');
    }
};

export const fetchQuestionById = async (id: number) => {
    try {
        const response = await apiService.get(endpoints.getQuestionById(id));
        return response.data;
    } catch (error) {
        console.error(`Error fetching question with ID ${id}:`, error);
        throw new Error(`Failed to fetch question with ID ${id}`);
    }
};

export const fetchQuestionsByRange = async (startId: number, limit: number) => {
    try {
        const response = await apiService.get(endpoints.getQuestionsByRange(startId, limit));
        return response.data;
    } catch (error) {
        console.error(`Error fetching questions in range ${startId} - ${limit}:`, error);
        throw new Error(`Failed to fetch questions in range ${startId} - ${limit}`);
    }
};

export const fetchQuestionsByCategories = async (categories: string[]) => {
    try {
        const url = endpoints.getQuestionsByCategories(categories);
        const response = await apiService.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching questions by categories:', error);
        throw new Error('Failed to fetch questions by categories');
    }
};
