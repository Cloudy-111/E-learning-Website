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

    public async Task<IEnumerable<Post>> GetPostsByStudentIdAsync(string studentId)
    {
        return await _context.Posts
            .Where(p => p.AuthorId == studentId)
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();
    }
}
