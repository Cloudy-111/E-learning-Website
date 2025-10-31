using System;
using project.Models.Posts.DTOs;
using project.Modules.Posts.Services.Interfaces;

namespace project.Modules.Posts.Services.Implements;

public class PostService : IPostService
{
 private readonly IPostRepository _postRepository;

        public PostService(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        public async Task<IEnumerable<PostDto>> GetPostsByStudentIdAsync(string studentId)
        {
            var posts = await _postRepository.GetPostsByStudentIdAsync(studentId);

            return posts.Select(p => new PostDto
            {
                Id = p.Id,
                Title = p.Title ?? "",
                ThumbnailUrl = p.ThumbnailUrl,
                Tags = p.Tags,
                ViewCount = p.ViewCount,
                LikeCount = p.LikeCount,
                DiscussionCount = p.DiscussionCount,
                IsPublished = p.IsPublished,
                CreatedAt = p.CreatedAt,
                UpdatedAt = p.UpdatedAt
            });
        }
}
