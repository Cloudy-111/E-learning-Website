using System;
using project.Models.Posts;

namespace project.Modules.Posts.Repositories.Interfaces;

public interface IDiscussionRepository
{
  //  Lấy tất cả comment của thành viên
 Task<IEnumerable<Discussion>> GetDiscussionsByStudentIdAsync(string studentId);
}
