using Microsoft.AspNetCore.Mvc;

[Route("api/course-contents/{courseContentId}/lessons")]
[ApiController]
public class LessonController : ControllerBase
{
    private readonly ILessonService _lessonService;
    private readonly IRequestUpdateService _requestUpdateService;

    public LessonController(
        ILessonService lessonService,
        IRequestUpdateService requestUpdateService)
    {
        _lessonService = lessonService;
        _requestUpdateService = requestUpdateService;
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

    [HttpPatch("{lessonId}")]
    public async Task<IActionResult> UpdateLesson(string courseContentId, string lessonId, [FromBody] LessonUpdateDTO lessonDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new APIResponse("error", "Invalid input data", ModelState));
        }

        try
        {
            await _lessonService.UpdateLessonAsync(courseContentId, lessonId, lessonDto);
            return Ok(new { message = "Lesson updated successfully." });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new
            {
                message = "An error occurred while updating the lesson.",
                detail = ex.Message
            });
        }
    }

    [HttpPost("order")]
    public async Task<IActionResult> UpdateLessonOrder(string courseContentId, [FromBody] List<LessonOrderDTO> lessonOrders)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new APIResponse("error", "Invalid input data", ModelState));
        }

        try
        {
            await _lessonService.UpdateOrderLessonsAsync(courseContentId, lessonOrders);
            return Ok(new { message = "Lesson orders updated successfully." });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new
            APIResponse("error", "An error occurred while updating lesson orders", ex.Message));
        }
    }

    [HttpPost("{lessonId}/request-update")]
    public async Task<IActionResult> RequestUpdateLesson([FromBody] RequestUpdateRequestDTO requestDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new APIResponse("error", "Invalid input data", ModelState));
        }

        try
        {
            await _requestUpdateService.CreateRequestUpdateAsync(requestDto);
            return Ok(new { message = "Lesson update request created successfully." });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new
            {
                message = "An error occurred while creating the lesson update request.",
                detail = ex.Message
            });
        }
    }
}