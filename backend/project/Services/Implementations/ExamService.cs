public class ExamService : IExamService
{
    private readonly IExamRepository _examRepository;

    public ExamService(IExamRepository examRepository)
    {
        _examRepository = examRepository;
    }

    public async Task<IEnumerable<Exam>> GetAllExamsAsync()
    {
        return await _examRepository.GetAllExamsAsync();
    }

    public async Task<Exam?> GetExamByIdAsync(string id)
    {
        var exam = await _examRepository.GetExamByIdAsync(id) ?? throw new KeyNotFoundException($"Exam with id {id} not found.");
        return exam;
    }

    public async Task AddExamAsync(Exam exam)
    {
        await _examRepository.AddExamAsync(exam);
    }

    public async Task UpdateExamAsync(Exam exam)
    {
        await _examRepository.UpdateExamAsync(exam);
    }

    public async Task<IEnumerable<Exam>> GetExamsByCategoryIdAsync(string categoryId)
    {
        var listExams = await _examRepository.GetExamsByCategoryIdAsync(categoryId);
        if (!listExams.Any())
        {
            throw new KeyNotFoundException($"No exams found for category id {categoryId}.");
        }
        return listExams;
    }

    // public async Task DeleteExamAsync(int id)
    // {

    // }
}