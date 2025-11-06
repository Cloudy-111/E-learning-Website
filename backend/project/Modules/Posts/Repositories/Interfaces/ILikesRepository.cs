using System;
using project.Models.Posts;

namespace project.Modules.Posts.Repositories.Interfaces;

public interface ILikesRepository
{
    Task<IEnumerable<Likes>> GetAllLikesAsync();
    Task<IEnumerable<Likes>> GetLikesByTargetAsync(string targetType, string targetId);
    Task<IEnumerable<Likes>> GetLikesByStudentAsync(string studentId);
}
