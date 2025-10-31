using System;
using project.Models.Posts.DTOs;

namespace project.Modules.Posts.Services.Interfaces;

public interface IPostService
{
    Task<IEnumerable<PostDto>> GetPostsByStudentIdAsync(string studentId);
}
