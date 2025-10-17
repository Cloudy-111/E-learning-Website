public interface IQuestionExamRepository
{
    Task AddQuestionToExamAsync(QuestionExam questionExam);
    Task RemoveQuestionFromExamAsync(string questionId, string examId);
    Task UpdateQuestionInExamAsync(QuestionExam questionExam);
    Task<IEnumerable<QuestionExamForDoingExamDTO>> GetQuestionsByExamIdForDoingExamAsync(string examId);
    Task<IEnumerable<QuestionExamForReviewSubmissionDTO>> GetQuestionsByExamIdForReviewSubmissionAsync(string examId);
    Task<IEnumerable<QuestionExamOrderDTO>> GetQuestionExamOrderAsync(string examId);
    Task<QuestionExamForDoingExamDTO?> GetQuestionInExamForDoingExamAsync(string questionId);
    Task<QuestionExamForReviewSubmissionDTO?> GetQuestionInExamForReviewSubmissionAsync(string questionId);
}