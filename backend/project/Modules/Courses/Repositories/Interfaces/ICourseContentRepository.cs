using project.Models;

public interface ICourseContentRepository
{
    // Task<IEnumerable<CourseContent>> GetContentsByCourseIdAsync(string courseId);
    Task AddCourseContentAsync(CourseContent content);
    // Task UpdateCourseContentAsync(CourseContent content);
    // Task DeleteCourseContentAsync(string contentId);
}