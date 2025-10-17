public interface ICourseService
{
    Task<IEnumerable<CourseInformationDTO>> GetAllCoursesAsync();
}