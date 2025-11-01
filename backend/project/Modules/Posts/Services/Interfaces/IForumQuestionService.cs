using System;
using project.Modules.Posts.DTOs;

namespace project.Modules.Posts.Services.Interfaces;

public interface IForumQuestionService
{
    Task<IEnumerable<ForumQuestionDto>> GetAllQuestionsAsync();
    Task<ForumQuestionDetailDto?> GetQuestionByIdAsync(string id);
}
