public class QuestionExamService : IQuestionExamService
{
    private readonly IQuestionExamRepository _questionExamRepository;
    private readonly IExamRepository _examRepository;

    public QuestionExamService(
        IQuestionExamRepository questionExamRepository,
        IExamRepository examRepository
    )
    {
        _questionExamRepository = questionExamRepository;
        _examRepository = examRepository;
    }

    public async Task AddQuestionToExamAsync(QuestionExam questionExam)
    {
        var exam = await _examRepository.GetExamByIdAsync(questionExam.ExamId) ?? throw new KeyNotFoundException($"Exam with id {questionExam.ExamId} not found.");
        if (exam.IsOpened == true)
        {
            throw new InvalidOperationException("Cannot add question to an opened exam.");
        }
        await _questionExamRepository.AddQuestionToExamAsync(questionExam);
    }

    // public async Task RemoveQuestionFromExamAsync(int questionId, string examId)
    // {
    //     await _questionExamRepository.RemoveQuestionFromExamAsync(questionId, examId);
    // }

    // public async Task UpdateQuestionInExamAsync(QuestionExam questionExam)
    // {
    //     await _questionExamRepository.UpdateQuestionInExamAsync(questionExam);
    // }

    // public async Task<IEnumerable<QuestionExam>> GetQuestionsByExamIdAsync(string examId)
    // {
    //     return await _questionExamRepository.GetQuestionsByExamIdAsync(examId);
    // }

    public async Task<IEnumerable<QuestionExamForDoingExamDTO>> GetQuestionsByExamIdForDoingExamAsync(string examId)
    {
        var questionExams = await _questionExamRepository.GetQuestionsByExamIdAsync(examId) ?? throw new KeyNotFoundException($"Exam with {examId} not found.");

        var result = questionExams.Select(qe => new QuestionExamForDoingExamDTO
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
        });

        return result;
    }

    public async Task<IEnumerable<QuestionExamForReviewSubmissionDTO>> GetQuestionsByExamIdForReviewSubmissionAsync(string examId)
    {
        var questionExams = await _questionExamRepository.GetQuestionsByExamIdAsync(examId) ?? throw new KeyNotFoundException($"Question with {examId} not found.");

        var result = questionExams.Select(qe => new QuestionExamForReviewSubmissionDTO
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
        .ToList();

        return result;
    }

    public async Task<IEnumerable<QuestionExamOrderDTO>> GetQuestionExamOrderAsync(string examId)
    {
        var questionExamsOrder = await _questionExamRepository.GetQuestionsByExamIdAsync(examId);

        var result = questionExamsOrder
            .Where(qe => qe.ExamId == examId && qe.IsNewest == true)
            .Select(qe => new QuestionExamOrderDTO
            {
                Id = qe.Id,
                Order = qe.Order,
            })
            .ToList();

        return result;
    }

    public async Task<QuestionExamForDoingExamDTO?> GetQuestionInExamForDoingExamAsync(string questionId)
    {
        var questionExam = await _questionExamRepository.GetQuestionInExamAsync(questionId) ?? throw new KeyNotFoundException($"Question with {questionId} not found.");
        return new QuestionExamForDoingExamDTO
        {
            Id = questionExam.Id,
            ExamId = questionExam.ExamId,
            Content = questionExam.Content,
            ImageUrl = questionExam.ImageUrl,
            Type = questionExam.Type,
            Score = questionExam.Score,
            IsRequired = questionExam.IsRequired,
            Order = questionExam.Order,
            IsNewest = questionExam.IsNewest,
        };
    }

    public async Task<QuestionExamForReviewSubmissionDTO?> GetQuestionInExamForReviewSubmissionAsync(string questionId)
    {
        var questionExam = await _questionExamRepository.GetQuestionInExamAsync(questionId) ?? throw new KeyNotFoundException($"Question with {questionId} not found.");
        return new QuestionExamForReviewSubmissionDTO
        {
            Id = questionExam.Id,
            ExamId = questionExam.ExamId,
            Content = questionExam.Content,
            ImageUrl = questionExam.ImageUrl,
            Type = questionExam.Type,
            Explanation = questionExam.Exaplanation,
            Score = questionExam.Score,
            IsRequired = questionExam.IsRequired,
            Order = questionExam.Order,
            IsNewest = questionExam.IsNewest,
        };
    }
}