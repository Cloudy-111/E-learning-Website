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

        public async Task<IEnumerable<Discussion>> GetDiscussionsByStudentIdAsync(string studentId)
        {
            return await _context.Discussions
                .Where(d => d.StudentId == studentId)
                .OrderByDescending(d => d.CreatedAt)
                .ToListAsync();
        }

}
