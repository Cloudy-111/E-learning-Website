using System.ComponentModel.DataAnnotations;

public class EnrollmentProgressUpdateDTO
{
    [Required]
    public string StudentId { get; set; } = null!;
    public string? LessonId { get; set; }
    public string? ExamId { get; set; }
}