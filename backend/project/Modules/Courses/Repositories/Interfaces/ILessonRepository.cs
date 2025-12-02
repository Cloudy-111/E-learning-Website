using project.Models;

public interface ILessonRepository
{
    Task<bool> LessonExistsAsync(string id);
    Task<Lesson?> GetLessonByIdAsync(string id);
    Task AddMultiLessonsAsync(List<Lesson> lessons);
    Task<IEnumerable<Lesson>> GetLessonsByCourseContentIdAsync(string courseId);
    Task AddLessonAsync(Lesson lesson);
    Task UpdateLessonAsync(Lesson lesson);
    Task UpdateOrderLessonsAsync(List<Lesson> lessons);
}