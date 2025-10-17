
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

    public async Task<QuestionExamForDoingExamDTO?> GetQuestionInExamForDoingExamAsync(string questionId)
    {
        return await _dbContext.QuestionExams
            .Where(qe => qe.Id == questionId)
            .Select(qe => new QuestionExamForDoingExamDTO
            {
                Id = qe.Id,
                ExamId = qe.ExamId,
                Content = qe.Content,
                ImageUrl = qe.ImageUrl,
                Type = qe.Type,
                Score = qe.Score,
                IsRequired = qe.IsRequired,
                Order = qe.Order,
                IsNewest = qe.IsNewest,
            })
            .FirstOrDefaultAsync();
    }

    public async Task<QuestionExamForReviewSubmissionDTO?> GetQuestionInExamForReviewSubmissionAsync(string questionId)
    {
        return await _dbContext.QuestionExams
            .Where(qe => qe.Id == questionId)
            .Select(qe => new QuestionExamForReviewSubmissionDTO
            {
                Id = qe.Id,
                ExamId = qe.ExamId,
                Content = qe.Content,
                ImageUrl = qe.ImageUrl,
                Type = qe.Type,
                Explanation = qe.Exaplanation,
                Score = qe.Score,
                IsRequired = qe.IsRequired,
                Order = qe.Order,
                IsNewest = qe.IsNewest,
            })
            .FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<QuestionExamForDoingExamDTO>> GetQuestionsByExamIdForDoingExamAsync(string examId)
    {
        return await _dbContext.QuestionExams
            .Where(qe => qe.ExamId == examId && qe.IsNewest == true)
            .OrderBy(qe => qe.Order)
            .Select(qe => new QuestionExamForDoingExamDTO
            {
                Id = qe.Id,
                ExamId = qe.ExamId,
                Content = qe.Content,
                ImageUrl = qe.ImageUrl,
                Type = qe.Type,
                Score = qe.Score,
                IsRequired = qe.IsRequired,
                Order = qe.Order,
                IsNewest = qe.IsNewest,
            })
            .ToListAsync();
    }

    public async Task<IEnumerable<QuestionExamForReviewSubmissionDTO>> GetQuestionsByExamIdForReviewSubmissionAsync(string examId)
    {
        return await _dbContext.QuestionExams
            .Where(qe => qe.ExamId == examId && qe.IsNewest == true)
            .OrderBy(qe => qe.Order)
            .Select(qe => new QuestionExamForReviewSubmissionDTO
            {
                Id = qe.Id,
                ExamId = qe.ExamId,
                Content = qe.Content,
                ImageUrl = qe.ImageUrl,
                Type = qe.Type,
                Explanation = qe.Exaplanation,
                Score = qe.Score,
                IsRequired = qe.IsRequired,
                Order = qe.Order,
                IsNewest = qe.IsNewest,
            })
            .ToListAsync();
    }

    public async Task<IEnumerable<QuestionExamOrderDTO>> GetQuestionExamOrderAsync(string examId)
    {
        return await _dbContext.QuestionExams
            .Where(qe => qe.ExamId == examId && qe.IsNewest == true)
            .Select(qe => new QuestionExamOrderDTO
            {
                Id = qe.Id,
                Order = qe.Order,
            })
            .ToListAsync();
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