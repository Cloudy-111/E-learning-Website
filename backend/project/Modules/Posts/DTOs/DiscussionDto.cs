using System;

namespace project.Modules.Posts.DTOs;

public class DiscussionDto
{
    public string Id { get; set; } = null!;
    public string Content { get; set; } = null!;
    public string? TargetType { get; set; }
    public string? TargetTypeId { get; set; }
    public string? ParentDiscussionId { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}
