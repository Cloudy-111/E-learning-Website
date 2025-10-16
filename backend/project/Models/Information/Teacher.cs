using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace project.Models;

public class Teacher
{
    [Key]
    public string TeacherId { get; set; } = Guid.NewGuid().ToString();

    [Required]
    public string UserId { get; set; } = null!;
    public string? EmployeeCode { get; set; }
    public string? instruction { get; set; }

    [ForeignKey(nameof(UserId))]
    public User User { get; set; } = null!;

    // Navigation
    public ICollection<Course> Courses { get; set; } = new List<Course>();

}
