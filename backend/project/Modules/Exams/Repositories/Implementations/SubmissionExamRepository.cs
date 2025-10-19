public class SubmissionExamRepository : ISubmissionExamRepository
{
    private readonly DBContext _dbContext;
    public SubmissionExamRepository(DBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task CreateSubmissionExamAsync(SubmissionExam submissionExam)
    {
        await _dbContext.SubmissionExams.AddAsync(submissionExam);
        await _dbContext.SaveChangesAsync();
    }

    public async Task UpdateSubmissionExamAsync(SubmissionExam submissionExam)
    {
        _dbContext.SubmissionExams.Update(submissionExam);
        await _dbContext.SaveChangesAsync();
    }
}