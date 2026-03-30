export const resolvePagination = (page?: number, limit?: number) => {
  const safePage = page && page > 0 ? page : 1;
  const safeLimit = limit && limit > 0 ? Math.min(limit, 50) : 12;

  return {
    page: safePage,
    limit: safeLimit,
    skip: (safePage - 1) * safeLimit
  };
};

