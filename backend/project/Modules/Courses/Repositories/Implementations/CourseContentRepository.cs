using Microsoft.EntityFrameworkCore;
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

    public async Task UpdateCourseContentAsync(CourseContent content)
    {
        _dbContext.CourseContents.Update(content);
        await _dbContext.SaveChangesAsync();
    }

    public async Task<CourseContent?> GetCourseContentByIdAsync(string courseContentId)
    {
        return await _dbContext.CourseContents
            .FirstOrDefaultAsync(cc => cc.Id == courseContentId);
    }

    public async Task<bool> CourseContentExistsAsync(string courseId)
    {
        return await _dbContext.CourseContents
            .AnyAsync(cc => cc.CourseId == courseId);
    }

    public async Task<bool> CourseContentExistsByContentIdAsync(string contentId)
    {
        return await _dbContext.CourseContents
            .AnyAsync(cc => cc.Id == contentId);
    }

    public async Task<CourseContent?> GetCourseContentByCourseIdAsync(string courseId)
    {
        return await _dbContext.CourseContents
            .FirstOrDefaultAsync(cc => cc.CourseId == courseId);
    }
}