using Microsoft.EntityFrameworkCore;
using project.Models;

public class ExamRepository : IExamRepository
{
    private readonly DBContext _dbContext;
    public ExamRepository(DBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<(bool Exists, bool IsOpened)> GetExamStatusAsync(string examId)
    {
        var exam = await _dbContext.Exams
            .Where(e => e.Id == examId)
            .Select(e => new { e.Id, e.IsOpened })
            .FirstOrDefaultAsync();

        if (exam == null)
        {
            return (false, false);
        }
        return (true, exam.IsOpened);
    }

    public async Task<int> TotalExamsInCourseAsync(string courseId)
    {
        return await _dbContext.Exams
            .Where(e => e.CourseContent != null && e.CourseContent.CourseId == courseId)
            .CountAsync();
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

    // public async Task DeleteExamAsync(string id)
    // {

    // }

    public async Task UpdateOrderQuestionInExamAsync(string examId, List<QuestionExam> questionExams)
    {
        var existingQuestions = await _dbContext.QuestionExams
            .Where(q => q.ExamId == examId)
            .ToListAsync();

        var questionMap = questionExams.ToDictionary(q => q.Id, q => q.Order);

        foreach (var question in existingQuestions)
        {
            if (questionMap.TryGetValue(question.Id, out var newOrder))
            {
                question.Order = newOrder;
            }
        }

        await _dbContext.SaveChangesAsync();
    }
}