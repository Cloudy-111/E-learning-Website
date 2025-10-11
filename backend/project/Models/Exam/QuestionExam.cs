using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using project.Models;

public class QuestionExam
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    public string ExamId { get; set; } = null!;
    [Required]
    public string Content { get; set; } = null!;
    public string? ImageUrl { get; set; }
    public string Type { get; set; } = null!;
    public string Exaplanation { get; set; } = null!;

    public double Score { get; set; } = 1.0;
    public bool IsRequired { get; set; } = true;

    [ForeignKey(nameof(ExamId))]
    public Exam Exam { get; set; } = null!;

    public ICollection<Choice> Choices { get; set; } = new List<Choice>();
    public ICollection<SubmissionAnswer> SubmissionAnswers { get; set; } = new List<SubmissionAnswer>();
}