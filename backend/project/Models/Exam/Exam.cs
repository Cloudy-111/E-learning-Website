using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using project.Models;

public class Exam
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    public string AdminId { get; set; } = null!;
    public string CategoryId { get; set; } = null!;

    [Required]
    public string Title { get; set; } = null!;

    public string? Description { get; set; }
    public int DurationMinutes { get; set; }
    public int TotalCompleted { get; set; } = 0;
    public bool IsOpened { get; set; } = false;


    [ForeignKey(nameof(AdminId))]
    public Admin Admin { get; set; } = null!;
    [ForeignKey(nameof(CategoryId))]
    public Category Category { get; set; } = null!;

    public ICollection<QuestionExam> Questions { get; set; } = new List<QuestionExam>();
    public ICollection<SubmissionExam> Submissions { get; set; } = new List<SubmissionExam>();
}