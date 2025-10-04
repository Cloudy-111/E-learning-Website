using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace project.Models;

public class CourseReview
{

    [Key]
    public int Id { get; set; }

    [Required]
    public int CourseId { get; set; }

    [Required]
    public int StudentId { get; set; }

    [Range(1, 5)]
    public double Rating { get; set; }  

    [MaxLength(1000)]
    public string? Comment { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [ForeignKey(nameof(CourseId))]
    public Course Course { get; set; } = null!;

    [ForeignKey(nameof(StudentId))]
    public Student Student { get; set; } = null!;

}
