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

export { postEnrollCourse, isEnrolled };
