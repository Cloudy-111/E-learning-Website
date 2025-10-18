using Microsoft.EntityFrameworkCore;

public class ChoiceRepository : IChoiceRepository
{
    private readonly DBContext _dbContext;
    public ChoiceRepository(DBContext dbContext)
    {
        _dbContext = dbContext;
    }

    // Implement methods defined in IChoiceRepository here
    public async Task AddChoiceAsync(Choice choice)
    {
        await _dbContext.Choices.AddAsync(choice);
        await _dbContext.SaveChangesAsync();
    }

    public async Task DeleteChoiceAsync(string choiceId)
    {
        var choice = await _dbContext.Choices.FindAsync(choiceId);
        if (choice != null)
        {
            _dbContext.Choices.Remove(choice);
            await _dbContext.SaveChangesAsync();
        }
    }

    public async Task<IEnumerable<Choice>> GetChoicesByQuestionExamIdAsync(string questionExamId)
    {
        return await _dbContext.Choices
            .Where(c => c.QuestionExamId == questionExamId)
            .ToListAsync();
    }
}