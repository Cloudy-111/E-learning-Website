using Microsoft.EntityFrameworkCore;
using project.Models;

public class CourseRepository : ICourseRepository
{
    private readonly DBContext _dbContext;
    public CourseRepository(DBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<bool> CourseExistsAsync(string id)
    {
        return await _dbContext.Courses
            .Where(c => c.Status == "published")
            .AnyAsync(c => c.Id == id);
    }

    public async Task<IEnumerable<Course>> GetAllCoursesAsync()
    {
        return await _dbContext.Courses
            .Include(c => c.Category)
            .Include(c => c.Teacher)
            .ThenInclude(t => t.User)
            .Where(c => c.Status == "published")
            .ToListAsync();
    }

    public async Task<IEnumerable<Course>> GetCoursesAsync(string? keyword, string? category, int page, int pageSize)
    {
        var query = _dbContext.Courses
            .Include(c => c.Category)
            .Include(c => c.Teacher)
            .ThenInclude(t => t.User)
            .Where(c => c.Status == "published")
            .AsQueryable();

        if (!string.IsNullOrEmpty(keyword))
        {
            query = query.Where(c => c.Title.Contains(keyword));
        }

        var totalItems = await query.CountAsync();
        var items = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();

        return items;
    }

    public async Task<Course?> GetCourseByIdAsync(string id)
    {
        return await _dbContext.Courses
            .Where(c => c.Status == "published")
            .Include(c => c.Category)
            .Include(c => c.Teacher)
            .ThenInclude(t => t.User)
            .FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<Course?> GetCourseByStatusAsync(string id, string status)
    {
        return await _dbContext.Courses
            .Where(c => c.Status == status)
            .Include(c => c.Category)
            .Include(c => c.Teacher)
            .ThenInclude(t => t.User)
            .FirstOrDefaultAsync(c => c.Id == id);
    }

    // public async Task<IEnumerable<Course>> GetCoursesByCategoryAsync(string categoryId)
    // {
    //     return await _dbContext.Courses
    //         .Where(c => c.CategoryId == categoryId)
    //         .Include(c => c.Category)
    //         .Include(c => c.Teacher)
    //         .ToListAsync();
    // }

    public async Task<IEnumerable<Course>> GetCoursesByTeacherAsync(string teacherId)
    {
        return await _dbContext.Courses
            .Where(c => c.TeacherId == teacherId)
            .Include(c => c.Category)
            .Include(c => c.Teacher)
            .ToListAsync();
    }

    public async Task AddCourseAsync(Course course)
    {
        await _dbContext.Courses.AddAsync(course);
        await _dbContext.SaveChangesAsync();
    }

    public async Task UpdateCourseAsync(Course course)
    {
        _dbContext.Courses.Update(course);
        await _dbContext.SaveChangesAsync();
    }

    // public async Task DeleteCourseAsync(string id)
    // {

    // }
}