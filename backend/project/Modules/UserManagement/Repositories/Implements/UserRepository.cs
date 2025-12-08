using Microsoft.EntityFrameworkCore;

public class UserRepository : IUserRepository
{
    private readonly DBContext _dbContext;

    public UserRepository(DBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<bool> IsUserExistAsync(string userId)
    {
        return await _dbContext.Users.AnyAsync(u => u.Id == userId);
    }

    public async Task<bool> IsUserExistByEmailAsync(string email)
    {
        return await _dbContext.Users.AnyAsync(u => u.Email == email);
    }
}