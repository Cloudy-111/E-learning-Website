using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

[Route("api/courses")]
[ApiController]
public class CourseController : ControllerBase
{
    private readonly ICourseService _courseService;
    private readonly IRequestUpdateService _requestUpdateService;

    public CourseController(
        ICourseService courseService,
        IRequestUpdateService requestUpdateService)
    {
        _courseService = courseService;
        _requestUpdateService = requestUpdateService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllCourses()
    {
        var courses = await _courseService.GetAllCoursesAsync();
        return Ok(courses);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCourseById(string id)
    {
        try
        {
            var course = await _courseService.GetCourseByIdAsync(id);
            return Ok(course);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new APIResponse("error", ex.Message));
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new
            APIResponse("error", "An error occurred while retrieving the course", ex.Message));
        }
    }

    [HttpGet("search")]
    public async Task<IActionResult> GetCourse(
        [FromQuery] string? keyword,
        [FromQuery] string? category,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10
        )
    {
        try
        {
            var courses = await _courseService.GetCoursesAsync(keyword, category, page, pageSize);
            return Ok(new APIResponse("Success", "Retrieve Course Successfully", courses));
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new
            APIResponse("error", "An error occurred while retrieving the course", ex.Message));
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreateCourse([FromBody] CourseCreateDTO courseDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new APIResponse("error", "Invalid input data", ModelState));
        }

        try
        {
            await _courseService.AddCourseAsync(courseDto);
            return Ok(new APIResponse("Success", "Create new Course successfully"));
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new
            {
                message = "An error occurred while creating the course.",
                detail = ex.Message
            });
        }
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateCourse(string id, [FromBody] CourseUpdateDTO courseDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new APIResponse("error", "Invalid input data", ModelState));
        }

        try
        {
            await _courseService.UpdateCourseAsync(id, courseDto);
            return Ok(new APIResponse("success", "Update course successfully"));
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new APIResponse("error", ex.Message));
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new APIResponse("error", ex.Message));
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new APIResponse("error", "An error occurred while updating the course", ex.Message));
        }
    }

    [HttpPatch("{id}/request-publish")]
    public async Task<IActionResult> RequestPublishCourse(string id)
    {
        try
        {
            await _courseService.RequestPublishCourseAsync(id);
            return Ok(new APIResponse("success", "Course requested publish successfully"));
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new APIResponse("error", ex.Message));
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new APIResponse("error", ex.Message));
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new APIResponse("error", "An error occurred while publishing the course", ex.Message));
        }
    }

    [HttpPost("{id}/request-update")]
    public async Task<IActionResult> RequestUpdateCourse([FromBody] RequestUpdateRequestDTO requestDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new APIResponse("error", "Invalid input data", ModelState));
        }

        try
        {
            await _requestUpdateService.CreateRequestUpdateAsync(requestDto);
            return Ok(new APIResponse("success", "Course update request created successfully"));
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new APIResponse("error", ex.Message));
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new APIResponse("error", "An error occurred while creating the update request", ex.Message));
        }
    }
}