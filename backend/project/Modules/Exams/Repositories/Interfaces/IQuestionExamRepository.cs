public interface IQuestionExamRepository
{
    Task AddQuestionToExamAsync(QuestionExam questionExam);
    Task RemoveQuestionFromExamAsync(string questionId, string examId);
    Task UpdateQuestionInExamAsync(QuestionExam questionExam);
    Task<IEnumerable<QuestionExam>> GetQuestionsByExamIdAsync(string examId);
    Task<QuestionExam?> GetQuestionInExamAsync(string questionId);
}