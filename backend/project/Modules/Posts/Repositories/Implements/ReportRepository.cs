using System;
using Microsoft.EntityFrameworkCore;
using project.Models.Posts;
using project.Modules.Posts.Repositories.Interfaces;

namespace project.Modules.Posts.Repositories.Implements;

public class ReportRepository : IReportRepository
{

     private readonly DBContext _context;

    public ReportRepository(DBContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Reports>> GetAllAsync()
    {
        return await _context.Reports
            .Include(r => r.Student)
            .ThenInclude(s => s.User)
            .ToListAsync();
    }

    public async Task<Reports?> GetByIdAsync(string id)
    {
        return await _context.Reports
            .Include(r => r.Student)
            .ThenInclude(s => s.User)
            .FirstOrDefaultAsync(r => r.Id == id);
    }

}
