using System.ComponentModel.DataAnnotations;

public class CourseReviewCreateDTO
{
    [Required]
    public string StudentId { get; set; } = null!;
    [Required, Range(1, 5)]
    public double Rating { get; set; }

    public string? Comment { get; set; }
}