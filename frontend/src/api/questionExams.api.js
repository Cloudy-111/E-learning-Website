import { authHeader } from "../utils/auth";
import { baseFetch } from "./baseApi";

async function fetchQuestionExamsByExamId(examId) {
  try {
    const response = await baseFetch(`/api/${examId}/question-exams/for-exam`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...authHeader(),
      },
    });
    return response;
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    throw error;
  }
}

export { fetchQuestionExamsByExamId };
