export const endpoints = {

  // Icebreakers controller endpoints
  getAllIcebreakers: `/api/icebreakers/getAll`,
  getIcebreakerById: (id: number) => `/api/icebreakers/${id}`,
  getIcebreakersByRange: (startId: number, limit: number) =>
    `/api/icebreakers/getByRange?startId=${startId}&limit=${limit}`,
  getIcebreakersByCategories: (categories: string[]) => {
    if (!categories || categories.length === 0) return `/api/icebreakers/getByCategories`;
    const params = categories.map((c) => `categories=${encodeURIComponent(c)}`).join('&');
    return `/api/icebreakers/getByCategories?${params}`;
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

  // TopLists controller endpoints
  getAllToplists: `/api/toplists/getAll`,

} as const;

export default endpoints;