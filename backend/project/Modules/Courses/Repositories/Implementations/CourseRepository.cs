using Microsoft.EntityFrameworkCore;
using project.Models;

public class CourseRepository : ICourseRepository
{
    private readonly DBContext _dbContext;
    public CourseRepository(DBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<Course>> GetAllCoursesAsync()
    {
        return await _dbContext.Courses
            .Include(c => c.Category)
            .Include(c => c.Teacher)
            .ThenInclude(t => t.User)
            .ToListAsync();
    }

    public async Task<Course?> GetCourseByIdAsync(string id)
    {
        return await _dbContext.Courses
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

    // public async Task<IEnumerable<Course>> GetCoursesByTeacherAsync(string teacherId)
    // {
    //     return await _dbContext.Courses
    //         .Where(c => c.TeacherId == teacherId)
    //         .Include(c => c.Category)
    //         .Include(c => c.Teacher)
    //         .ToListAsync();
    // }

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