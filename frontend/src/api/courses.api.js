import { baseFetch } from "./baseApi";

async function fetchCourses(params = {}) {
  const searchParams = new URLSearchParams();
  if (params.keyword) searchParams.append("keyword", params.keyword);
  if (params.category) searchParams.append("category", params.category);

  if (params.page) searchParams.append("page", params.page);
  if (params.pageSize) searchParams.append("pageSize", params.pageSize);

  const queryString = searchParams.toString();
  return baseFetch(
    `/api/courses/search${queryString ? `?${queryString}` : ""}`
  );
}

async function fetchCourseDetail(id) {
  return baseFetch(`/api/courses/${id}`);
}

export { fetchCourses, fetchCourseDetail };
