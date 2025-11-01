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

    public async Task<IEnumerable<Post>> GetAllPostsAsync()
    {
        return await _context.Posts
            .Include(p => p.Student)
                .ThenInclude(s => s.User)
            .ToListAsync();
    }

    public async Task<IEnumerable<Post>> GetPostsByMemberIdAsync(string memberId)
    {
        return await _context.Posts
            .Include(p => p.Student)
                .ThenInclude(s => s.User)
            .Where(p => p.AuthorId == memberId)
            .ToListAsync();
    }
      public async Task<Post?> GetPostByIdAsync(string id)
        {
            return await _context.Posts
                .Include(p => p.Student)
                    .ThenInclude(s => s.User)
                .FirstOrDefaultAsync(p => p.Id == id);
        }
}
