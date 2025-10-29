public class RequestUpdateService : IRequestUpdateService
{
    private readonly IRequestUpdateRepository _requestUpdateRepository;
    private readonly ICourseRepository _courseRepository;
    private readonly ICourseContentRepository _courseContentRepository;
    private readonly ILessonRepository _lessonRepository;
    private readonly ITeacherRepository _teacherRepository;

    public RequestUpdateService(
        IRequestUpdateRepository requestUpdateRepository,
        ICourseRepository courseRepository,
        ICourseContentRepository courseContentRepository,
        ILessonRepository lessonRepository,
        ITeacherRepository teacherRepository)
    {
        _requestUpdateRepository = requestUpdateRepository;
        _courseRepository = courseRepository;
        _courseContentRepository = courseContentRepository;
        _lessonRepository = lessonRepository;
        _teacherRepository = teacherRepository;
    }

    public async Task CreateRequestUpdateAsync(RequestUpdateRequestDTO requestDto)
    {
        var targetType = requestDto.TargetType;

        if (!Guid.TryParse(requestDto.TargetId, out _) || !Guid.TryParse(requestDto.RequestById, out _))
        {
            throw new ArgumentException("Invalid TargetId or RequestById. It must be a valid GUID.");
        }

        switch (targetType.ToLowerInvariant())
        {
            case "course":
                if (!await _courseRepository.CourseExistsAsync(requestDto.TargetId))
                    throw new ArgumentException("Course with the given TargetId does not exist.");
                break;

            case "coursecontent":
                if (!await _courseContentRepository.CourseContentExistsByContentIdAsync(requestDto.TargetId))
                    throw new ArgumentException("CourseContent with the given TargetId does not exist.");
                break;

            case "lesson":
                if (await _lessonRepository.GetLessonByIdAsync(requestDto.TargetId) == null)
                    throw new ArgumentException("Lesson with the given TargetId does not exist.");
                break;

            default:
                throw new ArgumentException("Invalid TargetType. Only 'course', 'coursecontent', 'lesson' is allowed.");
        }

        if (await _teacherRepository.IsTeacherExistsAsync(requestDto.RequestById) == false)
        {
            throw new ArgumentException("Teacher with the given RequestById does not exist.");
        }

        var updateRequestCourse = new UpdateRequestCourse
        {
            TargetType = requestDto.TargetType,
            TargetId = requestDto.TargetId,
            RequestById = requestDto.RequestById,
            UpdatedDataJSON = requestDto.UpdatedDataJSON,
            RequestedAt = DateTime.UtcNow
        };

        await _requestUpdateRepository.CreateRequestUpdateRequestAsync(updateRequestCourse);
    }
}