using Microsoft.AspNetCore.Mvc;

[Route("api/course-contents/{courseContentId}/lessons")]
[ApiController]
public class LessonController : ControllerBase
{
    private readonly ILessonService _lessonService;

    public LessonController(ILessonService lessonService)
    {
        _lessonService = lessonService;
    }

    [HttpGet]
    public async Task<IActionResult> GetLessonsByCourseContentId(string courseContentId)
    {
        try
        {
            var lessons = await _lessonService.GetLessonsByCourseContentIdAsync(courseContentId);
            return Ok(lessons);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new
            {
                message = "An error occurred while retrieving lessons.",
                detail = ex.Message
            });
        }
    }

    [HttpGet("{lessonId}")]
    public async Task<IActionResult> GetLessonById(string courseContentId, string lessonId)
    {
        try
        {
            var lesson = await _lessonService.GetLessonByIdAsync(courseContentId, lessonId);
            return Ok(lesson);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new
            APIResponse("error", "An error occurred while retrieving the lesson", ex.Message));
        }
    }

    [HttpPost]
    public async Task<IActionResult> AddLesson(string courseContentId, [FromBody] LessonCreateDTO lessonDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new APIResponse("error", "Invalid input data", ModelState));
        }

        try
        {
            await _lessonService.AddLessonAsync(courseContentId, lessonDto);
            return Ok(new { message = "Lesson created successfully." });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new
            {
                message = "An error occurred while creating the lesson.",
                detail = ex.Message
            });
        }
    }
}