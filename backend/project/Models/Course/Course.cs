using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace project.Models;

public class Course
{
    [Key]
    public int Id { get; set; }

    [Required, MaxLength(255)]
    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    // FK -> Category
    [Required]
    public int CategoryId { get; set; }

    // FK -> Teacher
    [Required]
    public int TeacherId { get; set; }

    [Column(TypeName = "decimal(10,2)")]
    public decimal Price { get; set; }

    [Column("DiscountPrice", TypeName = "decimal(10,2)")]
    public decimal? DiscountPrice { get; set; }

    [MaxLength(50)]
    public string Status { get; set; } = "active";

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    [MaxLength(500)]
    public string? ThumbnailUrl { get; set; }

    // Navigation
    [ForeignKey(nameof(CategoryId))]
    public Category Category { get; set; } = null!;

    [ForeignKey(nameof(TeacherId))]
    public Teacher Teacher { get; set; } = null!;


    // Naviagtion
    public ICollection<Enrollment_course> Enrollments { get; set; } = new List<Enrollment_course>();
    public CourseContent? Content { get; set; }


    public ICollection<Quiz> Quizzes { get; set; } = new List<Quiz>(); public ICollection<CourseReview> Reviews { get; set; } = new List<CourseReview>();
    public ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
    public ICollection<Certificate> Certificates { get; set; } = new List<Certificate>();


}
