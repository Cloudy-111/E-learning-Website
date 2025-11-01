using System;
using project.Models.Posts;

namespace project.Modules.Posts.Repositories.Interfaces;

public interface ILikesRepository
{
    Task<IEnumerable<Likes>> GetAllLikesAsync();
    Task<IEnumerable<Likes>> GetLikesByPostIdAsync(string postId);
    Task<IEnumerable<Likes>> GetLikesByForumQuestionIdAsync(string forumQuestionId);
    Task<IEnumerable<Likes>> GetLikesByStudentAsync(string studentId);
}
