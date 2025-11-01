using System;

namespace project.Modules.Posts.DTOs;

public class ReportDto
{
    public string Id { get; set; } = null!;
    public string ReporterId { get; set; } = null!;
    public string ReporterName { get; set; } = null!;
    public string? TargetType { get; set; }
    public string? TargetTypeId { get; set; }
    public string? Reason { get; set; }
    public string? Description { get; set; }
    public string Status { get; set; } = "Pending";
    public DateTime CreatedAt { get; set; }

}
