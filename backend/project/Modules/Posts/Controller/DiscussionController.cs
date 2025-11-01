using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using project.Modules.Posts.DTOs;
using project.Modules.Posts.Services.Interfaces;

namespace project.Modules.Posts.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiscussionController : ControllerBase
    {
        private readonly IDiscussionService _discussionService;

        public DiscussionController(IDiscussionService discussionService)
        {
            _discussionService = discussionService;
        }


    // ✅ GET /api/comments
    [HttpGet]
    public async Task<ActionResult<IEnumerable<DiscussionDto>>> GetAllComments()
    {
        var comments = await _discussionService.GetAllCommentsAsync();

        if (!comments.Any())
            return NotFound(new { message = "Không có bình luận nào trong hệ thống." });

        return Ok(comments);
    }
        


    }
}
