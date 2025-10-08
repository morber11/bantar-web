const endpoints = {
    getAllQuestions: `/api/questions/getAll`,
    getQuestionById: (id: number) => `/api/questions/${id}`,
    getQuestionsByRange: (startId: number, limit: number) =>
        `/api/questions/getByRange?startId=${startId}&limit=${limit}`,
    getQuestionsByCategories: (categories: string[]) => {
        if (!categories || categories.length === 0) return `/api/questions/getByCategories`;
        const params = categories.map(c => `categories=${encodeURIComponent(c)}`).join('&');
        return `/api/questions/getByCategories?${params}`;
    },
};

export default endpoints;
