using project.Models;

public interface ICourseRepository
{
    Task<bool> CourseExistsAsync(string id);
    Task<Course?> GetCourseByIdAsync(string id);
    Task<Course?> GetCourseByStatusAsync(string id, string status);
    Task<IEnumerable<Course>> GetAllCoursesAsync();
    Task<(IEnumerable<Course>, int)> SearchItemsAsync(string? keyword, string? category, int page, int pageSize);
    // Task<IEnumerable<Course>> GetCoursesByCategoryAsync(string categoryId);
    Task<IEnumerable<Course>> GetCoursesByTeacherIdAsync(string teacherId);
    Task<(IEnumerable<Enrollment_course>, int)> GetEnrolledCoursesByStudentIdAsync(string studentId, string? keyword, string? status, int page, int pageSize);
    Task AddCourseAsync(Course course);
    Task UpdateCourseAsync(Course course);
    // Task DeleteCourseAsync(string id);
}