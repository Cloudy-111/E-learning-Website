using System;
using project.Modules.Posts.DTOs;
using project.Modules.Posts.Repositories.Interfaces;
using project.Modules.Posts.Services.Interfaces;

namespace project.Modules.Posts.Services.Implements;

public class LikesService : ILikesService
{
   private readonly ILikesRepository _repository;

    public LikesService(ILikesRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<LikeDto>> GetAllLikesAsync()
    {
        var likes = await _repository.GetAllLikesAsync();
        return likes.Select(l => new LikeDto
        {
            Id = l.Id,
            StudentId = l.StudentId,
            StudentName = l.Student.User.FullName,
            AvatarUrl = l.Student.User.AvatarUrl,
            TargetType = l.TargetType!,
            TargetId = l.TargetId!,
            CreatedAt = l.CreatedAt
        });
    }

    public async Task<IEnumerable<LikeDto>> GetLikesByPostIdAsync(string postId)
    {
        var likes = await _repository.GetLikesByPostIdAsync(postId);
        return likes.Select(l => new LikeDto
        {
            Id = l.Id,
            StudentId = l.StudentId,
            StudentName = l.Student.User.FullName,
            AvatarUrl = l.Student.User.AvatarUrl,
            TargetType = l.TargetType!,
            TargetId = l.TargetId!,
            CreatedAt = l.CreatedAt
        });
    }

    public async Task<IEnumerable<LikeDto>> GetLikesByForumQuestionIdAsync(string forumQuestionId)
    {
        var likes = await _repository.GetLikesByForumQuestionIdAsync(forumQuestionId);
        return likes.Select(l => new LikeDto
        {
            Id = l.Id,
            StudentId = l.StudentId,
            StudentName = l.Student.User.FullName,
            AvatarUrl = l.Student.User.AvatarUrl,
            TargetType = l.TargetType!,
            TargetId = l.TargetId!,
            CreatedAt = l.CreatedAt
        });
    }

    public async Task<IEnumerable<LikeDto>> GetLikesByStudentAsync(string studentId)
    {
        var likes = await _repository.GetLikesByStudentAsync(studentId);
        return likes.Select(l => new LikeDto
        {
            Id = l.Id,
            StudentId = l.StudentId,
            StudentName = l.Student.User.FullName,
            AvatarUrl = l.Student.User.AvatarUrl,
            TargetType = l.TargetType!,
            TargetId = l.TargetId!,
            CreatedAt = l.CreatedAt
        });
    }
}
