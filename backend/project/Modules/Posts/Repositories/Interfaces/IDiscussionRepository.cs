using System;
using project.Models.Posts;

namespace project.Modules.Posts.Repositories.Interfaces;

public interface IDiscussionRepository
{
   //  Lấy tất cả comment trong hệ thống
    Task<IEnumerable<Discussion>> GetAllCommentsAsync();
  //  Lấy = comment của một bài Post
  Task<IEnumerable<Discussion>> GetCommentsByPostIdAsync(string postId);

  //  Lấy = comment của một câu thảo luận
  Task<IEnumerable<Discussion>> GetCommentsByForumQuestionIdAsync(string forumQuestionId);

  // Lấy = comment của một course
  Task<IEnumerable<Discussion>> GetCommentsByCourseIdAsync(string courseId);


  
}
