using System;
using project.Models.Posts;

namespace project.Modules.Posts.Repositories.Interfaces;

public interface IForumQuestionRepository
{

    // Lấy tất cả các câu thảo luận
    Task<IEnumerable<ForumQuestion>> GetAllAsync();


    // Lấy chi tiết câu thảo luận
    Task<ForumQuestion?> GetByIdAsync(string id);

}
