import { baseFetch } from "./baseApi";

async function fetchCourseReviews(courseId) {
  return baseFetch(`/api/${courseId}/reviews`);
}

export { fetchCourseReviews };
