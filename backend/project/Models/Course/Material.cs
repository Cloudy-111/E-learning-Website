using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace project.Models;

public class Material
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int LessonId { get; set; }

    [Required, MaxLength(500)]
    public string FileUrl { get; set; } = null!;

    [MaxLength(50)]
    public string FileStyle { get; set; } = string.Empty;

    [ForeignKey(nameof(LessonId))]
    public Lesson Lesson { get; set; } = null!;
     
}
