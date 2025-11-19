import { baseFetch } from "./baseApi";
import { authHeader } from "../utils/auth";

async function postEnrollCourse(courseId) {
  return baseFetch(`/api/courses/${courseId}/enrollments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
  });
}

async function isEnrolled(courseId) {
  return baseFetch(`/api/courses/${courseId}/enrollments/is-enrolled`, {
    method: "GET",
    headers: {
      ...authHeader(),
    },
  });
}

async function fetchEnrollmentsByStudentId(params = {}) {
  const searchParams = new URLSearchParams();
  if (params.keyword) searchParams.append("keyword", params.keyword);
  if (params.category) searchParams.append("category", params.category);

  if (params.page) searchParams.append("page", params.page);
  if (params.pageSize) searchParams.append("pageSize", params.pageSize);

  const queryString = searchParams.toString();
  return baseFetch(
    `/api/courses/student/enrolled-courses${
      queryString ? `?${queryString}` : ""
    }`,
    {
      method: "GET",
      headers: {
        ...authHeader(),
      },
    }
  );
}

export { postEnrollCourse, isEnrolled, fetchEnrollmentsByStudentId };
