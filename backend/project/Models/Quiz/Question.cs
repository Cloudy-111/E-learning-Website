using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace project.Models;

public class Question
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int QuizId { get; set; }

    [Required]
    public string Content { get; set; } = null!;

    [Required]
    public string CorrectAnswer { get; set; } = null!;

    [ForeignKey(nameof(QuizId))]
    public Quiz Quiz { get; set; } = null!;

}
