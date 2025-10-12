using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
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
            return NotFound(new { message = ex.Message });
        }
    }

    [HttpGet("category/{categoryId}")]
    public async Task<IActionResult> GetExamsByCategoryId(string categoryId)
    {
        try
        {
            var listExams = await _examService.GetExamsByCategoryIdAsync(categoryId);
            return Ok(listExams);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }
}