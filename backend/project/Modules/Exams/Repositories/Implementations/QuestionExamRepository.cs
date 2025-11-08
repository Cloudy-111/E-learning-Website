
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

    public async Task<bool> ExistQuestionAsync(string questionId)
    {
        return await _dbContext.QuestionExams
            .AnyAsync(qe => qe.Id == questionId);
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

    public void DeleteQuestionExam(QuestionExam questionExam)
    {
        _dbContext.QuestionExams.Remove(questionExam);
    }

    public Task UpdateQuestionInExamAsync(QuestionExam questionExam)
    {
        throw new NotImplementedException();
    }

    public async Task UploadBulkQuestionsAsync(IEnumerable<QuestionExam> questionExams)
    {
        await _dbContext.QuestionExams.AddRangeAsync(questionExams);
        await _dbContext.SaveChangesAsync();
    }
}