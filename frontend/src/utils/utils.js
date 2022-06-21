const BASE_URL =
  process.env.BACKEND_API || "https://project-fleamarket.herokuapp.com";

export const API_URL = (slug) => `${BASE_URL}/${slug}`;
