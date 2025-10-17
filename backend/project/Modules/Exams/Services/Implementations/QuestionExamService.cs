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
        var questionExams = await _questionExamRepository.GetQuestionsByExamIdForDoingExamAsync(examId) ?? throw new KeyNotFoundException($"Question with {examId} not found.");
        return questionExams;
    }

    public async Task<IEnumerable<QuestionExamForReviewSubmissionDTO>> GetQuestionsByExamIdForReviewSubmissionAsync(string examId)
    {
        var questionExams = await _questionExamRepository.GetQuestionsByExamIdForReviewSubmissionAsync(examId) ?? throw new KeyNotFoundException($"Question with {examId} not found.");
        return questionExams;
    }

    public async Task<IEnumerable<QuestionExamOrderDTO>> GetQuestionExamOrderAsync(string examId)
    {
        var questionExamsOrder = await _questionExamRepository.GetQuestionExamOrderAsync(examId);
        return questionExamsOrder;
    }

    public async Task<QuestionExamForDoingExamDTO?> GetQuestionInExamForDoingExamAsync(string questionId)
    {
        var questionExam = await _questionExamRepository.GetQuestionInExamForDoingExamAsync(questionId) ?? throw new KeyNotFoundException($"Question with {questionId} not found.");
        return questionExam;
    }

    public async Task<QuestionExamForReviewSubmissionDTO?> GetQuestionInExamForReviewSubmissionAsync(string questionId)
    {
        var questionExam = await _questionExamRepository.GetQuestionInExamForReviewSubmissionAsync(questionId) ?? throw new KeyNotFoundException($"Question with {questionId} not found.");
        return questionExam;
    }
}