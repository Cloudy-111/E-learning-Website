using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using project.Modules.Posts.Services.Interfaces;

namespace project.Modules.Posts.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentStatsController : ControllerBase
    {
         private readonly IStudentStatsService _service;

    public StudentStatsController(IStudentStatsService service)
    {
        _service = service;
    }

    // GET: api/studentstats?month=5
    [HttpGet]
    public async Task<IActionResult> GetStats([FromQuery] int? month)
    {
        var result = await _service.GetStatsAsync(month);
        return Ok(result);
    }
    }
}
