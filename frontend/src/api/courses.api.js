import { baseFetch } from "./baseApi";
import { authHeader } from "../utils/auth";

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

async function createCourseAPI(payload) {
  try {
    const response = await baseFetch(`/api/courses/create-full-course`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeader(),
      },
      body: JSON.stringify(payload),
    });

    if (response.status === "error") {
      throw new Error(response.message || "Lỗi không xác định");
    }
    return response;
  } catch (e) {
    console.error("Create course error:", e);
    throw new Error(e);
  }
}

async function fetchInstructorCourses(params = {}) {
  const searchParams = new URLSearchParams();
  if (params.keyword) searchParams.append("keyword", params.keyword);
  if (params.status) searchParams.append("status", params.status);
  if (params.sort) searchParams.append("sort", params.sort);

  if (params.page) searchParams.append("page", params.page);
  if (params.pageSize) searchParams.append("pageSize", params.pageSize);
  const queryString = searchParams.toString();
  return baseFetch(
    `/api/courses/instructor${queryString ? `?${queryString}` : ""}`,
    {
      method: "GET",
      headers: {
        ...authHeader(),
      },
    }
  );
}

export {
  fetchCourses,
  fetchCourseDetail,
  createCourseAPI,
  fetchInstructorCourses,
};
