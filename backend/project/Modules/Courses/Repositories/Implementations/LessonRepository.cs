using Microsoft.EntityFrameworkCore;
using project.Models;

public class LessonRepository : ILessonRepository
{
    private readonly DBContext _dbContext;
    public LessonRepository(DBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<bool> LessonExistsAsync(string id)
    {
        return await _dbContext.Lessons.AnyAsync(l => l.Id == id);
    }

    public async Task<Lesson?> GetLessonByIdAsync(string id)
    {
        return await _dbContext.Lessons
            .FirstOrDefaultAsync(l => l.Id == id);
    }

    public async Task<IEnumerable<Lesson>> GetLessonsByCourseContentIdAsync(string courseContentId)
    {
        return await _dbContext.Lessons
            .Where(l => l.CourseContentId == courseContentId)
            .ToListAsync();
    }

    public async Task AddLessonAsync(Lesson lesson)
    {
        await _dbContext.Lessons.AddAsync(lesson);
        await _dbContext.SaveChangesAsync();
    }

    public async Task UpdateLessonAsync(Lesson lesson)
    {
        _dbContext.Lessons.Update(lesson);
        await _dbContext.SaveChangesAsync();
    }

    public async Task UpdateOrderLessonsAsync(List<Lesson> lessons)
    {

    }
}