using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using project.Models.Posts.DTOs;
using project.Modules.Posts.Services.Interfaces;

namespace project.Modules.Posts.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostsController : ControllerBase
    {
        private readonly IPostService _postService;

        public PostsController(IPostService postService)
        {
            _postService = postService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPosts()
        {
            var posts = await _postService.GetAllPostsAsync();
            return Ok(posts);
        }

        // GET: /api/posts/member/{memberId}
        [HttpGet("member/{memberId}")]
        public async Task<IActionResult> GetPostsByMemberId(string memberId)
        {
            var posts = await _postService.GetPostsByMemberIdAsync(memberId);

            if (!posts.Any())
                return NotFound(new { message = "Member chưa có bài viết nào." });

            return Ok(posts);
        }
        

         // GET: /api/posts/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPostById(string id)
        {
            var post = await _postService.GetPostByIdAsync(id);
            if (post == null)
                return NotFound(new { message = "Không tìm thấy bài viết." });

            return Ok(post);
        }
    }
}
