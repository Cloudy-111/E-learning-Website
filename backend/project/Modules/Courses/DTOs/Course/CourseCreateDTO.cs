public class CourseCreateDTO
{
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public string CategoryId { get; set; } = null!;
    public string TeacherId { get; set; } = null!;
    public decimal Price { get; set; }
    public decimal? DiscountPrice { get; set; }
    public string? ThumbnailUrl { get; set; }
    public string? Introduce { get; set; }
}