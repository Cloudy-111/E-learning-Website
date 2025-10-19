using Microsoft.EntityFrameworkCore;

public class StudentRepository : IStudentRepository
{
    private readonly DBContext _dbContext;
    public StudentRepository(DBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<bool> IsStudentExistAsync(string studentId)
    {
        return await _dbContext.Students.AnyAsync(s => s.StudentId == studentId);
    }
}