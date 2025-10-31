using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using project.Models.Posts.DTOs;
using project.Modules.Posts.Services.Interfaces;

namespace project.Modules.Posts.Controller
{
    [Route("api/members/{studentId}/posts")]
    [ApiController]
    public class PostController : ControllerBase
    {
         private readonly IPostService _postService;

        public PostController(IPostService postService)
        {
            _postService = postService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostDto>>> GetPostsByStudentId(string studentId)
        {
            var posts = await _postService.GetPostsByStudentIdAsync(studentId);

            if (!posts.Any())
                return NotFound(new { Message = "No posts found for this member." });

            return Ok(posts);
        }
    }
}
