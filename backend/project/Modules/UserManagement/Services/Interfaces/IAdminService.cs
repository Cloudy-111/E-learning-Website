using project.Modules.UserManagement.DTOs;

public interface IAdminService
{
    // Admin methods for managing courses
    Task<PageResultCoursesDTO> GetCoursesByAdminAsync(string userId, string? status, int page, int pageSize);
    Task AdminApproveCourseAsync(string courseId);
    Task AdminRejectCourseAsync(string courseId, RejectCourseRequestDTO rejectDto);

    // Admin methods for managing enrollment
    Task<IEnumerable<RefundRequestCourseDTO>> GetPendingRefundRequestsAsync();
}