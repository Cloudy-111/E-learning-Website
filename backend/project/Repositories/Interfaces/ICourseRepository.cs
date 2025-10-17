public interface ICourseRepository
{
    // Task<Course?> GetCourseByIdAsync(string id);
    Task<IEnumerable<CourseInformationDTO>> GetAllCoursesAsync();
    // Task<IEnumerable<Course>> GetCoursesByCategoryAsync(string categoryId);
    // Task<IEnumerable<Course>> GetCoursesByTeacherAsync(string teacherId);
    // Task AddCourseAsync(Course course);
    // Task UpdateCourseAsync(Course course);
    // Task DeleteCourseAsync(string id);
}