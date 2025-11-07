using System;
using Microsoft.EntityFrameworkCore;
using project.Models.Posts;
using project.Modules.Posts.Repositories.Interfaces;

namespace project.Modules.Posts.Repositories.Implements;

public class ForumQuestionRepository : IForumQuestionRepository
{
    private readonly DBContext _context;

    public ForumQuestionRepository(DBContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<ForumQuestion>> GetAllAsync()
    {
        return await _context.ForumQuestions
        .Where(q => !q.IsDeleted)
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
            .FirstOrDefaultAsync(q => q.Id == id && !q.IsDeleted);
    }

    // Nếu muốn lấy cả câu hỏi đã bị xóa (để xử lý Delete/Restore)
    public async Task<ForumQuestion?> GetByIdAllowDeletedAsync(string id)
    {
        return await _context.ForumQuestions
            .Include(q => q.Student)
            .ThenInclude(s => s.User)
            .FirstOrDefaultAsync(q => q.Id == id);
    }
    
    public async Task<IEnumerable<ForumQuestion>> GetDeletedByStudentAsync(string studentId)
{
    return await _context.ForumQuestions
        .Where(q => q.IsDeleted && q.StudentId == studentId) 
        .Include(q => q.Student)
        .ThenInclude(s => s.User)
        .OrderByDescending(q => q.DeletedAt)
        .ToListAsync();
}

    public async Task AddAsync(ForumQuestion question) =>
       await _context.ForumQuestions.AddAsync(question);

    public async Task UpdateAsync(ForumQuestion question) =>
        _context.ForumQuestions.Update(question);

    public async Task SaveChangesAsync() =>
        await _context.SaveChangesAsync();

     public void Delete(ForumQuestion question) =>
            _context.ForumQuestions.Remove(question);


}
