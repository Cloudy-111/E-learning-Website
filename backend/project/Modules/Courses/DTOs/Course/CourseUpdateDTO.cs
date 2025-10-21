public class CourseUpdateDTO
{
    public string Id { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public string CategoryId { get; set; } = null!;
    public decimal Price { get; set; }
    public decimal? DiscountPrice { get; set; }
    public string? ThumbnailUrl { get; set; }
    public string? Introduce { get; set; }
    public string Status { get; set; } = null!;
}