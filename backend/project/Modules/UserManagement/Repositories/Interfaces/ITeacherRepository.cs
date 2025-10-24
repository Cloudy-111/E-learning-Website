public interface ITeacherRepository
{
    Task<bool> IsTeacherExistsAsync(string teacherId);
}