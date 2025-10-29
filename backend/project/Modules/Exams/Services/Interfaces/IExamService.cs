public interface IExamService
{
    Task<IEnumerable<InformationExamDTO>> GetAllExamsAsync();
    Task<InformationExamDTO?> GetExamByIdAsync(string id);
    Task AddExamAsync(CreateExamDTO exam);
    Task UpdateExamAsync(string examId, UpdateExamDTO examUpdate);
    // Task DeleteExamAsync(int id);
    Task<bool> UpdateOrderQuestionInExamAsync(string examId, UpdateQuestionOrderDTO dto);
}