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

    public async Task<IEnumerable<Discussion>> GetCommentsByPostIdAsync(string postId)
    {
        return await _context.Discussions
            .Include(d => d.Student)
                .ThenInclude(s => s.User)
            .Where(d =>
                d.TargetType != null &&
                d.TargetType.ToLower() == "Post" &&
                d.TargetTypeId == postId)
            .OrderByDescending(d => d.CreatedAt)
            .ToListAsync();
    }

    public async Task<IEnumerable<Discussion>> GetCommentsByForumQuestionIdAsync(string forumQuestionId)
    {
        return await _context.Discussions
            .Include(d => d.Student)
                .ThenInclude(s => s.User)
                .Where(d =>
                    d.TargetType != null &&
                    d.TargetType.ToLower() == "ForumQuestion" &&
                    d.TargetTypeId == forumQuestionId)
            .OrderByDescending(d => d.CreatedAt)
            .ToListAsync();
    }
    public async Task<IEnumerable<Discussion>> GetCommentsByCourseIdAsync(string courseId)
    {
        return await _context.Discussions
            .Include(d => d.Student)
                .ThenInclude(s => s.User)
                .Where(d =>
                    d.TargetType != null &&
                    d.TargetType.ToLower() == "Course" &&
                    d.TargetTypeId == courseId)
            .OrderByDescending(d => d.CreatedAt)
            .ToListAsync();

    }

}
