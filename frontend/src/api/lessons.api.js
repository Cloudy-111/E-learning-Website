import { baseFetch } from "./baseApi";

async function fetchListLessons(courseContentId) {
  return baseFetch(`/api/course-contents/${courseContentId}/lessons`);
}

export { fetchListLessons };
