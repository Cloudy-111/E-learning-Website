using System;
using Microsoft.EntityFrameworkCore;
using project.Models.Posts;
using project.Modules.Posts.Repositories.Interfaces;

namespace project.Modules.Posts.Repositories;

public class DiscussionRepository : IDiscussionRepository
{
    private readonly DBContext _context;

    public DiscussionRepository(DBContext context)
    {
        _context = context;
    }

    // ✅ Lấy tất cả comment trong hệ thống
    public async Task<IEnumerable<Discussion>> GetAllCommentsAsync()
    {
        return await _context.Discussions
            .Include(d => d.Student)
                .ThenInclude(s => s.User)
            .OrderByDescending(d => d.CreatedAt)
            .ToListAsync();
    }
    
      // Hàm dùng chung cho mọi TargetType
    public async Task<IEnumerable<Discussion>> GetCommentsByTargetAsync(string targetType, string targetId)
    {
        return await _context.Discussions
            .Include(d => d.Student)
                .ThenInclude(s => s.User)
            .Where(d => d.TargetType == targetType && d.TargetTypeId == targetId)
            .OrderByDescending(d => d.CreatedAt)
            .ToListAsync();
    }

}
