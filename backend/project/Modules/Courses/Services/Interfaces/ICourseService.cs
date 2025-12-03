public interface ICourseService
{
    Task<IEnumerable<CourseInformationDTO>> GetAllCoursesAsync();
    Task<PageResultCoursesDTO> SearchItemsAsync(string? keyword, string? category, int page, int pageSize);
    Task<CourseInformationDTO> GetCourseByIdAsync(string id);
    Task AddCourseAsync(string userId, CourseCreateDTO courseDto);
    Task UpdateCourseAsync(string userId, string courseId, CourseUpdateDTO courseDto);
    Task RequestPublishCourseAsync(string userId, string courseId);
    Task<PageResultInstructorCoursesDTO> GetCoursesByTeacherIdAsync(string teacherId, string? keyword, string? status, string? sort, int page, int pageSize);
    Task<PageResultCourseEnrollmentDTO> GetEnrolledCoursesByStudentIdAsync(string studentId, string? keyword, string? status, string? sort, int page, int pageSize);
    Task AddFullCourseAsync(string userId, FullCourseCreateDTO fullCourseDto);
}