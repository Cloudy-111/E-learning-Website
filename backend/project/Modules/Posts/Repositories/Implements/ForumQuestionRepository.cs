using System;
using Microsoft.EntityFrameworkCore;
using project.Models.Posts;
using project.Modules.Posts.Repositories.Interfaces;

namespace project.Modules.Posts.Repositories.Implements;

public class ForumQuestionRepository: IForumQuestionRepository
{
    private readonly DBContext _context;

        public ForumQuestionRepository(DBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ForumQuestion>> GetAllAsync()
        {
            return await _context.ForumQuestions
                .Include(q => q.Student)
                .ThenInclude(s => s.User) 
                .OrderByDescending(q => q.CreatedAt)
                .ToListAsync();
        }

        public async Task<ForumQuestion?> GetByIdAsync(string id)
        {
            return await _context.ForumQuestions
                .Include(q => q.Student)
                .ThenInclude(s => s.User) 
                .FirstOrDefaultAsync(q => q.Id == id);
        }

}
