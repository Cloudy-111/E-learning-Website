using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace project.Models;

public class Submission
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    [Required]
    public string QuizId { get; set; } = null!;

    [Required]
    public string StudentId { get; set; } = null!;

    public string? Answer { get; set; }

    [Column(TypeName = "decimal(5,2)")]
    public decimal? Score { get; set; }

    public DateTime SubmitAt { get; set; } = DateTime.UtcNow;

    // Navigation
    [ForeignKey(nameof(QuizId))]
    public Quiz Quiz { get; set; } = null!;

    [ForeignKey(nameof(StudentId))]
    public Student Student { get; set; } = null!;

}
