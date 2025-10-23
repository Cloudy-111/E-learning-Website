using project.Models;

public interface ILessonRepository
{
    Task<Lesson?> GetLessonByIdAsync(string id);
    Task<IEnumerable<Lesson>> GetLessonsByCourseContentIdAsync(string courseId);
    Task AddLessonAsync(Lesson lesson);
    Task UpdateLessonAsync(Lesson lesson);
    Task UpdateOrderLessonsAsync(List<Lesson> lessons);
}