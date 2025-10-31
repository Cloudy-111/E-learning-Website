using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using project.Modules.Posts.DTOs;
using project.Modules.Posts.Services.Interfaces;

namespace project.Modules.Posts.Controller
{
    [Route("api/members/{studentId}/comments")]
    [ApiController]
    public class DiscussionController : ControllerBase
    {
        private readonly IDiscussionService _discussionService;

        public DiscussionController(IDiscussionService discussionService)
        {
            _discussionService = discussionService;
        }

        

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DiscussionDto>>> GetCommentsByStudentId(string studentId)
        {
            var discussions = await _discussionService.GetDiscussionsByStudentIdAsync(studentId);

            if (!discussions.Any())
                return NotFound(new { Message = "No comments found for this member." });

            return Ok(discussions);
        }
    }
}
