using System;
using project.Modules.Posts.DTOs;

namespace project.Modules.Posts.Services.Interfaces;

public interface ILikesService
{
    Task<IEnumerable<LikeDto>> GetAllLikesAsync();
    Task<IEnumerable<LikeDto>> GetLikesByPostIdAsync(string postId);
    Task<IEnumerable<LikeDto>> GetLikesByForumQuestionIdAsync(string forumQuestionId);
    Task<IEnumerable<LikeDto>> GetLikesByStudentAsync(string studentId);

}
