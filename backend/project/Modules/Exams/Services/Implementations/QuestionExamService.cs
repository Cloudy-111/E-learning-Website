public class QuestionExamService : IQuestionExamService
{
    private readonly IQuestionExamRepository _questionExamRepository;
    private readonly IExamRepository _examRepository;
    private readonly IChoiceRepository _choiceRepository;
    private readonly IChoiceService _choiceService;
    private readonly IUnitOfWork _unitOfWork;

    public QuestionExamService(
        IQuestionExamRepository questionExamRepository,
        IExamRepository examRepository,
        IChoiceService choiceService,
        IChoiceRepository choiceRepository,
        IUnitOfWork unitOfWork
    )
    {
        _questionExamRepository = questionExamRepository;
        _examRepository = examRepository;
        _choiceService = choiceService;
        _choiceRepository = choiceRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<bool> ExistQuestionAsync(string questionId)
    {
        return await _questionExamRepository.ExistQuestionAsync(questionId);
    }

    public async Task AddQuestionToExamAsync(string examId, CreateQuestionExamDTO questionExam)
    {
        var (exists, isOpened) = await _examRepository.GetExamStatusAsync(examId);
        if (!exists)
        {
            throw new KeyNotFoundException($"Exam with ID '{examId}' does not exist.");
        }
        if (isOpened)
        {
            throw new InvalidOperationException("Cannot add question to an opened exam.");
        }

        var newQuestionExam = new QuestionExam
        {
            ExamId = examId,
            Content = questionExam.Content,
            ImageUrl = questionExam.ImageUrl,
            Type = questionExam.Type,
            Exaplanation = questionExam.Exaplanation,
            Score = questionExam.Score,
            IsRequired = questionExam.IsRequired,
            // For versioning
            IsNewest = true,
            ParentQuestionId = null
        };
        await _questionExamRepository.AddQuestionToExamAsync(newQuestionExam);
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
        var (exists, isOpened) = await _examRepository.GetExamStatusAsync(examId);
        if (!exists)
        {
            throw new KeyNotFoundException($"Exam with ID '{examId}' does not exist.");
        }
        var questionExams = await _questionExamRepository.GetQuestionsByExamIdAsync(examId);

        var choiceTasks = questionExams.Select(q => _choiceService.GetChoicesForExamByQuestionExamIdAsync(q.Id)).ToArray();
        var choicesArrays = await Task.WhenAll(choiceTasks);

        var result = questionExams
            .Select((qe, idx) => new QuestionExamForDoingExamDTO
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
                Choices = choicesArrays[idx].ToList()
            })
            .ToList();

        return result;
    }

    public async Task<IEnumerable<QuestionExamForReviewSubmissionDTO>> GetQuestionsByExamIdForReviewSubmissionAsync(string examId)
    {
        var (exists, isOpened) = await _examRepository.GetExamStatusAsync(examId);
        if (!exists)
        {
            throw new KeyNotFoundException($"Exam with ID '{examId}' does not exist.");
        }
        var questionExams = await _questionExamRepository.GetQuestionsByExamIdAsync(examId);

        var choiceTasks = questionExams.Select(q => _choiceService.GetChoicesForReviewByQuestionExamIdAsync(q.Id)).ToArray();
        var choicesArrays = await Task.WhenAll(choiceTasks);

        var result = questionExams
            .Select((qe, idx) => new QuestionExamForReviewSubmissionDTO
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
                Choices = choicesArrays[idx].ToList()
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
        var choices = await _choiceService.GetChoicesForExamByQuestionExamIdAsync(questionExam.Id);
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
            Choices = choices.ToList()
        };
    }

    public async Task<QuestionExamForReviewSubmissionDTO?> GetQuestionInExamForReviewSubmissionAsync(string questionId)
    {
        var questionExam = await _questionExamRepository.GetQuestionInExamAsync(questionId) ?? throw new KeyNotFoundException($"Question with {questionId} not found.");
        var choices = await _choiceService.GetChoicesForReviewByQuestionExamIdAsync(questionExam.Id);
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
            Choices = choices.ToList()
        };
    }

    public async Task DeleteQuestionExamAsync(string examId, string questionExamId)
    {
        var (exists, isOpened) = await _examRepository.GetExamStatusAsync(examId);
        if (!exists)
        {
            throw new KeyNotFoundException($"Exam with ID '{examId}' does not exist.");
        }
        if (isOpened)
        {
            throw new InvalidOperationException("Cannot modify in an opened exam.");
        }

        var questionExam = await _questionExamRepository.GetQuestionInExamAsync(questionExamId)
            ?? throw new KeyNotFoundException($"Question with ID '{questionExamId}' not found.");

        var choices = await _choiceRepository.GetChoicesByQuestionExamIdAsync(questionExamId);

        _choiceRepository.DeleteChoice(choices);
        _questionExamRepository.DeleteQuestionExam(questionExam);

        await _unitOfWork.SaveChangesAsync();
    }
}