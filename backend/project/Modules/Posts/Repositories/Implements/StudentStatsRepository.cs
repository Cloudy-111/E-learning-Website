using System;
using Microsoft.EntityFrameworkCore;
using project.Data; // <-- Thêm using cho namespace chứa DbContext của bạn
using project.Modules.Posts.DTOs;
using project.Modules.Posts.Repositories.Interfaces;

namespace project.Modules.Posts.Repositories.Implements;

public class StudentStatsRepository : IStudentStatsRepository
{
    private readonly DBContext _db;

    public StudentStatsRepository(DBContext db)
    {
        _db = db;
    }


    public async Task<List<StudentStatsDto>> GetStudentStatsAsync(int? month)
    {
        var query = _db.Students
            .Select(s => new StudentStatsDto
            {
                StudentId = s.StudentId,
                FullName = s.User.FullName,

                // Tổng tất cả thời gian
                TotalPosts = s.Posts.Count(),
                TotalDiscussions = s.Discussions.Count(),
                TotalForumQuestions = s.ForumQuestions.Count(),

                // Theo tháng
                MonthPosts = month == null
                    ? 0
                    : s.Posts.Count(p => p.CreatedAt.Month == month),

                MonthDiscussions = month == null
                    ? 0
                    : s.Discussions.Count(d => d.CreatedAt.Month == month),

                MonthForumQuestions = month == null
                    ? 0
                    : s.ForumQuestions.Count(f => f.CreatedAt.Month == month)
            });

        return await query
            .OrderByDescending(x => month == null ? x.TotalPosts : x.MonthPosts)
            .ThenByDescending(x => month == null ? x.TotalDiscussions : x.MonthDiscussions)
            .ToListAsync();
    }

    
}
