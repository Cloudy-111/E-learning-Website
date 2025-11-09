using Microsoft.EntityFrameworkCore;

public class userRepository : IUserRepository
{
    private readonly DBContext _dbContext;

    public userRepository(DBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<bool> IsUserExistAsync(string userId)
    {
        return await _dbContext.Users.AnyAsync(u => u.Id == userId);
    }
}