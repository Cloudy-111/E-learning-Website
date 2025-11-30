import { api } from "../lib/api";

/**
 * Admin API calls
 */

// Course Management
export const getCoursesByStatus = async (status) => {
    const response = await api.get(`/api/admin/courses/status/${status}`);
    return response.data;
};

export const approveCourse = async (courseId) => {
    const response = await api.patch(`/api/admin/courses/${courseId}/approve`);
    return response.data;
};

export const rejectCourse = async (courseId, reason) => {
    const response = await api.patch(`/api/admin/courses/${courseId}/reject`, {
        reason: reason
    });
    return response.data;
};

// Additional endpoints can be added as backend implements them
