import { api } from "../lib/api";
import { baseFetch } from "./baseApi";
import { authHeader } from "../utils/auth";

/**
 * Admin API calls
 */

// Course Management
// export const getCoursesByStatus = async (status) => {
//   const response = await api.get(`/api/admin/courses/status/${status}`);
//   return response.data;
// };

export const approveCourse = async (courseId) => {
  const response = await api.patch(`/api/admin/courses/${courseId}/approve`);
  return response.data;
};

export const rejectCourse = async (courseId, reason) => {
  const response = await api.patch(`/api/admin/courses/${courseId}/reject`, {
    reason: reason,
  });
  return response.data;
};

// Additional endpoints can be added as backend implements them
async function adminLogin(email, password) {
  try {
    const response = await baseFetch(`/api/Auth/admin-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json", accept: "*/*" },
      body: JSON.stringify({ email, password }),
    });
    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    throw new Error(error);
  }
}

async function getCoursesByStatusByAdmin(params = {}) {
  try {
    const searchParams = new URLSearchParams();
    if (params.status) searchParams.append("status", params.status);
    const queryString = searchParams.toString();

    const response = await baseFetch(
      `/api/admin/courses${queryString ? `?${queryString}` : ""}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
          ...authHeader(),
        },
      }
    );
    if (response.status === "error") {
      throw new Error(response.message);
    }
    return response;
  } catch (error) {
    console.error("Get courses by status error:", error);
    throw new Error(error);
  }
}

export { adminLogin, getCoursesByStatusByAdmin };
