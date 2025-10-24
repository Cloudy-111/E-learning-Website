using Microsoft.EntityFrameworkCore;

public class TeacherRepository : ITeacherRepository
{
    private readonly DBContext _dbContext;
    public TeacherRepository(DBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<bool> IsTeacherExistsAsync(string teacherId)
    {
        return await _dbContext.Teachers.AnyAsync(t => t.TeacherId == teacherId);
    }
}