using System;
using project.Models.Posts;

namespace project.Modules.Posts.Repositories.Interfaces;

public interface IReportRepository
{
    Task<IEnumerable<Reports>> GetAllAsync();
    Task<Reports?> GetByIdAsync(string id);

}
