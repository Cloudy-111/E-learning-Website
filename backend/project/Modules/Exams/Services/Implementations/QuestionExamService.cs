public class QuestionExamService : IQuestionExamService
{
    private readonly IQuestionExamRepository _questionExamRepository;
    private readonly IExamRepository _examRepository;
    private readonly IChoiceService _choiceService;

    public QuestionExamService(
        IQuestionExamRepository questionExamRepository,
        IExamRepository examRepository,
        IChoiceService choiceService
    )
    {
        _questionExamRepository = questionExamRepository;
        _examRepository = examRepository;
        _choiceService = choiceService;
    }

    public async Task<bool> ExistQuestionAsync(string questionId)
    {
        return await _questionExamRepository.ExistQuestionAsync(questionId);
    }

    public async Task AddQuestionToExamAsync(QuestionExam questionExam)
    {
        var (exists, isOpened) = await _examRepository.GetExamStatusAsync(questionExam.ExamId);
        if (!exists)
        {
            throw new KeyNotFoundException($"Exam with ID '{questionExam.ExamId}' does not exist.");
        }
        if (isOpened)
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
            Choices = _choiceService.GetChoicesForExamByQuestionExamIdAsync(qe.Id).Result.ToList()
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
            Choices = _choiceService.GetChoicesForReviewByQuestionExamIdAsync(qe.Id).Result.ToList()
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
            Choices = _choiceService.GetChoicesForExamByQuestionExamIdAsync(questionExam.Id).Result.ToList()
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
            Choices = _choiceService.GetChoicesForReviewByQuestionExamIdAsync(questionExam.Id).Result.ToList()
        };
    }
}