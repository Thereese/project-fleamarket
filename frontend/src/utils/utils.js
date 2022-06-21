const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

export const API_URL = (slug) => `${BASE_URL}/${slug}`;
