using project.Models;

public class CourseService : ICourseService
{
    private readonly ICourseRepository _courseRepository;
    private readonly ICourseContentRepository _courseContentRepository;
    private readonly IUserRepository _userRepository;
    private readonly ITeacherRepository _teacherRepository;
    private readonly IStudentRepository _studentRepository;

    public CourseService(
        ICourseRepository courseRepository,
        ICourseContentRepository courseContentRepository,
        IUserRepository userRepository,
        ITeacherRepository teacherRepository,
        IStudentRepository studentRepository)
    {
        _courseRepository = courseRepository;
        _courseContentRepository = courseContentRepository;
        _userRepository = userRepository;
        _teacherRepository = teacherRepository;
        _studentRepository = studentRepository;
    }

    public async Task<IEnumerable<CourseInformationDTO>> GetAllCoursesAsync()
    {
        var courses = await _courseRepository.GetAllCoursesAsync();

        return courses.Select(c => new CourseInformationDTO
        {
            Id = c.Id,
            Title = c.Title,
            Description = c.Description,
            Price = c.Price,
            DiscountPrice = c.DiscountPrice,
            Status = c.Status,
            ThumbnailUrl = c.ThumbnailUrl,
            CreatedAt = c.CreatedAt,
            UpdatedAt = c.UpdatedAt,
            AverageRating = c.AverageRating,
            ReviewCount = c.ReviewCount,
            CategoryId = c.CategoryId,
            CategoryName = c.Category.Name,
            TeacherId = c.TeacherId,
            TeacherName = c.Teacher.User.FullName
        });
    }

    public async Task<PageResultCoursesDTO> SearchItemsAsync(string? keyword, string? category, int page, int pageSize)
    {
        try
        {
            var (courses, totalCount) = await _courseRepository.SearchItemsAsync(keyword, category, page, pageSize);
            var courseResult = courses.Select(c => new CourseInformationDTO
            {
                Id = c.Id,
                Title = c.Title,
                Description = c.Description,
                Price = c.Price,
                DiscountPrice = c.DiscountPrice,
                Status = c.Status,
                ThumbnailUrl = c.ThumbnailUrl,
                CreatedAt = c.CreatedAt,
                UpdatedAt = c.UpdatedAt,
                AverageRating = c.AverageRating,
                ReviewCount = c.ReviewCount,
                CategoryId = c.CategoryId,
                CategoryName = c.Category?.Name ?? "Unknown",
                TeacherId = c.TeacherId,
                TeacherName = c.Teacher?.User?.FullName ?? "Unknown"
            });

            return new PageResultCoursesDTO
            {
                Courses = courseResult,
                CurrentPage = page,
                PageSize = pageSize,
                TotalCount = totalCount,
                TotalPages = (int)Math.Ceiling((double)totalCount / pageSize)
            };
        }
        catch (Exception ex)
        {
            throw new Exception("Error when retriev course: ", ex);
        }

    }

    public async Task<CourseInformationDTO> GetCourseByIdAsync(string id)
    {
        var courseExist = await _courseRepository.CourseExistsAsync(id);
        if (!courseExist)
        {
            throw new KeyNotFoundException("Course not found");
        }
        var course = await _courseRepository.GetCourseByIdAsync(id) ?? throw new KeyNotFoundException("Course not found");
        return new CourseInformationDTO
        {
            Id = course.Id,
            Title = course.Title,
            Description = course.Description,
            Price = course.Price,
            DiscountPrice = course.DiscountPrice,
            Status = course.Status,
            ThumbnailUrl = course.ThumbnailUrl,
            CreatedAt = course.CreatedAt,
            UpdatedAt = course.UpdatedAt,
            AverageRating = course.AverageRating,
            ReviewCount = course.ReviewCount,
            CategoryId = course.CategoryId,
            CategoryName = course.Category.Name,
            TeacherId = course.TeacherId,
            TeacherName = course.Teacher.User.FullName
        };
    }

