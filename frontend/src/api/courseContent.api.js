import { baseFetch } from "./baseApi";

async function fetchCourseContent(courseId) {
  return baseFetch(`/api/courses/${courseId}/content`);
}

export { fetchCourseContent };
