using System;
using System.ComponentModel.DataAnnotations;

namespace project.Models;

public class Category
{

    [Key]
    public int Id { get; set; }

    [Required, MaxLength(255)]
    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    // Navigation 1-n
    public ICollection<Course> Courses { get; set; } = new List<Course>();

}
