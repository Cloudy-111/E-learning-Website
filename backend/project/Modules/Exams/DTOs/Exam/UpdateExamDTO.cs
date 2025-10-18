public class UpdateExamDTO
{
    public string Id { get; set; } = null!;
    public string? Title { get; set; }
    public string? Description { get; set; }
    public int? DurationMinutes { get; set; }
    public bool? IsOpened { get; set; }
}