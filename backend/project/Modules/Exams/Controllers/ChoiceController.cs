using Microsoft.AspNetCore.Mvc;

[Route("api/[Controller]")]
[ApiController]
public class ChoiceController : ControllerBase
{
    private readonly IChoiceService _choiceService;

    public ChoiceController(IChoiceService choiceService)
    {
        _choiceService = choiceService;
    }

    // Controller actions go here
    [HttpPost("add-choice")]
    public async Task<IActionResult> AddChoice([FromBody] AddChoiceDTO addChoiceDTO)
    {
        if (!ModelState.IsValid)
        {
            return Ok(new APIResponse("Error", "Invalid data."));
        }
        await _choiceService.AddChoiceAsync(addChoiceDTO);
        return Ok(new { Message = "Choice added successfully." });
    }

    [HttpDelete("delete-choice/{choiceId}")]
    public async Task<IActionResult> DeleteChoice(string choiceId)
    {
        await _choiceService.DeleteChoiceAsync(choiceId);
        return Ok(new { Message = "Choice deleted successfully." });
    }

}