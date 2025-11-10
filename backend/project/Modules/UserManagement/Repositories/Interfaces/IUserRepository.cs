public interface IUserRepository
{
    Task<bool> IsUserExistAsync(string userId);
}