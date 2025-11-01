using System;
using project.Modules.Posts.DTOs;

namespace project.Modules.Posts.Services.Interfaces;

public interface IDiscussionService
{
  // ✅ Lấy tất cả comment trong hệ thống
  Task<IEnumerable<DiscussionDto>> GetAllCommentsAsync();

  // Lấy = comment của một bài Post
  Task<IEnumerable<DiscussionDto>> GetCommentsByPostIdAsync(string postId);

  // Lấy = comment của một câu thảo luận
  Task<IEnumerable<DiscussionDto>> GetCommentsByForumQuestionIdAsync(string forumQuestionId);
  
   // Lấy = comment của một course
  Task<IEnumerable<DiscussionDto>> GetCommentsByCourseIdAsync(string courseId);
}
