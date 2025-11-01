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

        public async Task<IEnumerable<PostDto>> GetAllPostsAsync()
        {
            var posts = await _postRepository.GetAllPostsAsync();
            return posts.Select(MapToDto);
        }

        public async Task<IEnumerable<PostDto>> GetPostsByMemberIdAsync(string memberId)
        {
            var posts = await _postRepository.GetPostsByMemberIdAsync(memberId);
            return posts.Select(MapToDto);
        }

        public async Task<PostDto?> GetPostByIdAsync(string id)
        {
            var post = await _postRepository.GetPostByIdAsync(id);
            return post == null ? null : MapToDto(post);
        }

        // 🔹 Gộp lại thành 1 hàm duy nhất cho 1 bài viết
        private static PostDto MapToDto(project.Models.Posts.Post p)
        {
            return new PostDto
            {
                Id = p.Id,
                Title = p.Title ?? string.Empty,
                ThumbnailUrl = p.ThumbnailUrl,
                Tags = p.Tags,
                ViewCount = p.ViewCount,
                LikeCount = p.LikeCount,
                DiscussionCount = p.DiscussionCount,
                IsPublished = p.IsPublished,
                CreatedAt = p.CreatedAt,
                AuthorId = p.AuthorId,
                AuthorName = p.Student?.User?.FullName ?? "(Không rõ)"
            };
        }


}
