public interface IChoiceService
{
    // Define methods related to choice operations here
    Task AddChoiceAsync(string questionExamId, AddChoiceDTO addChoiceDTO);
    Task DeleteChoiceByIdAsync(string choiceId);
    Task UpdateChoiceAsync(string choiceId, ChoiceUpdateDTO dto);
    Task<IEnumerable<ChoiceForExamDTO>> GetChoicesForExamByQuestionExamIdAsync(string questionExamId);
    Task<IEnumerable<ChoiceForReviewDTO>> GetChoicesForReviewByQuestionExamIdAsync(string questionExamId);
}