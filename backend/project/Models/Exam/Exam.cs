using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using project.Models;

public class Exam
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    public string TeacherId { get; set; } = null!;
    public string CategoryId { get; set; } = null!;
    public string CourseContentId { get; set; } = null!;
    public string LessonId { get; set; } = null!;

    [Required]
    public string Title { get; set; } = null!;

    public string? Description { get; set; }
    public int DurationMinutes { get; set; }
    public int TotalCompleted { get; set; } = 0;
    public bool IsOpened { get; set; } = false;


    [ForeignKey(nameof(TeacherId))]
    public Teacher Teacher { get; set; } = null!;
    [ForeignKey(nameof(CategoryId))]
    public Category Category { get; set; } = null!;
    [ForeignKey(nameof(CourseContentId))]
    public CourseContent CourseContent { get; set; } = null!;
    [ForeignKey(nameof(LessonId))]
    public Lesson Lesson { get; set; } = null!;

    public ICollection<QuestionExam> Questions { get; set; } = new List<QuestionExam>();
    public ICollection<SubmissionExam> Submissions { get; set; } = new List<SubmissionExam>();
}