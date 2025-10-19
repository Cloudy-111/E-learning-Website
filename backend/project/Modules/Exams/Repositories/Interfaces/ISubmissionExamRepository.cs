public interface ISubmissionExamRepository
{
    Task CreateSubmissionExamAsync(SubmissionExam submissionExam);
    Task UpdateSubmissionExamAsync(SubmissionExam submissionExam);
}