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

     // ✅ Lấy tất cả comment trong hệ thống
    public async Task<IEnumerable<DiscussionDto>> GetAllCommentsAsync()
    {
        var discussions = await _discussionRepository.GetAllCommentsAsync();

        return discussions.Select(d => new DiscussionDto
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
        });
    }

    public async Task<IEnumerable<DiscussionDto>> GetCommentsByPostIdAsync(string postId)
    {
        var discussions = await _discussionRepository.GetCommentsByPostIdAsync(postId);

        return discussions.Select(d => new DiscussionDto
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
        });
    }

    
}
