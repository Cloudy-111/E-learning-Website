public interface IExamService
{
    Task<IEnumerable<Exam>> GetAllExamsAsync();
    Task<InformationExamDTO?> GetExamByIdAsync(string id);
    Task AddExamAsync(CreateExamDTO exam);
    Task UpdateExamAsync(InformationExamDTO examUpdate);
    // Task DeleteExamAsync(int id);
    Task<bool> UpdateOrderQuestionInExamAsync(UpdateQuestionOrderDTO dto);
}