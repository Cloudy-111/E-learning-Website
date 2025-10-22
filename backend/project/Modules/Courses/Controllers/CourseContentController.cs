using Microsoft.AspNetCore.Mvc;

[Route("api/courses/{courseId}/content")]
[ApiController]
public class CourseContentController : ControllerBase
{
    private readonly ICourseContentService _courseContentService;

    public CourseContentController(ICourseContentService courseContentService)
    {
        _courseContentService = courseContentService;
    }

    [HttpPost]
    public async Task<IActionResult> AddCourseContent(string courseId, [FromBody] CourseContentCreateDTO contentDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new APIResponse("error", "Invalid input data", ModelState));
        }

        try
        {
            await _courseContentService.AddCourseContentAsync(courseId, contentDto);
            return Ok(new APIResponse("success", "Course content added successfully"));
        }
        catch (KeyNotFoundException knfEx)
        {
            return NotFound(new APIResponse("error", knfEx.Message));
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new
            APIResponse("error", "An error occurred while adding course content", ex.Message));
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetCourseContentByCourseId(string courseId)
    {
        try
        {
            var contentDto = await _courseContentService.GetCourseContentInformationDTOAsync(courseId);
            return Ok(contentDto);
        }
        catch (KeyNotFoundException knfEx)
        {
            return NotFound(new APIResponse("error", knfEx.Message));
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new
            APIResponse("error", "An error occurred while retrieving course content", ex.Message));
        }
    }
}