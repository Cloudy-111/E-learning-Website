using project.Models;

public class LessonService : ILessonService
{
    private readonly ILessonRepository _lessonRepository;
    private readonly ICourseContentRepository _courseContentRepository;

    public LessonService(
        ILessonRepository lessonRepository,
        ICourseContentRepository courseContentRepository)
    {
        _lessonRepository = lessonRepository;
        _courseContentRepository = courseContentRepository;
    }

    public async Task<LessonInformationDTO> GetLessonByIdAsync(string courseContentId, string id)
    {
        var courseContentExist = await _courseContentRepository.CourseContentExistsByContentIdAsync(courseContentId);
        if (!courseContentExist)
        {
            throw new Exception($"Course content with id: {courseContentId} not found");
        }
        var lesson = await _lessonRepository.GetLessonByIdAsync(id) ?? throw new Exception($"Lesson with id: {id} not found");
        return new LessonInformationDTO
        {
            Id = lesson.Id,
            Title = lesson.Title,
            VideoUrl = lesson.VideoUrl,
            Duration = lesson.Duration,
            TextContent = lesson.TextContent,
            Order = lesson.Order
        };
    }

    public async Task<IEnumerable<LessonCardDTO>> GetLessonsByCourseContentIdAsync(string courseContentId)
    {
        var courseContentExist = await _courseContentRepository.CourseContentExistsByContentIdAsync(courseContentId);
        if (!courseContentExist)
        {
            throw new Exception($"Course content with id: {courseContentId} not found");
        }
        var lessons = await _lessonRepository.GetLessonsByCourseContentIdAsync(courseContentId);
        return lessons.Select(lesson => new LessonCardDTO
        {
            Id = lesson.Id,
            Title = lesson.Title,
            Duration = lesson.Duration,
            Order = lesson.Order
        });
    }

    public async Task AddLessonAsync(string courseContentId, LessonCreateDTO lessonDto)
    {
        var courseContentExist = await _courseContentRepository.CourseContentExistsByContentIdAsync(courseContentId);
        if (!courseContentExist)
        {
            throw new Exception($"Course content with id: {courseContentId} not found");
        }

        var lesson = new Lesson
        {
            Id = Guid.NewGuid().ToString(),
            Title = lessonDto.Title,
            VideoUrl = lessonDto.VideoUrl,
            Duration = lessonDto.Duration,
            TextContent = lessonDto.TextContent,
            Order = lessonDto.Order,
            CourseContentId = courseContentId
        };

        await _lessonRepository.AddLessonAsync(lesson);
    }
}