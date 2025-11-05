public interface IAdminService
{
    // Admin methods for managing courses
    Task<IEnumerable<CourseInformationDTO>> GetCoursesByStatusAsync(string status);
    Task AdminApproveCourseAsync(string courseId);
    Task AdminRejectCourseAsync(string courseId, RejectCourseRequestDTO rejectDto);

    // Admin methods for managing enrollment
    // Task<IEnumerable<RefundRequestCourseDTO>> GetRefundRequestsByStatusAsync(string status);
}