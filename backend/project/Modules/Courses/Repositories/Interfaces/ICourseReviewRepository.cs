using project.Models;

public interface ICourseReviewRepository
{
    Task<bool> CourseReviewExistsAsync(string reviewId);
    Task CreateCourseReviewAsync(CourseReview review);
    Task<IEnumerable<CourseReview>> GetReviewsByCourseIdAsync(string courseId);
    Task<IEnumerable<CourseReview>> GetReviewsByStudentIdAsync(string studentId);
    Task<CourseReview?> GetCourseReviewByIdAsync(string reviewId);
    Task UpdateReviewAsync(CourseReview review);
    Task DeleteReviewAsync(string reviewId);
}