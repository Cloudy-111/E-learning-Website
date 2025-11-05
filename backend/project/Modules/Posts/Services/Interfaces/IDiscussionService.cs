using System;
using project.Modules.Posts.DTOs;

namespace project.Modules.Posts.Services.Interfaces;

public interface IDiscussionService
{
  // ✅ Lấy tất cả comment trong hệ thống
  Task<IEnumerable<DiscussionDto>> GetAllCommentsAsync();

  Task<IEnumerable<DiscussionDto>> GetCommentsByTargetAsync(string targetType, string targetId);
}
