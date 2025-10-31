public interface ICourseService
{
    Task<IEnumerable<CourseInformationDTO>> GetAllCoursesAsync();
    Task<IEnumerable<CourseInformationDTO>> GetCoursesAsync(string? keyword, string? category, int page, int pageSize);
    Task<CourseInformationDTO> GetCourseByIdAsync(string id);
    Task AddCourseAsync(CourseCreateDTO courseDto);
    Task UpdateCourseAsync(string courseId, CourseUpdateDTO courseDto);
    Task RequestPublishCourseAsync(string courseId);
}