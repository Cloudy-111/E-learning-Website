using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using project.Models.Posts.DTOs;
using project.Modules.Posts.DTOs;
using project.Modules.Posts.Services.Interfaces;

namespace project.Modules.Posts.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostsController : ControllerBase
    {
        private readonly IPostService _postService;
        private readonly IDiscussionService _discussionService;

        public PostsController(IPostService postService, IDiscussionService discussionService)
        {
            _postService = postService;
            _discussionService = discussionService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostDto>>> GetAllPosts()
    {
        var posts = await _postService.GetAllPostsAsync();
        return Ok(posts);
    }

        // GET: /api/posts/member/{memberId}
        [HttpGet("member/{memberId}")]
         public async Task<ActionResult<IEnumerable<PostDto>>> GetPostsByMemberId(string memberId)
        {
            var posts = await _postService.GetPostsByMemberIdAsync(memberId);

            if (!posts.Any())
                return NotFound(new { message = "Thành viên này chưa có bài viết nào." });

            return Ok(posts);
        }


        // GET: /api/posts/{id}
        [HttpGet("{id}")]
         public async Task<ActionResult<PostDetailDto>> GetPostById(string id)
        {
            var post = await _postService.GetPostByIdAsync(id);
            if (post == null)
                return NotFound(new { message = "Không tìm thấy bài viết." });

            return Ok(post);
        }

        // GET /api/posts/search?tag=LINQ
        [HttpGet("search")]
       public async Task<ActionResult<IEnumerable<PostDto>>> SearchPostsByTag([FromQuery] string tag)
        {
            if (string.IsNullOrWhiteSpace(tag))
                return BadRequest(new { message = "Thiếu tham số tag để tìm kiếm." });

            var posts = await _postService.SearchPostsByTagAsync(tag);

            if (!posts.Any())
                return NotFound(new { message = $"Không tìm thấy bài viết nào có tag '{tag}'." });

            return Ok(posts);
        }

        //  GET /api/posts/{postId}/comments
        [HttpGet("{postId}/comments")]
        public async Task<ActionResult<IEnumerable<DiscussionDto>>> GetCommentsByPost(string postId)
        {
            var comments = await _discussionService.GetCommentsByPostIdAsync(postId);
            if (!comments.Any())
                return NotFound(new { message = "Không có bình luận nào cho bài viết này." });

            return Ok(comments);
        }

    }
}
