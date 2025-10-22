using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

[Route("api/courses")]
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
}