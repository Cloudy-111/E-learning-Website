using System;
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

    public async Task<IEnumerable<DiscussionDto>> GetDiscussionsByStudentIdAsync(string studentId)
    {
        var discussions = await _discussionRepository.GetDiscussionsByStudentIdAsync(studentId);

        return discussions.Select(d => new DiscussionDto
        {
            Id = d.Id,
            Content = d.Content ?? "",
            TargetType = d.TargetType,
            TargetTypeId = d.TargetTypeId,
            ParentDiscussionId = d.ParentDiscussionId,
            CreatedAt = d.CreatedAt,
            UpdatedAt = d.UpdatedAt
        });
    }
}
