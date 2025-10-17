public interface IExamRepository
{
    Task<IEnumerable<Exam>> GetAllExamsAsync();
    Task<Exam?> GetExamByIdAsync(string id);
    Task AddExamAsync(Exam exam);
    Task UpdateExamAsync(Exam exam);
    // Task DeleteExamAsync(int id);
    Task UpdateOrderQuestionInExamAsync(string examId, List<QuestionExam> questionExams);
}