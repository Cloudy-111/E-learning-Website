using project.Models;

public class CourseService : ICourseService
{
    private readonly ICourseRepository _courseRepository;
    private readonly ICourseContentRepository _courseContentRepository;
    private readonly ICategoryRepository _categoryRepository;
    private readonly IUserRepository _userRepository;
    private readonly ITeacherRepository _teacherRepository;
    private readonly IStudentRepository _studentRepository;
    private readonly ILessonRepository _lessonRepository;
    private readonly DBContext _dbContext;

    public CourseService(
        ICourseRepository courseRepository,
        ICourseContentRepository courseContentRepository,
        ICategoryRepository categoryRepository,
        IUserRepository userRepository,
        ITeacherRepository teacherRepository,
        IStudentRepository studentRepository,
        ILessonRepository lessonRepository,
        DBContext dbContext)
    {
        _courseRepository = courseRepository;
        _courseContentRepository = courseContentRepository;
        _categoryRepository = categoryRepository;
        _userRepository = userRepository;
        _teacherRepository = teacherRepository;
        _studentRepository = studentRepository;
        _lessonRepository = lessonRepository;
        _dbContext = dbContext;
    }

    const string DRAFT_STATUS = "draft";
    const string PENDING_STATUS = "pending";
    const string PUBLISHED_STATUS = "published";

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
            Status = DRAFT_STATUS,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        await _courseRepository.AddCourseAsync(course);
    }

    public async Task UpdateCourseAsync(string teacherId, string courseId, CourseUpdateDTO courseDto)
    {
        var courseExist = await _courseRepository.GetCourseByIdAsync(courseId) ??
            throw new KeyNotFoundException("Course not found");
        if (!courseExist.Status.Equals(DRAFT_STATUS, StringComparison.InvariantCultureIgnoreCase))
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
        var courseExist = await _courseRepository.GetCourseByStatusAsync(courseId, DRAFT_STATUS) ??
            throw new KeyNotFoundException("Course not found");
        if (!courseExist.Status.Equals(DRAFT_STATUS, StringComparison.InvariantCultureIgnoreCase))
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

    public async Task<PageResultCourseEnrollmentDTO> GetEnrolledCoursesByStudentIdAsync(string studentId, string? keyword, string? status, string? sort, int page, int pageSize)
    {
        try
        {
            var studentGuid = GuidHelper.ParseOrThrow(studentId, nameof(studentId));
            if (!await _studentRepository.IsStudentExistAsync(studentId))
            {
                throw new KeyNotFoundException("Student not found");
            }
            var (courses, totalCourses) = await _courseRepository.GetEnrolledCoursesByStudentIdAsync(studentId, keyword, status, sort, page, pageSize);
            var courseResult = courses.Select(c => new CourseEnrollmentInforDTO
            {
                Id = c.Course.Id,
                Title = c.Course.Title,
                Description = c.Course.Description,
                Price = c.Course.Price,
                DiscountPrice = c.Course.DiscountPrice,
                Status = c.Course.Status,
                ThumbnailUrl = c.Course.ThumbnailUrl,
                CreatedAt = c.Course.CreatedAt,
                UpdatedAt = c.Course.UpdatedAt,
                AverageRating = c.Course.AverageRating,
                ReviewCount = c.Course.ReviewCount,
                CategoryId = c.Course.CategoryId,
                CategoryName = c.Course.Category.Name,
                TeacherId = c.Course.TeacherId,
                TeacherName = c.Course.Teacher.User.FullName,
                Progress = (double)c.Progress
            });

            return new PageResultCourseEnrollmentDTO
            {
                Courses = courseResult,
                CurrentPage = page,
                PageSize = pageSize,
                TotalCount = totalCourses,
                TotalPages = (int)Math.Ceiling((double)totalCourses / pageSize)
            };
        }
        catch (Exception ex)
        {
            throw new Exception("Error when retriev enrolled courses: ", ex);

        }
    }

    public async Task AddFullCourseAsync(string userId, FullCourseCreateDTO fullCourseDto)
    {
        if (!await _teacherRepository.IsTeacherExistsAsync(userId))
        {
            throw new KeyNotFoundException("Teacher not found");
        }

        var category = await _categoryRepository.GetCategoryByIdAsync(fullCourseDto.CategoryId)
            ?? throw new KeyNotFoundException($"Category with id {fullCourseDto.CategoryId} not found.");


        using var transaction = await _dbContext.Database.BeginTransactionAsync();

        try
        {
            var course = new Course
            {
                Title = fullCourseDto.Title,
                Description = fullCourseDto.Description,
                CategoryId = fullCourseDto.CategoryId,
                TeacherId = userId,
                Price = (decimal)fullCourseDto.Price,
                DiscountPrice = (decimal?)fullCourseDto.Discount,
                ThumbnailUrl = fullCourseDto.Thumbnail,
                Status = DRAFT_STATUS,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            await _courseRepository.AddCourseAsync(course);

            var courseContent = new CourseContent
            {
                CourseId = course.Id,
                Title = fullCourseDto.CourseContent.Title,
                Description = fullCourseDto.CourseContent.Description,
                Introduce = fullCourseDto.CourseContent.Introduce,
            };

            await _courseContentRepository.AddCourseContentAsync(courseContent);

            List<Lesson> lessons = new List<Lesson>();
            foreach (var lessonDto in fullCourseDto.CourseContent.Lessons)
            {
                var lesson = new Lesson
                {
                    CourseContentId = courseContent.Id,
                    Title = lessonDto.Title,
                    VideoUrl = lessonDto.VideoUrl,
                    Order = lessonDto.Order,
                    Duration = lessonDto.Duration,
                    TextContent = lessonDto.TextContent
                };
                lessons.Add(lesson);
            }

            await _lessonRepository.AddMultiLessonsAsync(lessons);
            await transaction.CommitAsync();
        }
        catch (Exception)
        {
            await transaction.RollbackAsync();
            throw;
        }
    }
}