using Microsoft.AspNetCore.Mvc;

public interface IEnrollmentCourseService
{
    Task<IEnumerable<EnrollmentInforDTO>> GetEnrollmentInCourseAsync(string userId, string courseId);
    Task<EnrollmentInforDTO> GetEnrollmentByIdAsync(string userId, string courseId, string enrollmentId);
    Task CreateEnrollmentAsync(string courseId, EnrollmentCreateDTO enrollment);
    Task UpdateProgressEnrollmentAsync(string userId, string courseId, string enrollmentId, EnrollmentProgressUpdateDTO enrollmentProgressUpdateDTO);
    Task RequestCancelEnrollmentAsync(string userId, string courseId, string enrollmentId, RequestCancelEnrollmentDTO dto);
}