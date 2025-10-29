public class ChoiceService : IChoiceService
{
    private readonly IChoiceRepository _choiceRepository;
    private readonly IQuestionExamRepository _questionExamRepository;
    public ChoiceService(
        IChoiceRepository choiceRepository,
        IQuestionExamRepository questionExamRepository)
    {
        _choiceRepository = choiceRepository;
        _questionExamRepository = questionExamRepository;
    }

    // Implement methods defined in IChoiceService here
    public async Task AddChoiceAsync(string questionExamId, AddChoiceDTO addChoiceDTO)
    {
        bool exists = await _questionExamRepository.ExistQuestionAsync(questionExamId);
        if (!exists)
        {
            throw new ArgumentException($"QuestionExam with ID '{questionExamId}' does not exist.");
        }

        try
        {
            var choice = new Choice
            {
                QuestionExamId = questionExamId,
                Content = addChoiceDTO.Content,
                IsCorrect = addChoiceDTO.IsCorrect
            };

            await _choiceRepository.AddChoiceAsync(choice);
        }
        catch (Exception ex)
        {
            throw new ApplicationException("An error occurred while adding the choice.", ex);
        }
    }

    public async Task DeleteChoiceAsync(string choiceId)
    {
        try
        {
            await _choiceRepository.DeleteChoiceAsync(choiceId);
        }
        catch (Exception ex)
        {
            throw new ApplicationException("An error occurred while deleting the choice.", ex);
        }
    }

    public async Task<IEnumerable<ChoiceForExamDTO>> GetChoicesForExamByQuestionExamIdAsync(string questionExamId)
    {
        try
        {
            var choices = await _choiceRepository.GetChoicesByQuestionExamIdAsync(questionExamId);
            return choices.Select(c => new ChoiceForExamDTO
            {
                Id = c.Id,
                QuestionExamId = c.QuestionExamId,
                Content = c.Content
            });
        }
        catch (Exception ex)
        {
            throw new ApplicationException("An error occurred while retrieving choices.", ex);
        }
    }

    public async Task<IEnumerable<ChoiceForReviewDTO>> GetChoicesForReviewByQuestionExamIdAsync(string questionExamId)
    {
        try
        {
            var choices = await _choiceRepository.GetChoicesByQuestionExamIdAsync(questionExamId);
            return choices.Select(c => new ChoiceForReviewDTO
            {
                Id = c.Id,
                QuestionExamId = c.QuestionExamId,
                Content = c.Content,
                IsCorrect = c.IsCorrect ?? false
            });
        }
        catch (Exception ex)
        {
            throw new ApplicationException("An error occurred while retrieving choices for review.", ex);
        }
    }
}