using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
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

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<PostDto>> CreatePost([FromBody] PostCreateDto dto)
        {
            // Lấy StudentId từ claim
            var authorId = User.FindFirst("StudentId")?.Value;

            // Lấy tên user
            var authorName = User.FindFirst(ClaimTypes.Name)?.Value;

            if (authorId == null || authorName == null)
                return Unauthorized("User info not found in token");

            var postDto = await _postService.CreatePostAsync(dto, authorId, authorName);
            return Ok(postDto);
        }


        // ======================= Update Post =======================
        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<PostDto>> UpdatePost(string id, [FromBody] PostUpdateDto dto)
        {
            var authorId = User.FindFirst("StudentId")?.Value;
            if (string.IsNullOrEmpty(authorId))
                return Unauthorized("User not found in token");

            try
            {
                var updatedPost = await _postService.UpdatePostAsync(id, dto, authorId);
                return Ok(updatedPost);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // ======================= Soft Delete Post =======================
        [Authorize]
        [HttpDelete("deletesoft/{id}")]
        public async Task<ActionResult> SoftDeletePost(string id)
        {
            var authorId = User.FindFirst("StudentId")?.Value;
            if (string.IsNullOrEmpty(authorId))
                return Unauthorized("User not found in token");

            try
            {
                await _postService.SoftDeletePostAsync(id, authorId);
                return Ok(new { message = "Post soft-deleted successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // ======================= Hard Delete Post =======================
        [Authorize]
        [HttpDelete("deletehard/{id}")]
        public async Task<ActionResult> HardDeletePost(string id)
        {
            var authorId = User.FindFirst("StudentId")?.Value;
            if (string.IsNullOrEmpty(authorId))
                return Unauthorized("User not found in token");

            try
            {
                await _postService.HardDeletePostAsync(id, authorId);
                return Ok(new { message = "Post permanently deleted successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [Authorize]
        [HttpPatch("restore/{id}")]
        public async Task<ActionResult> RestorePost(string id)
        {
            var authorId = User.FindFirst("StudentId")?.Value; // hoặc ClaimTypes.NameIdentifier nếu lưu UserId
            if (string.IsNullOrEmpty(authorId))
                return Unauthorized("User info not found in token");

            try
            {
                var postDto = await _postService.RestorePostAsync(id, authorId);
                return Ok(new { message = "Post restored successfully", post = postDto });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }




        [Authorize]
        [HttpGet("PostIsdeletedSoft")]
        public async Task<ActionResult<IEnumerable<PostDto>>> GetDeletedPosts()
        {
            var authorId = User.FindFirst("StudentId")?.Value;
            if (string.IsNullOrEmpty(authorId))
                return Unauthorized("User not found in token");

            try
            {
                var deletedPosts = await _postService.GetDeletedPostsByAuthorAsync(authorId);
                return Ok(deletedPosts);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }


    }


}
