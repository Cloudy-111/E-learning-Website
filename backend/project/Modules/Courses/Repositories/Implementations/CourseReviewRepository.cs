using Microsoft.EntityFrameworkCore;
using project.Models;

public class CourseReviewRepository : ICourseReviewRepository
{
    private readonly DBContext _dbContext;
    public CourseReviewRepository(DBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<bool> CourseReviewExistsAsync(string reviewId)
    {
        return await _dbContext.CourseReviews.AnyAsync(r => r.Id == reviewId);
    }

    public async Task CreateCourseReviewAsync(CourseReview review)
    {
        await _dbContext.CourseReviews.AddAsync(review);
        await _dbContext.SaveChangesAsync();
    }

    public async Task UpdateReviewAsync(CourseReview review)
    {
        _dbContext.CourseReviews.Update(review);
        await _dbContext.SaveChangesAsync();
    }

    public async Task DeleteReviewAsync(string reviewId)
    {
        var review = await _dbContext.CourseReviews.FindAsync(reviewId);
        if (review != null)
        {
            _dbContext.CourseReviews.Remove(review);
            await _dbContext.SaveChangesAsync();
        }
    }

    public async Task<IEnumerable<CourseReview>> GetReviewsByCourseIdAsync(string courseId)
    {
        return await _dbContext.CourseReviews
            .Where(r => r.CourseId == courseId && r.IsNewest)
            .ToListAsync();
    }

    public async Task<IEnumerable<CourseReview>> GetReviewsByStudentIdAsync(string studentId)
    {
        return await _dbContext.CourseReviews
            .Where(r => r.StudentId == studentId && r.IsNewest)
            .ToListAsync();
    }

    public async Task<CourseReview?> GetCourseReviewByIdAsync(string reviewId)
    {
        return await _dbContext.CourseReviews
            .FirstOrDefaultAsync(r => r.Id == reviewId);
    }
}