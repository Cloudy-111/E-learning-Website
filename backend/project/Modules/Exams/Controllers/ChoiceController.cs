using Microsoft.AspNetCore.Mvc;

[Route("api/{questionExamId}/choices")]
[ApiController]
public class ChoiceController : ControllerBase
{
    private readonly IChoiceService _choiceService;

    public ChoiceController(IChoiceService choiceService)
    {
        _choiceService = choiceService;
    }

    // Controller actions go here
    [HttpPost]
    public async Task<IActionResult> AddChoice(string questionExamId, [FromBody] AddChoiceDTO addChoiceDTO)
    {
        if (!ModelState.IsValid)
        {
            return Ok(new APIResponse("Error", "Invalid data."));
        }
        await _choiceService.AddChoiceAsync(questionExamId, addChoiceDTO);
        return Ok(new APIResponse("Success", "Add choice successfully."));
    }

    [HttpDelete("{choiceId}")]
    public async Task<IActionResult> DeleteChoice(string choiceId)
    {
        await _choiceService.DeleteChoiceAsync(choiceId);
        return Ok(new APIResponse("Success", "Delete choice successfully."));
    }

}