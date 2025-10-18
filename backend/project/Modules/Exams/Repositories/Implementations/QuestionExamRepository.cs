
using Microsoft.EntityFrameworkCore;

public class QuestionExamRepository : IQuestionExamRepository
{
    private readonly DBContext _dbContext;
    public QuestionExamRepository(DBContext dbContext)
    {
        _dbContext = dbContext;
    }
    public async Task AddQuestionToExamAsync(QuestionExam questionExam)
    {
        await _dbContext.QuestionExams.AddAsync(questionExam);
        await _dbContext.SaveChangesAsync();
    }

    public async Task<IEnumerable<QuestionExam>> GetQuestionsByExamIdAsync(string examId)
    {
        return await _dbContext.QuestionExams
            .Where(qe => qe.ExamId == examId)
            .ToListAsync();
    }

    public async Task<QuestionExam?> GetQuestionInExamAsync(string questionId)
    {
        return await _dbContext.QuestionExams
            .FirstOrDefaultAsync(qe => qe.Id == questionId);
    }

    public Task RemoveQuestionFromExamAsync(string questionId, string examId)
    {
        throw new NotImplementedException();
    }

    public Task UpdateQuestionInExamAsync(QuestionExam questionExam)
    {
        throw new NotImplementedException();
    }
}