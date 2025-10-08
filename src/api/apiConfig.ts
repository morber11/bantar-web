const API_BASE_URL = import.meta.env.VITE_API_URL || '';

const endpoints = {
    getAllQuestions: `${API_BASE_URL}/api/questions/getAll`,
    getQuestionById: (id: number) => `${API_BASE_URL}/api/questions/${id}`,
    getQuestionsByRange: (startId: number, limit: number) =>
        `${API_BASE_URL}/api/questions/getByRange?startId=${startId}&limit=${limit}`,
    getQuestionsByCategories: (categories: string[]) => {
        if (!categories || categories.length === 0) return `${API_BASE_URL}/api/questions/getByCategories`;
        const params = categories.map(c => `categories=${encodeURIComponent(c)}`).join('&');
        return `${API_BASE_URL}/api/questions/getByCategories?${params}`;
    },
};

export default endpoints;
