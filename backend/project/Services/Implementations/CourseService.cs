public class CourseService : ICourseService
{
    private readonly ICourseRepository _courseRepository;

    public CourseService(ICourseRepository courseRepository)
    {
        _courseRepository = courseRepository;
    }

    public async Task<IEnumerable<CourseInformationDTO>> GetAllCoursesAsync()
    {
        return await _courseRepository.GetAllCoursesAsync();
    }
}