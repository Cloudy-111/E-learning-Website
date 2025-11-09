public interface ICourseService
{
    Task<IEnumerable<CourseInformationDTO>> GetAllCoursesAsync();
    Task<IEnumerable<CourseInformationDTO>> GetCoursesAsync(string? keyword, string? category, int page, int pageSize);
    Task<CourseInformationDTO> GetCourseByIdAsync(string id);
    Task AddCourseAsync(string userId, CourseCreateDTO courseDto);
    Task UpdateCourseAsync(string userId, string courseId, CourseUpdateDTO courseDto);
    Task RequestPublishCourseAsync(string userId, string courseId);
}