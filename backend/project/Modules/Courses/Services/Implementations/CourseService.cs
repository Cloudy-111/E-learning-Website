using project.Models;

public class CourseService : ICourseService
{
    private readonly ICourseRepository _courseRepository;
    private readonly ICourseContentRepository _courseContentRepository;

    public CourseService(
        ICourseRepository courseRepository,
        ICourseContentRepository courseContentRepository)
    {
        _courseRepository = courseRepository;
        _courseContentRepository = courseContentRepository;
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
            CategoryId = c.CategoryId,
            CategoryName = c.Category.Name,
            TeacherId = c.TeacherId,
            TeacherName = c.Teacher.User.FullName
        });
    }

    public async Task<CourseInformationDTO> GetCourseByIdAsync(string id)
    {
        var course = await _courseRepository.GetCourseByIdAsync(id) ??
            throw new KeyNotFoundException("Course not found");

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
            CategoryId = course.CategoryId,
            CategoryName = course.Category.Name,
            TeacherId = course.TeacherId,
            TeacherName = course.Teacher.User.FullName
        };
    }

    public async Task AddCourseAsync(CourseCreateDTO courseDto)
    {
        var course = new Course
        {
            Title = courseDto.Title,
            Description = courseDto.Description,
            CategoryId = courseDto.CategoryId,
            TeacherId = courseDto.TeacherId,
            Price = courseDto.Price,
            DiscountPrice = courseDto.DiscountPrice,
            ThumbnailUrl = courseDto.ThumbnailUrl,
        };

        await _courseRepository.AddCourseAsync(course);
    }

    public async Task UpdateCourseAsync(string courseId, CourseUpdateDTO courseDto)
    {
        var courseExist = await _courseRepository.GetCourseByIdAsync(courseId) ??
            throw new KeyNotFoundException("Course not found");
        if (courseExist.Status != "draft")
        {
            throw new InvalidOperationException("Only draft courses can be updated");
        }
        courseExist.Title = courseDto.Title;
        courseExist.Description = courseDto.Description;
        courseExist.CategoryId = courseDto.CategoryId;
        courseExist.Price = courseDto.Price;
        courseExist.DiscountPrice = courseDto.DiscountPrice;
        courseExist.ThumbnailUrl = courseDto.ThumbnailUrl;
        courseExist.Status = courseDto.Status;

        await _courseRepository.UpdateCourseAsync(courseExist);
    }
}