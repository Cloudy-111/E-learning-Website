using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace project.Models;

public class Question
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    [Required]
    public string QuizId { get; set; } = null!;

    [Required]
    public string Content { get; set; } = null!;

    [Required]
    public string CorrectAnswer { get; set; } = null!;

    [ForeignKey(nameof(QuizId))]
    public Quiz Quiz { get; set; } = null!;

}
