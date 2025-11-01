using Microsoft.EntityFrameworkCore;
using project.Models;

public class EnrollmentCourseRepository : IEnrollmentCourseRepository
{
    private readonly DBContext _dbContext;
    public EnrollmentCourseRepository(DBContext dBContext)
    {
        _dbContext = dBContext;
    }

    public async Task<IEnumerable<Enrollment_course>> GetEnrollmentInCourseAsync(string courseId)
    {
        return await _dbContext.Enrollments
            .Where(en => en.CourseId == courseId)
            .Include(en => en.Student)
                .ThenInclude(s => s.User)
            .ToListAsync();
    }

    public async Task CreateEnrollmentAsync(Enrollment_course enrollment)
    {
        await _dbContext.Enrollments.AddAsync(enrollment);
        await _dbContext.SaveChangesAsync();
    }

    public async Task<Enrollment_course?> GetEnrrollmentByIdAsync(string enrollmentId)
    {
        return await _dbContext.Enrollments.FirstOrDefaultAsync(en => en.Id == enrollmentId);
    }

    public async Task UpdateProgressEnrollmentAsync(Enrollment_course enrollment)
    {
        _dbContext.Enrollments.Update(enrollment);
        await _dbContext.SaveChangesAsync();
    }
}