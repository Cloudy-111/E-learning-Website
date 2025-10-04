using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace project.Models;

public class Certificate
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int CourseId { get; set; }

    [Required]
    public int StudentId { get; set; }

    [Required]
    public string CertificateUrl { get; set; } = null!;

    public DateTime IssuedAt { get; set; } = DateTime.UtcNow;

    [ForeignKey(nameof(CourseId))]
    public Course Course { get; set; } = null!;

    [ForeignKey(nameof(StudentId))]
    public Student Student { get; set; } = null!;

}
