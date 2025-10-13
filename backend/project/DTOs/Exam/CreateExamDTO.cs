public class CreateExamDTO
{
    public string AdminId { get; set; } = null!;
    public string CategoryId { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public int DurationMinutes { get; set; }
}