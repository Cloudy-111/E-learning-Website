using System;
using Microsoft.EntityFrameworkCore;
using project.Models.Posts;
using project.Modules.Posts.Repositories.Interfaces;

namespace project.Modules.Posts.Repositories.Implements;

public class LikesRepository : ILikesRepository
{
    private readonly DBContext _context;

    public LikesRepository(DBContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Likes>> GetAllLikesAsync()
    {
        return await _context.Likes
            .Include(l => l.Student)
            .ThenInclude(s => s.User)
            .ToListAsync();
    }

    public async Task<IEnumerable<Likes>> GetLikesByPostIdAsync(string postId)
    {
        return await _context.Likes
            .Include(l => l.Student)
            .ThenInclude(s => s.User)
            .Where(l => l.TargetType == "Post" && l.TargetId == postId)
            .ToListAsync();
    }

    public async Task<IEnumerable<Likes>> GetLikesByForumQuestionIdAsync(string forumQuestionId)
    {
        return await _context.Likes
            .Include(l => l.Student)
            .ThenInclude(s => s.User)
            .Where(l => l.TargetType == "ForumQuestion" && l.TargetId == forumQuestionId)
            .ToListAsync();
    }

    public async Task<IEnumerable<Likes>> GetLikesByStudentAsync(string studentId)
    {
        return await _context.Likes
            .Include(l => l.Student)
            .ThenInclude(s => s.User)
            .Where(l => l.StudentId == studentId)
            .ToListAsync();
    }


}
