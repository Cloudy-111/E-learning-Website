using Microsoft.EntityFrameworkCore;
using project.Models;

public class AdminRepository : IAdminRepository
{
    private readonly DBContext _dbContext;

    public AdminRepository(DBContext dbContext)
    {
        _dbContext = dbContext;
    }

    // Admin methods for managing courses
    public async Task<IEnumerable<Course>> GetCoursesByStatusAsync(string status)
    {
        return await _dbContext.Courses
            .Where(c => c.Status == status)
            .Include(c => c.Category)
            .Include(c => c.Teacher)
            .ThenInclude(t => t.User)
            .ToListAsync();
    }

    public async Task<IEnumerable<UpdateRequestCourse>> GetUpdateRequestsByStatusAsync(string status)
    {
        return await _dbContext.UpdateRequestCourses
            .Where(urc => urc.Status == status)
            .ToListAsync();
    }

    public async Task<IEnumerable<UpdateRequestCourse>> GetAllUpdateRequestsAsync()
    {
        return await _dbContext.UpdateRequestCourses
            .ToListAsync();
    }

    public async Task<IEnumerable<RefundRequestCourse>> GetRefundRequestsByStatusAsync(string status)
    {
        return await _dbContext.RefundRequestCourses
            .Where(rrc => rrc.Status == status)
            .Include(rrc => rrc.Student)
            .ThenInclude(s => s.User)
            .Include(rrc => rrc.Admin)
            .Include(rrc => rrc.Enrollment)
            .ThenInclude(e => e.Course)
            .ToListAsync();
    }
}