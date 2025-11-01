using project.Models;

public interface ICourseRepository
{
    Task<bool> CourseExistsAsync(string id);
    Task<Course?> GetCourseByIdAsync(string id);
    Task<IEnumerable<Course>> GetAllCoursesAsync();
    Task<IEnumerable<Course>> GetCoursesAsync(string? keyword, string? category, int page, int pageSize);
    // Task<IEnumerable<Course>> GetCoursesByCategoryAsync(string categoryId);
    // Task<IEnumerable<Course>> GetCoursesByTeacherAsync(string teacherId);
    Task AddCourseAsync(Course course);
    Task UpdateCourseAsync(Course course);
    // Task DeleteCourseAsync(string id);
}