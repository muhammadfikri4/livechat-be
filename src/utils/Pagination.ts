import { Query } from "interface/Query";

export const Pagination = <T>(data: T[], page = 1, perPage = 10) => {
  if (page < 1 || perPage < 1) {
    throw new Error("Page and perPage must be greater than 0");
  }
  const totalPages = Math.ceil(data.length / perPage);
  if (page > totalPages) {
    return []; // Return an empty array if the page number exceeds total pages
  }
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return data.slice(start, end);
};

export const queryPagination = (query: Query) => {
  const { page = "1", perPage = "10" } = query;
  return {
    take: Number(perPage),
    skip: (Number(page) - 1) * Number(perPage),
  };
};
