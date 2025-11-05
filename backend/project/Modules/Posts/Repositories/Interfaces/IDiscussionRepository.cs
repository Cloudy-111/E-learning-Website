using System;
using project.Models.Posts;

namespace project.Modules.Posts.Repositories.Interfaces;

public interface IDiscussionRepository
{
  //  Lấy tất cả comment trong hệ thống
  Task<IEnumerable<Discussion>> GetAllCommentsAsync();
    
  //  Lấy = comment của một bài Post hoặc ForumQuestion hoặc Course
  Task<IEnumerable<Discussion>> GetCommentsByTargetAsync(string targetType, string targetId);
  

  
}
