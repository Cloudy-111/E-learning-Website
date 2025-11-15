import { baseFetch } from "./baseApi";

export async function fetchCourses(params = {}) {
  const searchParams = new URLSearchParams();
  if (params.keyword) searchParams.append("keyword", params.keyword);
  if (params.category) searchParams.append("category", params.category);

  if (searchParams.toString()) {
    return baseFetch(`/api/courses/search?${searchParams.toString()}`);
  }

  return baseFetch("/api/courses");
}
