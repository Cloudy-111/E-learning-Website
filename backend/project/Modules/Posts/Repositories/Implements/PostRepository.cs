using System;
using Microsoft.EntityFrameworkCore;
using project.Models.Posts;

namespace project.Modules.Posts.Repositories.Interfaces;

public class PostRepository : IPostRepository
{
    private readonly DBContext _context;

    public PostRepository(DBContext context)
    {
        _context = context;
    }

    // ✅ Lấy tất cả bài viết
    public async Task<IEnumerable<Post>> GetAllPostsAsync()
    {
        return await _context.Posts
            .Include(p => p.Student)
            .ThenInclude(s => s.User)
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();
    }

    public async Task<IEnumerable<Post>> GetPostsByMemberIdAsync(string memberId)
    {
        return await _context.Posts
            .Where(p => p.AuthorId == memberId)
            .Include(p => p.Student)
            .ThenInclude(s => s.User)
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();
    }
    public async Task<Post?> GetPostByIdAsync(string id)
    {
        return await _context.Posts
            .Include(p => p.Student)
            .ThenInclude(s => s.User)
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<IEnumerable<Post>> SearchPostsByTagAsync(string tag)
    {
        return await _context.Posts
            .Include(p => p.Student)
                .ThenInclude(s => s.User)
            .Where(p => p.Tags != null && p.Tags.Contains(tag))
            .ToListAsync();
    }

    public async Task<Post> AddPostAsync(Post post)
    {
        await _context.Posts.AddAsync(post);
        await _context.SaveChangesAsync();
        return post;
    }
}
