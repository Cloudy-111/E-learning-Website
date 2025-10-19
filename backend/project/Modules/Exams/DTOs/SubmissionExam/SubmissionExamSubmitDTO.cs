using System.ComponentModel.DataAnnotations;

public class SubmissionExamSubmitDTO
{
    [Required]
    public string ExamId { get; set; } = null!;
    [Required]
    public string StudentId { get; set; } = null!;
    public List<SubmissionAnswerSubmitDTO> AnswersSubmit { get; set; } = new List<SubmissionAnswerSubmitDTO>();
}