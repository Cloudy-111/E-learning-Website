public interface ISubmissionExamRepository
{
    Task CreateSubmissionExamAsync(SubmissionExam submissionExam);
    Task UpdateSubmissionExamAsync(SubmissionExam submissionExam);
    Task<int> CountPassExamsAsync(string courseId, string studentId, double passScore);
}