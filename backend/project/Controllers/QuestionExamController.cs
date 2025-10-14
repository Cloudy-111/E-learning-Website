using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class QuestionExamController : ControllerBase
{
    private readonly IQuestionExamService _questionExamService;
    private readonly IExamService _examService;
    public QuestionExamController(
        IQuestionExamService questionExamService,
        IExamService examService
    )
    {
        _examService = examService;
        _questionExamService = questionExamService;
    }

    [HttpPost("create-question-exam")]
    public async Task<IActionResult> CreateQuestionExam([FromBody] CreateQuestionExamDTO questionExam)
    {
        var newQuestionExam = new QuestionExam
        {
            ExamId = questionExam.ExamId,
            Content = questionExam.Content,
            ImageUrl = questionExam.ImageUrl,
            Type = questionExam.Type,
            Exaplanation = questionExam.Exaplanation,
            Score = questionExam.Score,
            IsRequired = questionExam.IsRequired,
            // For versioning
            IsNewest = true,
            ParentQuestionId = null
        };
        try
        {
            await _questionExamService.AddQuestionToExamAsync(newQuestionExam);
            return Ok(new { message = "Question added to exam successfully" });
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
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

    [HttpGet("questions-for-doing-exam")]
    public async Task<IActionResult> GetQuestionsForDoingExam(string examId)
    {
        try
        {
            var questionExams = await _questionExamService.GetQuestionsByExamIdForDoingExamAsync(examId);
            return Ok(questionExams);
        }
        catch
        {
            return NotFound(new { message = $"Not found questions with {examId}" });
        }
    }

    [HttpGet("questions-for-review-submission")]
    public async Task<IActionResult> GetQuestionsForReviewSubmission(string examId)
    {
        try
        {
            var questionExams = await _questionExamService.GetQuestionsByExamIdForReviewSubmissionAsync(examId);
            return Ok(questionExams);
        }
        catch
        {
            return NotFound(new { message = $"Not found questions with {examId}" });
        }
    }

    [HttpGet("for-exam/{id}")]
    public async Task<IActionResult> GetQuestionForDoingExamById(string id)
    {
        try
        {
            var questionExam = await _questionExamService.GetQuestionInExamForDoingExamAsync(id);
            return Ok(questionExam);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }

    [HttpGet("for-review/{id}")]
    public async Task<IActionResult> GetQuestionForReviewExamById(string id)
    {
        try
        {
            var questionExam = await _questionExamService.GetQuestionInExamForReviewSubmissionAsync(id);
            return Ok(questionExam);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }
}
