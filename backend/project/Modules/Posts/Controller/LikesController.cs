using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using project.Modules.Posts.DTOs;
using project.Modules.Posts.Services.Interfaces;

namespace project.Modules.Posts.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class LikesController : ControllerBase
    {
        private readonly ILikesService _likesService;

        public LikesController(ILikesService likesService)
        {
            _likesService = likesService;
        }

        // GET /api/likes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LikeDto>>> GetAllLikes()
        {
            var likes = await _likesService.GetAllLikesAsync();
            return Ok(likes);
        }

        // GET /api/likes/post/{postId}
        [HttpGet("post/{postId}")]
        public async Task<ActionResult<IEnumerable<LikeDto>>> GetLikesByPost(string postId)
        {
            var likes = await _likesService.GetLikesByPostIdAsync(postId);
            return Ok(likes);
        }

        // GET /api/likes/forum/{forumQuestionId}
        [HttpGet("forum/{forumQuestionId}")]
        public async Task<ActionResult<IEnumerable<LikeDto>>> GetLikesByForumQuestion(string forumQuestionId)
        {
            var likes = await _likesService.GetLikesByForumQuestionIdAsync(forumQuestionId);
            return Ok(likes);
        }

        // GET /api/likes/member/{memberId}
        [HttpGet("member/{memberId}")]
        public async Task<ActionResult<IEnumerable<LikeDto>>> GetLikesByMember(string memberId)
        {
            var likes = await _likesService.GetLikesByStudentAsync(memberId);
            return Ok(likes);
        }
    }
}
