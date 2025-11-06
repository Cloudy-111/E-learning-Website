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


        // GET /api/likes/{targetType}/{targetId}
        [HttpGet("{targetType}/{targetId}")]
        public async Task<ActionResult<IEnumerable<LikeDto>>> GetLikesByTarget(string targetType, string targetId)
        {
            // targetType ví dụ: Post, ForumQuestion, Discussion, Course
            var likes = await _likesService.GetLikesByTargetAsync(targetType, targetId);
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
