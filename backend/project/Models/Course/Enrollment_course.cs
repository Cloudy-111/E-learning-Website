using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace project.Models;

public class Enrollment_course
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int StudentId { get; set; }

    [Required]
    public int CourseId { get; set; }

    public DateTime EnrolledAt { get; set; } = DateTime.UtcNow;
    public decimal Progress { get; set; } = 0.00m;
    public string Status { get; set; } = "active";

    [ForeignKey(nameof(StudentId))]
    public Student Student { get; set; } = null!;

    [ForeignKey(nameof(CourseId))]
    public Course Course { get; set; } = null!;

}
