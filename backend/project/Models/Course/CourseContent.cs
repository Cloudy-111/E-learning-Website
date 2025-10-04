using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace project.Models;

public class CourseContent
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int CourseId { get; set; }

    [Required, MaxLength(255)]
    public string Title { get; set; } = null!;

    public string? Description { get; set; }
    public string? Introduce { get; set; }

    [ForeignKey(nameof(CourseId))]
    public Course Course { get; set; } = null!;

    // Navigation 1-n
    public ICollection<Lesson> Lessons { get; set; } = new List<Lesson>();
}
