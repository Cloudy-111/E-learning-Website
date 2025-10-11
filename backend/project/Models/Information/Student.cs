using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace project.Models;

public class Student
{
    [Key]
    public string StudentId { get; set; } = Guid.NewGuid().ToString();
    [Required]
    public string UserId { get; set; } = null!;
    public string? Bio { get; set; }

    [ForeignKey(nameof(UserId))]
    public User User { get; set; } = null!;

    // Navigation: 
    public ICollection<Enrollment_course> Enrollments { get; set; } = new List<Enrollment_course>();
    public ICollection<Submission> Submissions { get; set; } = new List<Submission>();
    public ICollection<CourseReview> Reviews { get; set; } = new List<CourseReview>();
    public ICollection<Order> Orders { get; set; } = new List<Order>();
    public ICollection<Certificate> Certificates { get; set; } = new List<Certificate>();
    public ICollection<SubmissionExam> SubmissionExams { get; set; } = new List<SubmissionExam>();
}
