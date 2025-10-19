public interface IChoiceRepository
{
    // Define methods related to choice data operations here
    Task AddChoiceAsync(Choice choice);
    Task DeleteChoiceAsync(string choiceId);
    Task<IEnumerable<Choice>> GetChoicesByQuestionExamIdAsync(string questionExamId);
}