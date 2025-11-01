using project.Models;

public class EnrollmentCourseService : IEnrollmentCourseService
{
    private const double passScore = 70;
    private readonly IEnrollmentCourseRepository _enrollmentRepository;
    private readonly ICourseRepository _courseRepository;
    private readonly IStudentRepository _studentRepository;
    private readonly ICourseContentRepository _courseContentRepository;
    private readonly ILessonRepository _lessonRepository;
    private readonly ILessonProgressRepository _lessonProgressRepository;
    private readonly IExamRepository _examRepository;
    private readonly ISubmissionExamRepository _submissionExamRepository;
    public EnrollmentCourseService(
        IEnrollmentCourseRepository enrollmentRepository,
        ICourseRepository courseRepository,
        IStudentRepository studentRepository,
        ICourseContentRepository courseContentRepository,
        ILessonRepository lessonRepository,
        IExamRepository examRepository,
        ILessonProgressRepository lessonProgressRepository,
        ISubmissionExamRepository submissionExamRepository)
    {
        _enrollmentRepository = enrollmentRepository;
        _courseRepository = courseRepository;
        _studentRepository = studentRepository;
        _courseContentRepository = courseContentRepository;
        _lessonRepository = lessonRepository;
        _examRepository = examRepository;
        _lessonProgressRepository = lessonProgressRepository;
        _submissionExamRepository = submissionExamRepository;
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

    public async Task UpdateProgressEnrollmentAsync(string courseId, string enrollmentId, EnrollmentProgressUpdateDTO dto)
    {
        var courseIdGuid = GuidHelper.ParseOrThrow(courseId, nameof(courseId));
        var enrollmentGuid = GuidHelper.ParseOrThrow(enrollmentId, nameof(enrollmentId));
        var studentGuild = GuidHelper.ParseOrThrow(dto.StudentId, nameof(dto.StudentId));
        if (dto.LessonId != null && dto.ExamId == null)
        {
            var lessonGuild = GuidHelper.ParseOrThrow(dto.LessonId, nameof(dto.LessonId));
        }
        else if (dto.ExamId != null && dto.LessonId == null)
        {
            var examGuild = GuidHelper.ParseOrThrow(dto.ExamId, nameof(dto.ExamId));
        }
        else
        {
            throw new ArgumentException("LessonId or ExamId must have value, not both");
        }

        var courseExist = await _courseRepository.CourseExistsAsync(courseId);
        if (!courseExist)
        {
            throw new KeyNotFoundException($"Course with id: {courseId} not found");
        }

        var enrollment = await _enrollmentRepository.GetEnrrollmentByIdAsync(enrollmentId)
            ?? throw new KeyNotFoundException($"Enrollment with id: {enrollmentId} not found");

        var studentExist = await _studentRepository.IsStudentExistAsync(dto.StudentId);
        if (!studentExist)
        {
            throw new KeyNotFoundException($"Student with id: {dto.StudentId} not found");
        }

        // Logic calculate progress enrollment here

        if (dto.LessonId != null && dto.ExamId == null)
        {
            var lessonExist = await _lessonRepository.LessonExistsAsync(dto.LessonId);
            if (!lessonExist)
            {
                throw new KeyNotFoundException($"Lesson with id: {dto.LessonId} not found");
            }

            var alreadyCompleted = await _lessonProgressRepository.ExistsAsync(dto.LessonId, dto.StudentId);
            if (!alreadyCompleted)
            {
                await _lessonProgressRepository.AddNewLessonProgressAsync(new LessonProgress
                {
                    Id = Guid.NewGuid().ToString(),
                    LessonId = dto.LessonId,
                    StudentId = dto.StudentId,
                    CompletedAt = DateTime.UtcNow
                });
            }
        }
        else if (dto.ExamId != null && dto.LessonId == null)
        {
            var (exists, isOpened) = await _examRepository.GetExamStatusAsync(dto.ExamId);
            if (!exists || !isOpened)
            {
                throw new KeyNotFoundException($"Exam with id: {dto.ExamId} not found");
            }
        }

        var progress = await CalculateProgressAsync(courseId, dto.StudentId);
        enrollment.Progress = (decimal)progress;
        if (enrollment.Progress >= 95m && enrollment.Status != "Cancelled")
        {
            enrollment.Status = "Completed";
        }

        await _enrollmentRepository.UpdateProgressEnrollmentAsync(enrollment);
    }

    private async Task<double> CalculateProgressAsync(string courseId, string studentId)
    {
        var totalLessons = await _courseContentRepository.TotalLessons(courseId);
        var completedLessons = await _lessonProgressRepository.CountCompletedLessonsAsync(courseId, studentId);
        var lessonProgress = totalLessons == 0 ? 0.0 : (double)completedLessons / totalLessons;

        var totalExams = await _examRepository.TotalExamsInCourseAsync(courseId);
        var passedExams = await _submissionExamRepository.CountPassExamsAsync(courseId, studentId, passScore);
        var examProgress = totalExams == 0 ? 0.0 : (double)passedExams / totalExams;

        return (lessonProgress * 0.7f + examProgress * 0.3f) * 100;
    }
}