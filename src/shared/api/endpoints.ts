export const endpoints = {

  // Questions controller endpoints
  getAllQuestions: `/api/questions/getAll`,
  getQuestionById: (id: number) => `/api/questions/${id}`,
  getQuestionsByRange: (startId: number, limit: number) =>
    `/api/questions/getByRange?startId=${startId}&limit=${limit}`,
  getQuestionsByCategories: (categories: string[]) => {
    if (!categories || categories.length === 0) return `/api/questions/getByCategories`;
    const params = categories.map((c) => `categories=${encodeURIComponent(c)}`).join('&');
    return `/api/questions/getByCategories?${params}`;
  },

  // Debates controller endpoints
  getAllDebates: `/api/debates/getAll`,
  getDebateById: (id: number) => `/api/debates/${id}`,
  getDebatesByRange: (startId: number, limit: number) =>
    `/api/debates/getByRange?startId=${startId}&limit=${limit}`,
  getDebatesByCategories: (categories: string[]) => {
    if (!categories || categories.length === 0) return `/api/debates/getByCategories`;
    const params = categories.map((c) => `categories=${encodeURIComponent(c)}`).join('&');
    return `/api/debates/getByCategories?${params}`;
  },

  // MindReader controller endpoints
  getAllMindReader: `/api/mindreader/getAll`,

  // Slop controller endpoints
  getAllSlop: `/api/slop/getAll`,

} as const;

export default endpoints;