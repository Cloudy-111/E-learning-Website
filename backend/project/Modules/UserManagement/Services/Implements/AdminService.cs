public class AdminService : IAdminService
{
    private readonly IAdminRepository _adminRepository;
    private readonly ICourseRepository _courseRepository;
    private readonly IUnitOfWork _unitOfWork;

    public AdminService(
        IAdminRepository adminRepository,
        ICourseRepository courseRepository,
        IUnitOfWork unitOfWork)
    {
        _adminRepository = adminRepository;
        _courseRepository = courseRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<PageResultCoursesDTO> GetCoursesByAdminAsync(string userId, string? status, int page, int pageSize)
    {
        var adminExist = await _adminRepository.IsAdminExistAsync(userId);
        if (adminExist == false)
        {
            throw new UnauthorizedAccessException("Admin not found");
        }

        var (courses, totalCount) = await _adminRepository.GetCoursesByAdminAsync(status, page, pageSize);
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

    public async Task AdminApproveCourseAsync(string courseId)
    {
        var course = await _courseRepository.GetCourseByStatusAsync(courseId, "pending") ?? throw new KeyNotFoundException("Course not found");
        course.Status = "published";
        await _unitOfWork.SaveChangesAsync();
    }

    public async Task AdminRejectCourseAsync(string courseId, RejectCourseRequestDTO rejectDTO)
    {
        var course = await _courseRepository.GetCourseByStatusAsync(courseId, "pending") ?? throw new KeyNotFoundException("Course not found");
        course.Status = "rejected";
        // Use reason from rejectDTO if needed
        await _unitOfWork.SaveChangesAsync();
    }

    public async Task<IEnumerable<RefundRequestCourseDTO>> GetPendingRefundRequestsAsync()
    {
        var refundRequests = await _adminRepository.GetRefundRequestsByStatusAsync("pending");
        return refundRequests.Select(rrc => new RefundRequestCourseDTO
        {
            Id = rrc.Id,
            StudentId = rrc.StudentId,
            StudentName = rrc.Student.User.FullName,
            ProcessedBy = rrc.Admin.AdminId,
            EnrollmentId = rrc.EnrollmentId,
            CourseId = rrc.Enrollment.Course.Id,
            CourseTitle = rrc.Enrollment.Course.Title,
            Reason = rrc.Reason,
            Status = rrc.Status,
            CreatedAt = rrc.CreatedAt,
            ProcessedAt = rrc.ProcessedAt,
            RefundAmount = rrc.RefundAmount,
            ProgressSnapshot = rrc.ProgressSnapshot
        });
    }
}