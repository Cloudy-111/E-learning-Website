using project.Models;

public class EnrollmentCourseService : IEnrollmentCourseService
{
    private readonly IEnrollmentCourseRepository _enrollmentRepository;
    private readonly ICourseRepository _courseRepository;
    private readonly IStudentRepository _studentRepository;
    public EnrollmentCourseService(
        IEnrollmentCourseRepository enrollmentRepository,
        ICourseRepository courseRepository,
        IStudentRepository studentRepository)
    {
        _enrollmentRepository = enrollmentRepository;
        _courseRepository = courseRepository;
        _studentRepository = studentRepository;
    }

    public async Task<IEnumerable<EnrollmentInforDTO>> GetEnrollmentInCourseAsync(string courseId)
    {
        var courseIdGuid = GuidHelper.ParseOrThrow(courseId, nameof(courseId));

        var course = await _courseRepository.GetCourseByIdAsync(courseId)
            ?? throw new KeyNotFoundException($"Course with id: {courseId} not found");

        var enrollments = await _enrollmentRepository.GetEnrollmentInCourseAsync(courseId);

        if (enrollments == null || !enrollments.Any()) return [];

        return enrollments.Select(en => new EnrollmentInforDTO
        {
            StudentId = en.StudentId ?? "Unknown",
            StudentName = en.Student?.User?.FullName ?? "Unknown",
            CourseId = courseId,
            CourseName = course.Title ?? "Unknown Title",
            EnrolledAt = en.EnrolledAt,
            Progress = en.Progress,
            Status = en.Status ?? "Unknown",
            CertificateUrl = en.CertificateUrl ?? "Unknown"
        });
    }

    public async Task CreateEnrollmentAsync(string courseId, EnrollmentCreateDTO enrollmentCreate)
    {
        var courseIdGuid = GuidHelper.ParseOrThrow(courseId, nameof(courseId));

        var courseExist = await _courseRepository.CourseExistsAsync(courseId);
        if (!courseExist)
        {
            throw new KeyNotFoundException($"Course with id: {courseId} not found");
        }

        var studentExist = await _studentRepository.IsStudentExistAsync(enrollmentCreate.StudentId);
        if (!studentExist)
        {
            throw new KeyNotFoundException($"Student with id: {enrollmentCreate.StudentId} not found");
        }

        var newEnrollment = new Enrollment_course
        {
            Id = Guid.NewGuid().ToString(),
            StudentId = enrollmentCreate.StudentId,
            CourseId = courseId,
            EnrolledAt = DateTime.UtcNow,
            Progress = 0.00m,
            Status = "active",
            CertificateUrl = "No Certificate"
        };

        await _enrollmentRepository.CreateEnrollmentAsync(newEnrollment);
    }

    public async Task<EnrollmentInforDTO> GetEnrollmentByIdAsync(string courseId, string enrollmentId)
    {
        var courseIdGuid = GuidHelper.ParseOrThrow(courseId, nameof(courseId));
        var enrollmentGuid = GuidHelper.ParseOrThrow(enrollmentId, nameof(enrollmentId));

        var courseExist = await _courseRepository.CourseExistsAsync(courseId);
        if (!courseExist)
        {
            throw new KeyNotFoundException($"Course with id: {courseId} not found");
        }

        var enrollment = await _enrollmentRepository.GetEnrrollmentByIdAsync(enrollmentId)
            ?? throw new KeyNotFoundException($"Enrollment with id: {enrollmentId} not found");

        return new EnrollmentInforDTO
        {
            StudentId = enrollment.StudentId ?? "Unknown",
            StudentName = enrollment.Student?.User?.FullName ?? "Unknown",
            CourseId = courseId,
            CourseName = enrollment.Course?.Title ?? "Unknown Title",
            EnrolledAt = enrollment.EnrolledAt,
            Progress = enrollment.Progress,
            Status = enrollment.Status ?? "Unknown",
            CertificateUrl = enrollment.CertificateUrl ?? "Unknown"
        };
    }

    public async Task UpdateProgressEnrollmentAsync(string courseId, string enrollmentId)
    {
        var courseIdGuid = GuidHelper.ParseOrThrow(courseId, nameof(courseId));
        var enrollmentGuid = GuidHelper.ParseOrThrow(enrollmentId, nameof(enrollmentId));

        var courseExist = await _courseRepository.CourseExistsAsync(courseId);
        if (!courseExist)
        {
            throw new KeyNotFoundException($"Course with id: {courseId} not found");
        }

        var enrollment = await _enrollmentRepository.GetEnrrollmentByIdAsync(enrollmentId)
            ?? throw new KeyNotFoundException($"Enrollment with id: {enrollmentId} not found");

        // Logic calculate progress enrollment here
        if (enrollment.Progress == 1)
        {
            enrollment.Status = "Completed";
        }

        await _enrollmentRepository.UpdateProgressEnrollmentAsync(enrollment);
    }
}