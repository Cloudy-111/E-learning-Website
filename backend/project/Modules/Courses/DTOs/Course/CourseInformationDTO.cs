public class CourseInformationDTO
{
    public string Id { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public decimal? DiscountPrice { get; set; }
    public string Status { get; set; } = null!;
    public string? ThumbnailUrl { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public string CategoryId { get; set; } = null!;
    public string CategoryName { get; set; } = null!;

    public string TeacherId { get; set; } = null!;
    public string TeacherName { get; set; } = null!;
}