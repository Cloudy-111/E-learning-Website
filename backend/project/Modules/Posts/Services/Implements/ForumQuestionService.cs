using System;
using project.Modules.Posts.DTOs;
using project.Modules.Posts.Repositories.Interfaces;
using project.Modules.Posts.Services.Interfaces;

namespace project.Modules.Posts.Services.Implements;

public class ForumQuestionService : IForumQuestionService
{
     private readonly IForumQuestionRepository _repository;

        public ForumQuestionService(IForumQuestionRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<ForumQuestionDto>> GetAllQuestionsAsync()
        {
            var questions = await _repository.GetAllAsync();

            return questions.Select(q => new ForumQuestionDto
            {
                Id = q.Id,
                Title = q.Title ?? string.Empty,
                Tags = q.Tags,
                ViewCount = q.ViewCount,
                DiscussionCount = q.DiscussionCount,
                LikeCount = q.LikeCount,
                CreatedAt = q.CreatedAt,
                StudentId = q.StudentId,
                StudentName = q.Student.User?.FullName ?? "Ẩn danh"
            });
        }

        public async Task<ForumQuestionDetailDto?> GetQuestionByIdAsync(string id)
        {
            var question = await _repository.GetByIdAsync(id);
            if (question == null) return null;


            return new ForumQuestionDetailDto
            {
                Id = question.Id,
                Title = question.Title ?? string.Empty,
                ContentJson = question.ContentJson,
                Tags = question.Tags,
                ViewCount = question.ViewCount,
                DiscussionCount = question.DiscussionCount,
                LikeCount = question.LikeCount,
                CreatedAt = question.CreatedAt,
                UpdatedAt = question.UpdatedAt,
                StudentId = question.StudentId!,
                StudentName = question.Student?.User?.FullName ?? "Ẩn danh"
            };
        }

}
