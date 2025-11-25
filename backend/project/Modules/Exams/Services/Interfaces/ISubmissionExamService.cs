public interface ISubmissionExamService
{
    Task CreateSubmissionExamAsync(string studentId, string examAttemptd, string lastAnswers);
}