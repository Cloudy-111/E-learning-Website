using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace project.Models;

public class Lesson
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    [Required]
    public string CourseContentId { get; set; } = null!;

    [Required, MaxLength(255)]
    public string Title { get; set; } = null!;

    [MaxLength(500)]
    public string? VideoUrl { get; set; }

    public int? Duration { get; set; }
    public string? TextContent { get; set; }

    [ForeignKey(nameof(CourseContentId))]
    public CourseContent CourseContent { get; set; } = null!;
    public ICollection<Material> Materials { get; set; } = new List<Material>();
    public ICollection<Quiz> Quizzes { get; set; } = new List<Quiz>();

}
