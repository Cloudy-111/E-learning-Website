using project.Models;

public interface IAdminRepository
{
    // Admin methods for managing courses
    Task<IEnumerable<Course>> GetCoursesByStatusAsync(string status);
    Task<IEnumerable<UpdateRequestCourse>> GetUpdateRequestsByStatusAsync(string status);
    Task<IEnumerable<UpdateRequestCourse>> GetAllUpdateRequestsAsync();
    Task<IEnumerable<RefundRequestCourse>> GetRefundRequestsByStatusAsync(string status);
}