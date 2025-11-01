using project.Models;

public interface IEnrollmentCourseRepository
{
    Task<IEnumerable<Enrollment_course>> GetEnrollmentInCourseAsync(string courseId);
    Task CreateEnrollmentAsync(Enrollment_course enrollment);
    Task<Enrollment_course?> GetEnrrollmentByIdAsync(string enrollmentId);
    Task UpdateProgressEnrollmentAsync(Enrollment_course enrollment);
    Task CompletedEnrollmentAsync(Enrollment_course enrollment);
}