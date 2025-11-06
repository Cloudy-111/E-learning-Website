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

    public async Task<IEnumerable<CourseInformationDTO>> GetCoursesByStatusAsync(string status)
    {
        var courses = await _adminRepository.GetCoursesByStatusAsync(status);
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
            CategoryName = c.Category?.Name ?? "Unknown",
            TeacherId = c.TeacherId,
            TeacherName = c.Teacher?.User?.FullName ?? "Unknown"
        });
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

}