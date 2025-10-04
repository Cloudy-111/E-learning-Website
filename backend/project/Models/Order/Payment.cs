using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace project.Models;

public class Payment
{

    [Key]
    public int Id { get; set; }

    [Required]
    public int OrderId { get; set; }

    [Required, MaxLength(100)]
    public string TransactionId { get; set; } = null!; 

    [Column(TypeName = "decimal(10,2)")]
    public decimal Amount { get; set; } 

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    [ForeignKey(nameof(OrderId))]
    public Order Order { get; set; } = null!;

}
