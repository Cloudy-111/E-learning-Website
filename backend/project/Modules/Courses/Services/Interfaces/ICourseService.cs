public interface ICourseService
{
    Task<IEnumerable<CourseInformationDTO>> GetAllCoursesAsync();
    Task<CourseInformationDTO> GetCourseByIdAsync(string id);
    Task AddCourseAsync(CourseCreateDTO courseDto);
    Task UpdateCourseAsync(CourseUpdateDTO courseDto);
}