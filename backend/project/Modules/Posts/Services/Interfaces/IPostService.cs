using System;
using project.Models.Posts.DTOs;

namespace project.Modules.Posts.Services.Interfaces;

public interface IPostService
{
    Task<IEnumerable<PostDto>> GetAllPostsAsync();
    Task<IEnumerable<PostDto>> GetPostsByMemberIdAsync(string memberId);
    Task<PostDto?> GetPostByIdAsync(string id);
}
