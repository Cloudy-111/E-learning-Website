using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace project.Models;

public class Submission
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int QuizId { get; set; }

    [Required]
    public int StudentId { get; set; }

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
