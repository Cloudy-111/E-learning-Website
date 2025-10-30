public interface ICourseReviewService
{
    Task AddCourseReviewAsync(string courseId, CourseReviewCreateDTO courseReviewCreateDTO);
    Task UpdateCourseReviewAsync(string reviewId, CourseReviewUpdateDTO courseReviewUpdateDTO);
    Task<IEnumerable<CourseReviewInforDTO>> GetAllReviewsByCourseIdAsync(string courseId);
    Task<IEnumerable<CourseReviewInforDTO>> GetReviewsByStudentIdAsync(string studentId);
}