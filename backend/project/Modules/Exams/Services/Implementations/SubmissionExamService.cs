public class SubmissionExamService : ISubmissionExamService
{
    private readonly ISubmissionExamRepository _submissionExamRepository;
    private readonly ISubmissionAnswerRepository _submissionAnswerRepository;
    private readonly IExamRepository _examRepository;
    private readonly IStudentRepository _studentRepository;
    private readonly IQuestionExamService _questionExamService;

    public SubmissionExamService(
        ISubmissionExamRepository submissionExamRepository,
        ISubmissionAnswerRepository submissionAnswerRepository,
        IExamRepository examRepository,
        IStudentRepository studentRepository,
        IQuestionExamService questionExamService)
    {
        _submissionExamRepository = submissionExamRepository;
        _submissionAnswerRepository = submissionAnswerRepository;
        _examRepository = examRepository;
        _studentRepository = studentRepository;
        _questionExamService = questionExamService;
    }

    public async Task CreateSubmissionExamAsync(string examId, SubmissionExamSubmitDTO submissionExamDto)
    {
        // Check ExamId existence could be added here
        var (exist, opened) = await _examRepository.GetExamStatusAsync(examId);
        if (!exist)
        {
            throw new KeyNotFoundException($"Exam with ID '{examId}' does not exist.");
        }
        // Check StudentId existence could be added here
        var studentExists = await _studentRepository.IsStudentExistAsync(submissionExamDto.StudentId);
        if (!studentExists)
        {
            throw new KeyNotFoundException($"Student with ID '{submissionExamDto.StudentId}' does not exist.");
        }

        // Retrieve questions for the exam
        var questionExams = await _questionExamService.GetQuestionsByExamIdForReviewSubmissionAsync(examId);

        // Validate that all question IDs in the submission exist in the exam
        var validQuestionIds = questionExams.Select(q => q.Id).ToHashSet();
        var invalidQuestions = submissionExamDto.AnswersSubmit
            .Where(a => !validQuestionIds.Contains(a.QuestionExamId))
            .Select(a => a.QuestionExamId)
            .Distinct()
            .ToList();

        if (invalidQuestions.Any())
        {
            throw new InvalidOperationException($"Invalid question IDs found: {string.Join(", ", invalidQuestions)}");
        }

        var submissionExam = new SubmissionExam
        {
            ExamId = examId,
            StudentId = submissionExamDto.StudentId
        };

        await _submissionExamRepository.CreateSubmissionExamAsync(submissionExam);

        int totalCorrect = 0;
        double? totalScore = 0.0;

        // Create a set of all valid choice IDs for quick lookup
        var allValidChoiceIds = questionExams
            .SelectMany(qe => qe.Choices)
            .Select(c => c.Id)
            .ToHashSet();

        // Group answers by QuestionExamId
        var validGroupedAnswersByQuestion = submissionExamDto.AnswersSubmit
            .Where(a => a.SelectedChoiceId != null && allValidChoiceIds.Contains(a.SelectedChoiceId))
            .GroupBy(a => a.QuestionExamId)
            .ToDictionary(g => g.Key, g => g.Select(a => a.SelectedChoiceId!).ToHashSet());

        foreach (var questionExam in questionExams)
        {
            // Determine correct choices for the question
            var correctChoices = questionExam.Choices
                .Where(c => c.IsCorrect)
                .Select(c => c.Id)
                .ToHashSet();

            // Get selected choices from submission
            validGroupedAnswersByQuestion.TryGetValue(questionExam.Id, out var selectedChoices);
            selectedChoices ??= new HashSet<string>();

            bool isCorrect = correctChoices.SetEquals(selectedChoices);

            // Create SubmissionAnswer entries
            foreach (var selectedChoice in selectedChoices)
            {
                if (!questionExam.Choices.Any(c => c.Id == selectedChoice)) continue;
                var submissionAnswer = new SubmissionAnswer
                {
                    SubmissionExamId = submissionExam.Id,
                    QuestionExamId = questionExam.Id,
                    SelectedChoiceId = selectedChoice,
                    IsCorrect = isCorrect,
                    ScoreAwarded = isCorrect ? questionExam.Score : 0.0
                };

                await _submissionAnswerRepository.CreateSubmissionAnswerAsync(submissionAnswer);
            }

            if (isCorrect)
            {
                totalCorrect++;
                totalScore += questionExam.Score;
            }
        }

        // Update submission exam with total correct and score
        submissionExam.TotalCorrect = totalCorrect;
        submissionExam.Score = totalScore ?? 0.0;
        await _submissionExamRepository.UpdateSubmissionExamAsync(submissionExam);
    }
}