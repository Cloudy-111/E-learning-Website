using System;
using project.Models.Posts;
using project.Models.Posts.DTOs;
using project.Modules.Posts.DTOs;
using project.Modules.Posts.Services.Interfaces;

namespace project.Modules.Posts.Services.Implements;

public class PostService : IPostService
{
     private readonly IPostRepository _postRepository;

    public PostService(IPostRepository postRepository)
    {
        _postRepository = postRepository;
    }
    
     private static PostDto MapToListDto(Post p) => new()
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

    // ✅ GET /api/posts
    public async Task<IEnumerable<PostDto>> GetAllPostsAsync()
    {
        var posts = await _postRepository.GetAllPostsAsync();
        return posts.Select(MapToListDto);
    }

    // ✅ GET /api/posts/member/{memberId}
    public async Task<IEnumerable<PostDto>> GetPostsByMemberIdAsync(string memberId)
    {
        var posts = await _postRepository.GetPostsByMemberIdAsync(memberId);
        return posts.Select(MapToListDto);
    }

    // ✅ GET /api/posts/search?tag=abc
    public async Task<IEnumerable<PostDto>> SearchPostsByTagAsync(string tag)
    {
        var posts = await _postRepository.SearchPostsByTagAsync(tag);
        return posts.Select(MapToListDto);
    }

    // ✅ GET /api/posts/{id}
    public async Task<PostDetailDto?> GetPostByIdAsync(string id)
    {
        var post = await _postRepository.GetPostByIdAsync(id);
        if (post == null) return null;

        return new PostDetailDto
        {
            Id = post.Id,
            Title = post.Title ?? string.Empty,
            ThumbnailUrl = post.ThumbnailUrl,
            Tags = post.Tags,
            ViewCount = post.ViewCount,
            LikeCount = post.LikeCount,
            DiscussionCount = post.DiscussionCount,
            IsPublished = post.IsPublished,
            CreatedAt = post.CreatedAt,
            UpdatedAt = post.UpdatedAt,
            AuthorId = post.AuthorId,
            AuthorName = post.Student?.User?.FullName ?? "(Không rõ)",
            ContentJson = post.ContentJson
        };
    }

    public async Task<PostDto> CreatePostAsync(PostCreateDto dto, string authorName)
    {
        var post = new Post
        {
            Title = dto.Title,
            ContentJson = dto.ContentJson,
            ThumbnailUrl = dto.ThumbnailUrl,
            Tags = dto.Tags,
            IsPublished = dto.IsPublished,
            AuthorId = authorName,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        var created = await _postRepository.AddPostAsync(post);

        return new PostDto
        {
            Id = created.Id,
            Title = created.Title,
            ThumbnailUrl = created.ThumbnailUrl,
            Tags = created.Tags,
            ViewCount = created.ViewCount,
            LikeCount = created.LikeCount,
            DiscussionCount = created.DiscussionCount,
            IsPublished = created.IsPublished,
            CreatedAt = created.CreatedAt,
            AuthorId = created.AuthorId,
            AuthorName = authorName
        };
    }


}
