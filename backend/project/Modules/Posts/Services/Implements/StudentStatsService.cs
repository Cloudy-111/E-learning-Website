using System;
using project.Modules.Posts.DTOs;
using project.Modules.Posts.Repositories.Interfaces;
using project.Modules.Posts.Services.Interfaces;

namespace project.Modules.Posts.Services.Implements;

public class StudentStatsService : IStudentStatsService
{
    private readonly IStudentStatsRepository _repo;

    public StudentStatsService(IStudentStatsRepository repo)
    {
        _repo = repo;
    }

     public async Task<List<StudentStatsDto>> GetStatsAsync(int? month)
    {
        return await _repo.GetStudentStatsAsync(month);
    }
}
