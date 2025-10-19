using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class SubmitController : ControllerBase
{
    private readonly ISubmissionExamService _submissionExamService;
    private readonly ISubmissionAnswerService _submissionAnswerService;

    public SubmitController(
        ISubmissionExamService submissionExamService,
        ISubmissionAnswerService submissionAnswerService
    )
    {
        _submissionExamService = submissionExamService;
        _submissionAnswerService = submissionAnswerService;
    }

    // API go here
    [HttpPost("submit-exam")]
    public async Task<IActionResult> SubmitExam([FromBody] SubmissionExamSubmitDTO submissionExamDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            // Create a new SubmissionExam
            await _submissionExamService.CreateSubmissionExamAsync(submissionExamDto);
            return Ok(new { Message = "Exam submitted successfully" });
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new APIResponse("Not Found", ex.Message));
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new APIResponse("Invalid Operation", ex.Message));
        }
        catch (Exception ex)
        {
            return StatusCode(500, new APIResponse("Internal Server Error", ex.Message));
        }

    }
}