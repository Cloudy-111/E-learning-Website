using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

[Route("api/[controller]")]
[ApiController]
public class CourseController : ControllerBase
{
    private readonly ICourseService _courseService;

    public CourseController(ICourseService courseService)
    {
        _courseService = courseService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllCourses()
    {
        var courses = await _courseService.GetAllCoursesAsync();
        return Ok(courses);
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateCourse([FromBody] CourseCreateDTO courseDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            await _courseService.AddCourseAsync(courseDto);
            return Ok(new { message = "Create new exam successfully" });
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

    [HttpPatch("update-course/{id}")]
    public async Task<IActionResult> UpdateCourse(string id, [FromBody] CourseUpdateDTO courseDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            await _courseService.UpdateCourseAsync(courseDto);
            return Ok(new { message = "Update course successfully" });
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }
}