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
            return BadRequest(new APIResponse("Error", "Invalid input data", ModelState));
        }
        try
        {
            await _choiceService.AddChoiceAsync(questionExamId, addChoiceDTO);
            return Ok(new APIResponse("Success", "Add choice successfully."));
        }
        catch (ArgumentException argEx)
        {
            return BadRequest(new APIResponse("Error", argEx.Message));
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new
            APIResponse("error", "An error occurred while adding the choice", ex.Message));
        }

    }

    [HttpDelete("{choiceId}")]
    public async Task<IActionResult> DeleteChoice(string choiceId)
    {
        try
        {
            await _choiceService.DeleteChoiceByIdAsync(choiceId);
            return Ok(new APIResponse("Success", "Delete choice successfully."));
        }
        catch (KeyNotFoundException knfEx)
        {
            return NotFound(new APIResponse("Error", knfEx.Message));
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new
            APIResponse("error", "An error occurred while deleting the choice", ex.Message));
        }
    }

    [HttpPatch("{choiceId}")]
    public async Task<IActionResult> UpdateChoiceContent(string choiceId, [FromBody] ChoiceUpdateDTO dto)
    {
        try
        {
            await _choiceService.UpdateChoiceAsync(choiceId, dto);
            return Ok(new APIResponse("success", "Update choice Successfully!"));
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new
            APIResponse("error", "An error occurred while update choice", ex.Message));
        }
    }
}