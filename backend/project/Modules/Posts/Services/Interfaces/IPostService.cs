using System;
using project.Models.Posts.DTOs;
using project.Modules.Posts.DTOs;

namespace project.Modules.Posts.Services.Interfaces;

public interface IPostService
{
    Task<IEnumerable<PostDto>> GetAllPostsAsync();
    Task<IEnumerable<PostDto>> GetPostsByMemberIdAsync(string memberId);
    Task<PostDetailDto?> GetPostByIdAsync(string id);
    Task<IEnumerable<PostDto>> SearchPostsByTagAsync(string tag);
}
