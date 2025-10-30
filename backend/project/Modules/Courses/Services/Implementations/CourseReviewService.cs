using project.Models;

public class CourseReviewService : ICourseReviewService
{
    private readonly ICourseReviewRepository _courseReviewRepository;
    private readonly ICourseRepository _courseRepository;
    private readonly IStudentRepository _studentRepository;
    public CourseReviewService(
        ICourseReviewRepository courseReviewRepository,
        ICourseRepository courseRepository,
        IStudentRepository studentRepository
    )
    {
        _courseReviewRepository = courseReviewRepository;
        _courseRepository = courseRepository;
        _studentRepository = studentRepository;
    }

    public async Task AddCourseReviewAsync(string courseId, CourseReviewCreateDTO courseReviewCreateDTO)
    {
        var courseIdGuid = GuidHelper.ParseOrThrow(courseId, nameof(courseId));

        var courseExists = await _courseRepository.CourseExistsAsync(courseIdGuid.ToString());
        if (!courseExists)
        {
            throw new Exception($"Course with id {courseId} not found");
        }

        var review = new CourseReview
        {
            CourseId = courseId,
            Rating = courseReviewCreateDTO.Rating,
            Comment = courseReviewCreateDTO.Comment,
            StudentId = courseReviewCreateDTO.StudentId,
            CreatedAt = DateTime.UtcNow,
            IsNewest = true,
            ParentId = null
        };

        await _courseReviewRepository.CreateCourseReviewAsync(review);
    }

    public async Task UpdateCourseReviewAsync(string reviewId, CourseReviewUpdateDTO courseReviewUpdateDTO)
    {
        var reviewIdGuid = GuidHelper.ParseOrThrow(reviewId, nameof(reviewId));

        var reviewExists = await _courseReviewRepository.CourseReviewExistsAsync(reviewIdGuid.ToString());
        if (!reviewExists)
        {
            throw new Exception($"Review with id {reviewId} not found");
        }

        var review = await _courseReviewRepository.GetCourseReviewByIdAsync(reviewId) ??
            throw new Exception($"Review with id {reviewId} not found");

        var newestReview = new CourseReview
        {
            Id = Guid.NewGuid().ToString(),
            CourseId = review.CourseId,
            StudentId = review.StudentId,
            Comment = courseReviewUpdateDTO.Comment ?? review.Comment,
            Rating = courseReviewUpdateDTO.Rating ?? review.Rating,
            ParentId = review.Id,
            CreatedAt = DateTime.UtcNow,
            IsNewest = true
        };
        review.IsNewest = false;

        await _courseReviewRepository.CreateCourseReviewAsync(newestReview);
    }

    public async Task<IEnumerable<CourseReviewInforDTO>> GetAllReviewsByCourseIdAsync(string courseId)
    {
        var courseIdGuid = GuidHelper.ParseOrThrow(courseId, nameof(courseId));

        var courseExists = await _courseRepository.CourseExistsAsync(courseIdGuid.ToString());
        if (!courseExists)
        {
            throw new Exception($"Course with id {courseId} not found");
        }

        var reviews = await _courseReviewRepository.GetReviewsByCourseIdAsync(courseId);

        return reviews.Select(r => new CourseReviewInforDTO
        {
            Id = r.Id,
            CourseId = r.CourseId,
            StudentId = r.StudentId,
            Rating = r.Rating,
            Comment = r.Comment,
            CreatedAt = r.CreatedAt,
            IsNewest = r.IsNewest,
            ParentId = r.ParentId
        });
    }

    public async Task<IEnumerable<CourseReviewInforDTO>> GetReviewsByStudentIdAsync(string studentId)
    {
        var studentIdGuid = GuidHelper.ParseOrThrow(studentId, nameof(studentId));

        var studentExists = await _studentRepository.IsStudentExistAsync(studentIdGuid.ToString());
        if (!studentExists)
        {
            throw new Exception($"Student with id {studentId} not found");
        }

        var reviews = await _courseReviewRepository.GetReviewsByStudentIdAsync(studentId);

        return reviews.Select(r => new CourseReviewInforDTO
        {
            Id = r.Id,
            CourseId = r.CourseId,
            StudentId = r.StudentId,
            Rating = r.Rating,
            Comment = r.Comment,
            CreatedAt = r.CreatedAt,
            IsNewest = r.IsNewest,
            ParentId = r.ParentId
        });
    }
}