import { baseFetch } from "./baseApi";
import { authHeader } from "../utils/auth";

async function fetchCourseContent(courseId) {
  return baseFetch(`/api/courses/${courseId}/content`);
}

async function createCourseContent(courseId, payload) {
  return baseFetch(`/api/course/${courseId}/content`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify(payload),
  });
}

export { fetchCourseContent, createCourseContent };
