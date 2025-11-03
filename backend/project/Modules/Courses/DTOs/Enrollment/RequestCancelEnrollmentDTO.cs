using System.ComponentModel.DataAnnotations;

public class RequestCancelEnrollmentDTO
{
    [Required]
    public string StudentId { get; set; } = null!;
    [Required]
    public string ReasonRequest { get; set; } = null!;
}