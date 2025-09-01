const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const endpoints = {
    getAllQuestions: `${API_BASE_URL}/questions/getAll`,
    getQuestionById: (id: number) => `${API_BASE_URL}/questions/${id}`,
    getQuestionsByRange: (startId: number, limit: number) =>
        `${API_BASE_URL}/questions/getByRange?startId=${startId}&limit=${limit}`,
};

export default endpoints;
