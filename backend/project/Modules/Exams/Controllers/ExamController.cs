using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Route("api/exams")]
[ApiController]
public class ExamController : ControllerBase
{
    private readonly IExamService _examService;
    public ExamController(IExamService examService)
    {
        _examService = examService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllExam()
    {
        var listExams = await _examService.GetAllExamsAsync();
        return Ok(listExams);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetExamById(string id)
    {
        try
        {
            var exam = await _examService.GetExamByIdAsync(id);
            return Ok(exam);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new APIResponse("error", ex.Message));
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new
            APIResponse("error", "An error occurred while retrieving the Exam", ex.Message));
        }
    }

    [Authorize(Roles = "Teacher")]
    [HttpPost]
    public async Task<IActionResult> CreateNewExam([FromBody] CreateExamDTO exam)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new APIResponse("error", "Invalid input data", ModelState));
        }

        try
        {
            var userId = User.FindFirst("userId")?.Value;
            await _examService.AddExamAsync(userId, exam);
            return Ok(new APIResponse("Success", "Create new Exam successfully"));
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new
            APIResponse("error", "An error occurred while creating the exam", ex.Message));
        }
    }

    [Authorize(Roles = "Teacher")]
    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateExam(string id, [FromBody] UpdateExamDTO exam)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new APIResponse("error", "Invalid input data", ModelState));
        }

        try
        {
            var userId = User.FindFirst("userId")?.Value;
            await _examService.UpdateExamAsync(userId, id, exam);
            return Ok(new APIResponse("Success", "Update exam successfully"));
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new APIResponse("error", ex.Message));
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new
            APIResponse("error", "An error occurred while updating the exam", ex.Message));
        }
    }

    [Authorize(Roles = "Teacher")]
    [HttpPost("{id}/order")]
    public async Task<IActionResult> UpdateOrderQuestionInExam(string id, [FromBody] List<QuestionExamOrderDTO> questionOrders)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new APIResponse("error", "Invalid input data", ModelState));
        }
        try
        {
            var userId = User.FindFirst("userId")?.Value;
            await _examService.UpdateOrderQuestionInExamAsync(userId, id, questionOrders);
            return Ok(new APIResponse("success", "Update question order successfully"));
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new APIResponse("error", ex.Message));
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new APIResponse("error", ex.Message));
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new
            APIResponse("error", "An error occurred while updating question order", ex.Message));
        }
    }

    [HttpGet("course/{courseId}")]
    public async Task<IActionResult> GetExamsInCourseAsync(string courseId)
    {
        try
        {
            var exams = await _examService.GetExamsInCourseAsync(courseId);
            return Ok(new APIResponse("success", "Retrieve Exams in course Successfully", exams));
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new APIResponse("error", ex.Message));
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new
            APIResponse("error", "An error occurred while Retrieve Exams", ex.Message));
        }
    }

    [HttpGet("lesson/{lessonId}")]
    public async Task<IActionResult> GetExamsInLessonAsync(string lessonId)
    {
        try
        {
            var studentId = User.FindFirst("studentId")?.Value;
            var exams = await _examService.GetExamsInLessonAsync(studentId, lessonId);
            return Ok(new APIResponse("success", "Retrieve Exams in lesson Successfully", exams));
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new APIResponse("error", ex.Message));
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new
            APIResponse("error", "An error occurred while Retrieve Exams", ex.Message));
        }
    }

    [Authorize(Roles = "Teacher")]
    [HttpPost("{examId}/upload")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> UploadExamExcel([FromForm] UploadExamExcelRequest request)
    {
        try
        {
            var userId = User.FindFirst("userId")?.Value;
            await _examService.UploadExamExcelAsync(userId, request);
            return Ok(new APIResponse("success", "Upload exam excel successfully"));
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new APIResponse("error", ex.Message));
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new
            APIResponse("error", "An error occurred while uploading exam excel", ex.Message));
        }
    }
}