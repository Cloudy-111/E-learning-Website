public interface IChoiceService
{
    // Define methods related to choice operations here
    Task AddChoiceAsync(string questionExamId, AddChoiceDTO addChoiceDTO);
    Task DeleteChoiceAsync(string choiceId);
    Task<IEnumerable<ChoiceForExamDTO>> GetChoicesForExamByQuestionExamIdAsync(string questionExamId);
    Task<IEnumerable<ChoiceForReviewDTO>> GetChoicesForReviewByQuestionExamIdAsync(string questionExamId);
}