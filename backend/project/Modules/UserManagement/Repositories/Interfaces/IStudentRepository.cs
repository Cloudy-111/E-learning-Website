public interface IStudentRepository
{
    Task<bool> IsStudentExistAsync(string studentId);
}