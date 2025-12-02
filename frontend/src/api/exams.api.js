import { authHeader } from "../utils/auth";
import { baseFetch } from "./baseApi";

async function fetchExamsByLesson(lessonId) {
  try {
    const response = await baseFetch(`/api/exams/lesson/${lessonId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...authHeader(),
      },
    });

    if (response.status === "error") {
      // not enrolled
      if (response.status === 403 || response.status === 401) {
        throw new Error("Bạn chưa ghi danh vào khóa học này");
      }
      throw new Error(response.message || "Lỗi không xác định");
    }

    return response;
  } catch (e) {
    console.error("Fetch exams by lesson error:", e);
    throw new Error(e);
  }
}

async function fetchExamById(examId) {
  try {
    const response = await baseFetch(`/api/exams/${examId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...authHeader(),
      },
    });

    if (response.status === "error") {
      // not enrolled
      if (response.status === 403 || response.status === 401) {
        throw new Error("Bạn chưa ghi danh vào khóa học này");
      }
      throw new Error(response.message || "Lỗi không xác định");
    }

    return response;
  } catch (e) {
    console.error("Fetch exam by id error:", e);
    throw new Error(e);
  }
}

async function submitExamAPI(attemptId, currentAnswers) {
  try {
    const response = await baseFetch(`/api/submit/${attemptId}/submit-exam`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeader(),
      },
      body: JSON.stringify(currentAnswers),
    });

    return response;
  } catch (e) {
    console.error("Submit exam error:", e);
    throw new Error(e);
  }
}

async function fetchExamResults(examId) {
  try {
    const response = await baseFetch(`/api/exams/${examId}/history`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...authHeader(),
      },
    });

    return response;
  } catch (e) {
    console.error("Fetch exam results error:", e);
    throw new Error(e);
  }
}

async function fetchSubmissionExamByAttemmptId(attemptId) {
  try {
    const response = await baseFetch(
      `/api/exams/${attemptId}/detail-submission`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...authHeader(),
        },
      }
    );
    return response;
  } catch (e) {
    console.error("Fetch submission exam by attempt id error:", e);
    throw new Error(e);
  }
}

async function fetchUserSubmissionBySubmissionexamId(submissionExamId) {
  try {
    const response = await baseFetch(
      `/api/exams/submission-exam/${submissionExamId}/user-submission-result`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...authHeader(),
        },
      }
    );
    return response;
  } catch (e) {
    console.error("Fetch user submission by submission exam id error:", e);
    throw new Error(e);
  }
}

export {
  fetchExamsByLesson,
  fetchExamById,
  submitExamAPI,
  fetchExamResults,
  fetchSubmissionExamByAttemmptId,
  fetchUserSubmissionBySubmissionexamId,
};
