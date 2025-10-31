using System;
using project.Modules.Posts.DTOs;

namespace project.Modules.Posts.Services.Interfaces;

public interface IDiscussionService
{
  Task<IEnumerable<DiscussionDto>> GetDiscussionsByStudentIdAsync(string studentId);
}
