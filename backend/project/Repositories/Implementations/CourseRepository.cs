using Microsoft.EntityFrameworkCore;

public class CourseRepository : ICourseRepository
{
    private readonly DBContext _dbContext;
    public CourseRepository(DBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<CourseInformationDTO>> GetAllCoursesAsync()
    {
        return await _dbContext.Courses
            .Include(c => c.Category)
            .Include(c => c.Teacher)
            .Select(c => new CourseInformationDTO
            {
                Id = c.Id,
                Title = c.Title,
                Description = c.Description,
                Price = c.Price,
                DiscountPrice = c.DiscountPrice,
                Status = c.Status,
                ThumbnailUrl = c.ThumbnailUrl,
                CreatedAt = c.CreatedAt,
                UpdatedAt = c.UpdatedAt,
                CategoryId = c.CategoryId,
                CategoryName = c.Category.Name,
                TeacherId = c.TeacherId,
                TeacherName = c.Teacher.User.FullName
            })
            .ToListAsync();
    }

    // public async Task<Course?> GetCourseByIdAsync(string id)
    // {
    //     return await _dbContext.Courses
    //         .Include(c => c.Category)
    //         .Include(c => c.Teacher)
    //         .FirstOrDefaultAsync(c => c.Id == id);
    // }

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

    // public async Task AddCourseAsync(Course course)
    // {
    //     await _dbContext.Courses.AddAsync(course);
    //     await _dbContext.SaveChangesAsync();
    // }

    // public async Task UpdateCourseAsync(Course course)
    // {
    //     _dbContext.Courses.Update(course);
    //     await _dbContext.SaveChangesAsync();
    // }

    // public async Task DeleteCourseAsync(string id)
    // {

    // }
}