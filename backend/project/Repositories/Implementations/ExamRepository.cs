using Microsoft.EntityFrameworkCore;
using project.Models;

public class ExamRepository : IExamRepository
{
    private readonly DBContext _dbContext;
    public ExamRepository(DBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<Exam>> GetAllExamsAsync()
    {
        return await _dbContext.Exams.ToListAsync();
    }

    public async Task<Exam?> GetExamByIdAsync(string id)
    {
        return await _dbContext.Exams.FirstOrDefaultAsync(e => e.Id == id);
    }

    public async Task AddExamAsync(Exam exam)
    {
        await _dbContext.Exams.AddAsync(exam);
        await _dbContext.SaveChangesAsync();
    }

    public async Task UpdateExamAsync(Exam exam)
    {
        _dbContext.Exams.Update(exam);
        await _dbContext.SaveChangesAsync();
    }

    public async Task<IEnumerable<Exam>> GetExamsByCategoryIdAsync(string categoryId)
    {
        return await _dbContext.Exams.Where(e => e.CategoryId == categoryId).ToListAsync();
    }

    // public async Task DeleteExamAsync(string id)
    // {

    // }

    public async Task UpdateOrderQuestionInExamAsync(string examId, List<QuestionExamOrderDTO> questionExams)
    {
        var questionDict = questionExams.ToDictionary(q => q.Id, q => q.Order ?? 0);

        var questions = await _dbContext.QuestionExams
            .Where(q => q.ExamId == examId && questionDict.Keys.Contains(q.Id))
            .ToListAsync();

        foreach (var q in questions)
        {
            q.Order = questionDict[q.Id];
        }

        await _dbContext.SaveChangesAsync();
    }
}