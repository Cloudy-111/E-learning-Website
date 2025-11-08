using System.ComponentModel.DataAnnotations;

public class RejectCourseRequestDTO
{
    [Required]
    public string Reason { get; set; } = null!;
}