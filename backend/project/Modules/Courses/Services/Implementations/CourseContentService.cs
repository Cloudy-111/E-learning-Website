using project.Models;

public class CourseContentService : ICourseContentService
{
    private readonly ICourseContentRepository _courseContentRepository;
    private readonly ICourseRepository _courseRepository;

    public CourseContentService(
        ICourseContentRepository courseContentRepository,
        ICourseRepository courseRepository)
    {
        _courseContentRepository = courseContentRepository;
        _courseRepository = courseRepository;
    }

    public async Task AddCourseContentAsync(string courseId, CourseContentCreateDTO contentDto)
    {
        var courseExist = await _courseRepository.CourseExistsAsync(courseId);
        if (!courseExist)
        {
            throw new KeyNotFoundException("Course not found");
        }
        var courseContentExist = await _courseContentRepository.CourseContentExistsAsync(courseId);
        if (courseContentExist)
        {
            throw new Exception("Course content already exists for this course");
        }

        var content = new CourseContent
        {
            CourseId = courseId,
            Title = contentDto.Title,
            Introduce = contentDto.Introduce,
        };

        await _courseContentRepository.AddCourseContentAsync(content);
    }

    public async Task UpdateCourseContentAsync(string contentId, CourseContentUpdateDTO contentDto)
    {
        var contentExist = await _courseContentRepository.CourseContentExistsByContentIdAsync(contentId);
        if (!contentExist)
        {
            throw new KeyNotFoundException("Course content not found");
        }

        var existingContent = await _courseContentRepository.GetCourseContentByIdAsync(contentId) ?? throw new KeyNotFoundException("Course content not found");

        var courseExist = await _courseRepository.GetCourseByIdAsync(existingContent.CourseId) ?? throw new KeyNotFoundException("Course not found");
        if (courseExist.Status != "draft")
        {
            throw new InvalidOperationException("Cannot update course content unless the course is in draft status");
        }

        existingContent.Title = contentDto.Title;
        existingContent.Introduce = contentDto.Introduce;

        await _courseContentRepository.UpdateCourseContentAsync(existingContent);
    }

    public async Task<CourseContentInformationDTO> GetCourseContentInformationDTOAsync(string courseId)
    {
        var courseExist = await _courseRepository.CourseExistsAsync(courseId);
        if (!courseExist)
        {
            throw new KeyNotFoundException("Course not found");
        }
        var courseContent = await _courseContentRepository.GetCourseContentByCourseIdAsync(courseId) ?? throw new KeyNotFoundException("Course content not found");

        return new CourseContentInformationDTO
        {
            Title = courseContent.Title,
            Introduce = courseContent.Introduce,
        };
    }
}