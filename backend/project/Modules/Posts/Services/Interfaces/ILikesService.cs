using System;
using project.Modules.Posts.DTOs;

namespace project.Modules.Posts.Services.Interfaces;

public interface ILikesService
{
    Task<IEnumerable<LikeDto>> GetAllLikesAsync();
    Task<IEnumerable<LikeDto>> GetLikesByTargetAsync(string targetType, string targetId);
    Task<IEnumerable<LikeDto>> GetLikesByStudentAsync(string studentId);

}
