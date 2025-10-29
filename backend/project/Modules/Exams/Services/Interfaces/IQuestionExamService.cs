public interface IQuestionExamService
{
    Task<bool> ExistQuestionAsync(string questionId);
    Task AddQuestionToExamAsync(string examId, CreateQuestionExamDTO questionExam);
    // Task RemoveQuestionFromExamAsync(int questionId, string examId);
    // Task UpdateQuestionInExamAsync(QuestionExam questionExam);
    // Task<IEnumerable<QuestionExam>> GetQuestionsByExamIdAsync(string examId);
    Task<IEnumerable<QuestionExamForDoingExamDTO>> GetQuestionsByExamIdForDoingExamAsync(string examId);
    Task<IEnumerable<QuestionExamForReviewSubmissionDTO>> GetQuestionsByExamIdForReviewSubmissionAsync(string examId);
    Task<IEnumerable<QuestionExamOrderDTO>> GetQuestionExamOrderAsync(string examId);
    Task<QuestionExamForDoingExamDTO?> GetQuestionInExamForDoingExamAsync(string questionId);
    Task<QuestionExamForReviewSubmissionDTO?> GetQuestionInExamForReviewSubmissionAsync(string questionId);
}