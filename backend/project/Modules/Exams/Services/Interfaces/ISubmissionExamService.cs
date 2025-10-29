public interface ISubmissionExamService
{
    Task CreateSubmissionExamAsync(string examId, SubmissionExamSubmitDTO submissionExamDto);
}