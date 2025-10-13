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

    [HttpPost("create-new-exam")]
    public async Task<IActionResult> CreateNewExam([FromBody] CreateExamDTO exam)
    {
        var newExam = new Exam
        {
            AdminId = exam.AdminId,
            CategoryId = exam.CategoryId,
            Title = exam.Title,
            Description = exam.Description,
            DurationMinutes = exam.DurationMinutes,
            TotalCompleted = 0,
            IsOpened = false
        };

        await _examService.AddExamAsync(newExam);
        return CreatedAtAction(nameof(GetExamById), new { id = newExam.Id }, exam);
    }

    [HttpPatch("update-exam/{id}")]
    public async Task<IActionResult> UpdateExam(string id, [FromBody] UpdateExamDTO exam)
    {
        try
        {
            var existingExam = await _examService.GetExamByIdAsync(id);
            if (existingExam == null)
            {
                return NotFound(new { message = $"Exam with id {id} not found." });
            }

            // Update only the fields that are provided in the DTO
            if (!string.IsNullOrEmpty(exam.Title))
            {
                existingExam.Title = exam.Title;
            }
            if (!string.IsNullOrEmpty(exam.Description))
            {
                existingExam.Description = exam.Description;
            }
            if (exam.DurationMinutes.HasValue)
            {
                existingExam.DurationMinutes = exam.DurationMinutes.Value;
            }
            if (exam.IsOpened.HasValue)
            {
                existingExam.IsOpened = exam.IsOpened.Value;
            }

            await _examService.UpdateExamAsync(existingExam);
            return Ok(new { messenge = "Update exam successfully" });
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }
}