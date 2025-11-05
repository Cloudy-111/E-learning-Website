using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using project.Modules.Posts.DTOs;
using project.Modules.Posts.Services.Interfaces;

namespace project.Modules.Posts.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ForumQuestionController : ControllerBase
    {
        private readonly IForumQuestionService _forumService;
        private readonly IDiscussionService _discussionService;

        public ForumQuestionController(IForumQuestionService forumService, IDiscussionService discussionService)
        {
            _forumService = forumService;
            _discussionService = discussionService;
        }
         /// GET /api/forum/questions
        /// Lấy danh sách câu hỏi
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ForumQuestionDto>>> GetAllQuestions()
        {
            var questions = await _forumService.GetAllQuestionsAsync();
            return Ok(questions);
        }

        /// <summary>
        /// GET /api/forum/questions/{id}
        /// Lấy chi tiết câu hỏi
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<ForumQuestionDetailDto>> GetQuestionById(string id)
        {
            var question = await _forumService.GetQuestionByIdAsync(id);
            if (question == null)
                return NotFound(new { Message = "Question not found" });

            return Ok(question);
        }



    }
}