    public async Task AddCourseAsync(string teacherId, CourseCreateDTO courseDto)
    {
        var teacherGuid = GuidHelper.ParseOrThrow(teacherId, nameof(teacherId));
        if (!await _teacherRepository.IsTeacherExistsAsync(teacherId))
        {
            throw new KeyNotFoundException("Teacher not found");
        }
        var course = new Course
        {
            Title = courseDto.Title,
            Description = courseDto.Description,
            CategoryId = courseDto.CategoryId,
            TeacherId = teacherId,
            Price = courseDto.Price,
            DiscountPrice = courseDto.DiscountPrice,
            ThumbnailUrl = courseDto.ThumbnailUrl,
            Status = "draft",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        await _courseRepository.AddCourseAsync(course);
    }

    public async Task UpdateCourseAsync(string teacherId, string courseId, CourseUpdateDTO courseDto)
    {
        var courseExist = await _courseRepository.GetCourseByIdAsync(courseId) ??
            throw new KeyNotFoundException("Course not found");
        if (!courseExist.Status.Equals("draft", StringComparison.InvariantCultureIgnoreCase))
        {
            throw new InvalidOperationException("Only draft courses can be updated");
        }
        var teacherGuid = GuidHelper.ParseOrThrow(teacherId, nameof(teacherId));
        if (courseExist.TeacherId != teacherId)
        {
            throw new UnauthorizedAccessException("You are not the teacher of this course");
        }
        courseExist.Title = courseDto.Title;
        courseExist.Description = courseDto.Description;
        courseExist.CategoryId = courseDto.CategoryId;
        courseExist.Price = courseDto.Price;
        courseExist.DiscountPrice = courseDto.DiscountPrice;
        courseExist.ThumbnailUrl = courseDto.ThumbnailUrl;

        await _courseRepository.UpdateCourseAsync(courseExist);
    }

    public async Task RequestPublishCourseAsync(string teacherId, string courseId)
    {
        var courseExist = await _courseRepository.GetCourseByStatusAsync(courseId, "draft") ??
            throw new KeyNotFoundException("Course not found");
        if (!courseExist.Status.Equals("draft", StringComparison.InvariantCultureIgnoreCase))
        {
            throw new InvalidOperationException("Only draft courses can request publish");
        }
        var teacherGuid = GuidHelper.ParseOrThrow(teacherId, nameof(teacherId));
        if (courseExist.TeacherId != teacherId)
        {
            throw new UnauthorizedAccessException("You are not the teacher of this course");
        }
        courseExist.Status = "pending";

        await _courseRepository.UpdateCourseAsync(courseExist);
    }

    public async Task<IEnumerable<CourseInformationDTO>> GetCoursesByTeacherIdAsync(string teacherId)
    {
        var teacherGuid = GuidHelper.ParseOrThrow(teacherId, nameof(teacherId));
        if (!await _teacherRepository.IsTeacherExistsAsync(teacherId))
        {
            throw new KeyNotFoundException("Teacher not found");
        }
        var courses = await _courseRepository.GetCoursesByTeacherIdAsync(teacherId);
        if (courses == null || !courses.Any())
        {
            return [];
        }
        return courses.Select(c => new CourseInformationDTO
        {
            Id = c.Id,
            Title = c.Title,
            Description = c.Description,
            Price = c.Price,
            DiscountPrice = c.DiscountPrice,
            Status = c.Status,
            ThumbnailUrl = c.ThumbnailUrl,
            CreatedAt = c.CreatedAt,
            UpdatedAt = c.UpdatedAt,
            AverageRating = c.AverageRating,
            ReviewCount = c.ReviewCount,
            CategoryId = c.CategoryId,
            CategoryName = c.Category.Name,
            TeacherId = c.TeacherId,
            TeacherName = c.Teacher.User.FullName
        });
    }

    public async Task<IEnumerable<CourseInformationDTO>> GetEnrolledCoursesByStudentIdAsync(string studentId)
    {
        var studentGuid = GuidHelper.ParseOrThrow(studentId, nameof(studentId));
        if (!await _studentRepository.IsStudentExistAsync(studentId))
        {
            throw new KeyNotFoundException("Student not found");
        }
        var courses = await _courseRepository.GetEnrolledCoursesByStudentIdAsync(studentId);
        if (courses == null || !courses.Any())
        {
            return [];
        }
        return courses.Select(c => new CourseInformationDTO
        {
            Id = c.Id,
            Title = c.Title,
            Description = c.Description,
            Price = c.Price,
            DiscountPrice = c.DiscountPrice,
            Status = c.Status,
            ThumbnailUrl = c.ThumbnailUrl,
            CreatedAt = c.CreatedAt,
            UpdatedAt = c.UpdatedAt,
            AverageRating = c.AverageRating,
            ReviewCount = c.ReviewCount,
            CategoryId = c.CategoryId,
            CategoryName = c.Category.Name,
            TeacherId = c.TeacherId,
            TeacherName = c.Teacher.User.FullName
        });
    }
}