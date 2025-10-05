using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace project.Models;

public class Quiz
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    public string? CourseId { get; set; }
    public string? LessonId { get; set; }
    [Required, MaxLength(255)]
    public string Title { get; set; } = null!;

    public string? Description { get; set; }
    public string Type { get; set; } = "multiple-choice";

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation

    [ForeignKey(nameof(CourseId))]
    public Course? Course { get; set; }
    [ForeignKey(nameof(LessonId))]
    public Lesson? Lesson { get; set; }

    public ICollection<Question> Questions { get; set; } = new List<Question>();

    public ICollection<Submission> Submissions { get; set; } = new List<Submission>();

}
