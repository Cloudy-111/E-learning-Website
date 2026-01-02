using project.Models;

public interface IAdminRepository
{
    // Admin methods for managing courses
    Task<(IEnumerable<Course>, int)> GetCoursesByAdminAsync(string? status, int page, int pageSize);
    Task<Course?> GetFullCourseByIdAsync(string courseId);
    Task<IEnumerable<UpdateRequestCourse>> GetUpdateRequestsByStatusAsync(string status);
    Task<IEnumerable<UpdateRequestCourse>> GetAllUpdateRequestsAsync();
    Task<IEnumerable<RefundRequestCourse>> GetRefundRequestsByStatusAsync(string status);
    Task<bool> IsAdminExistAsync(string userId);
}