using System;
using project.Models.Posts;
using project.Modules.Posts.DTOs;
using project.Modules.Posts.Repositories.Interfaces;
using project.Modules.Posts.Services.Interfaces;

namespace project.Modules.Posts.Services.Implements;

public class DiscussionService : IDiscussionService
{
    private readonly IDiscussionRepository _discussionRepository;

    public DiscussionService(IDiscussionRepository discussionRepository)
    {
        _discussionRepository = discussionRepository;
    }

    // Hàm map chung
    private static DiscussionDto MapToDto(Discussion d)
    {
        return new DiscussionDto
        {
            Id = d.Id,
            StudentId = d.StudentId,
            StudentName = d.Student?.User?.FullName ?? "(Ẩn danh)",
            AvatarUrl = d.Student?.User?.AvatarUrl,
            TargetType = d.TargetType,
            TargetTypeId = d.TargetTypeId,
            ParentDiscussionId = d.ParentDiscussionId,
            Content = d.Content,
            CreatedAt = d.CreatedAt,
            UpdatedAt = d.UpdatedAt
        };
    }

    // Lấy tất cả comment
    public async Task<IEnumerable<DiscussionDto>> GetAllCommentsAsync()
    {
        var discussions = await _discussionRepository.GetAllCommentsAsync();
        return discussions.Select(MapToDto);
    }

    // Hàm dùng chung cho mọi TargetType
    public async Task<IEnumerable<DiscussionDto>> GetCommentsByTargetAsync(string targetType, string targetId)
    {
        var discussions = await _discussionRepository.GetCommentsByTargetAsync(targetType, targetId);
        return discussions.Select(MapToDto);
    }

}
