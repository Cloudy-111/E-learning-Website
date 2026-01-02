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
    public async Task<(IEnumerable<Course>, int)> GetCoursesByAdminAsync(string? status, int page, int pageSize)
    {
        var query = _dbContext.Courses
            .Include(c => c.Category)
            .Include(c => c.Teacher)
            .ThenInclude(t => t.User)
            .AsQueryable();

        if (!string.IsNullOrEmpty(status))
        {
            query = query.Where(c => c.Status == status);
        }
        else
        {
            query = query.Where(c => c.Status == "pending");
        }

        var totalCount = await query.CountAsync();
        var items = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
        return (items, totalCount);
    }

    public async Task<Course?> GetFullCourseByIdAsync(string courseId)
    {
        return await _dbContext.Courses
            .Include(c => c.Category)
            .Include(c => c.Teacher)
                .ThenInclude(t => t.User)
            .Include(c => c.Content)
                .ThenInclude(cc => cc.Lessons)
            .FirstOrDefaultAsync(c => c.Id == courseId);
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

    public async Task<bool> IsAdminExistAsync(string userId)
    {
        return await _dbContext.Admins
            .Include(a => a.User)
            .AnyAsync(a => a.User.Id == userId);
    }
}