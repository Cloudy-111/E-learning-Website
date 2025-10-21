using project.Models;

public class CourseContentRepository : ICourseContentRepository
{
    private readonly DBContext _dbContext;
    public CourseContentRepository(DBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task AddCourseContentAsync(CourseContent content)
    {
        await _dbContext.CourseContents.AddAsync(content);
        await _dbContext.SaveChangesAsync();
    }
}