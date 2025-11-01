using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using project.Modules.Posts.DTOs;
using project.Modules.Posts.Services.Interfaces;

namespace project.Modules.Posts.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private readonly IReportService _reportService;

    public ReportsController(IReportService reportService)
    {
        _reportService = reportService;
    }

    // GET: /api/reports
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ReportDto>>> GetAllReports()
    {
        var reports = await _reportService.GetAllReportsAsync();
        return Ok(reports);
    }

    // GET: /api/reports/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<ReportDto>> GetReportById(string id)
    {
        var report = await _reportService.GetReportByIdAsync(id);
        if (report == null) return NotFound();
        return Ok(report);
    }
    }
}
