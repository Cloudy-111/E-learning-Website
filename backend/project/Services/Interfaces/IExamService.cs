using Microsoft.AspNetCore.Mvc;

public interface IExamService
{
    Task<IEnumerable<Exam>> GetAllExamsAsync();
    Task<Exam?> GetExamByIdAsync(string id);
    Task AddExamAsync(Exam exam);
    Task UpdateExamAsync(Exam exam);
    // Task DeleteExamAsync(int id);
    Task<bool> UpdateOrderQuestionInExamAsync(UpdateQuestionOrderDTO dto);
}