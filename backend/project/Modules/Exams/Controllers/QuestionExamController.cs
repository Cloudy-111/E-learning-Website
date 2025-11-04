using Microsoft.AspNetCore.Mvc;

[Route("api/{examId}/question-exams")]
[ApiController]
public class QuestionExamController : ControllerBase
{
    private readonly IQuestionExamService _questionExamService;
    public QuestionExamController(
        IQuestionExamService questionExamService
    )
    {
        _questionExamService = questionExamService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateQuestionExam(string examId, [FromBody] CreateQuestionExamDTO questionExam)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new APIResponse("error", "Invalid input data", ModelState));
        }
        try
        {
            await _questionExamService.AddQuestionToExamAsync(examId, questionExam);
            return Ok(new APIResponse("Success", "Create new QuestionExam successfully"));
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
            return StatusCode(500, new APIResponse("error", "An error occurred while creating the QuestionExam", ex.Message));
        }
    }

    // [HttpGet("{id}")]
    // public async Task<IActionResult> GetQuestionExamById(string id)
    // {
    //     try
    //     {
    //         var questionExam = await _questionExamService.GetQuestionInExamAsync(id);
    //         return Ok(questionExam);
    //     }
    //     catch (KeyNotFoundException ex)
    //     {
    //         return NotFound(new { message = ex.Message });
    //     }
    // }

    [HttpGet("for-exam")]
    public async Task<IActionResult> GetQuestionsForDoingExam(string examId)
    {
        try
        {
            var questionExams = await _questionExamService.GetQuestionsByExamIdForDoingExamAsync(examId);
            return Ok(new APIResponse("success", "Get questions successfully", questionExams));
        }
        catch
        {
            return NotFound(new APIResponse("error", $"Not found questions with {examId}"));
        }
    }

    [HttpGet("for-review")]
    public async Task<IActionResult> GetQuestionsForReviewSubmission(string examId)
    {
        try
        {
            var questionExams = await _questionExamService.GetQuestionsByExamIdForReviewSubmissionAsync(examId);
            return Ok(new APIResponse("success", "Get questions successfully", questionExams));
        }
        catch
        {
            return NotFound(new APIResponse("error", $"Not found questions with {examId}"));
        }
    }

    [HttpGet("for-exam/{id}")]
    public async Task<IActionResult> GetQuestionForDoingExamById(string id)
    {
        try
        {
            var questionExam = await _questionExamService.GetQuestionInExamForDoingExamAsync(id);
            return Ok(new APIResponse("success", "Get question successfully", questionExam));
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new APIResponse("error", ex.Message));
        }
    }

    [HttpGet("for-review/{id}")]
    public async Task<IActionResult> GetQuestionForReviewExamById(string id)
    {
        try
        {
            var questionExam = await _questionExamService.GetQuestionInExamForReviewSubmissionAsync(id);
            return Ok(new APIResponse("success", "Get question successfully", questionExam));
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new APIResponse("error", ex.Message));
        }
    }

    [HttpDelete("{questionExamId}")]
    public async Task<IActionResult> DeleteQuestionExamAsync(string examId, string questionExamId)
    {
        try
        {
            await _questionExamService.DeleteQuestionExamAsync(examId, questionExamId);
            return Ok(new APIResponse("success", "Delete question successfully"));
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new
            APIResponse("error", "An error occurred while Delete question", ex.Message));
        }
    }
}
