using Microsoft.AspNetCore.Mvc;

public interface IEnrollmentCourseService
{
    Task<IEnumerable<EnrollmentInforDTO>> GetEnrollmentInCourseAsync(string courseId);
    Task<EnrollmentInforDTO> GetEnrollmentByIdAsync(string courseId, string enrollmentId);
    Task CreateEnrollmentAsync(string courseId, EnrollmentCreateDTO enrollment);
    Task UpdateProgressEnrollmentAsync(string courseId, string enrollmentId, EnrollmentProgressUpdateDTO enrollmentProgressUpdateDTO);
    Task RequestCancelEnrollmentAsync(string courseId, string enrollmentId, RequestCancelEnrollmentDTO dto);
}