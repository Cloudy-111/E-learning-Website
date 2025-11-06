using Microsoft.AspNetCore.Mvc;

[Route("api/admin")]
[ApiController]
public class AdminController : ControllerBase
{
    private readonly IAdminService _adminService;
    public AdminController(IAdminService adminService)
    {
        _adminService = adminService;
    }

    [HttpGet("courses/status/{status}")]
    public async Task<IActionResult> GetCourseByStatusAsync(string status)
    {
        try
        {
            var courses = await _adminService.GetCoursesByStatusAsync(status);
            return Ok(new APIResponse("success", "Courses retrieved successfully", courses));
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new
            APIResponse("error", "An error occurred while retrieving courses", ex.Message));
        }
    }

    [HttpPatch("courses/{courseId}/approve")]
    public async Task<IActionResult> AdminApproveCourseAsync(string courseId)
    {
        try
        {
            await _adminService.AdminApproveCourseAsync(courseId);
            return Ok(new APIResponse("success", "Course approved successfully"));
        }
        catch (KeyNotFoundException knfEx)
        {
            return NotFound(new APIResponse("error", knfEx.Message));
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new
            APIResponse("error", "An error occurred while approving the course", ex.Message));
        }
    }

    [HttpPatch("courses/{courseId}/reject")]
    public async Task<IActionResult> AdminRejectCourseAsync(string courseId, [FromBody] RejectCourseRequestDTO dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new APIResponse("error", "Invalid input data", ModelState));
        }
        try
        {
            await _adminService.AdminRejectCourseAsync(courseId, dto);
            return Ok(new APIResponse("success", "Course rejected successfully"));
        }
        catch (KeyNotFoundException knfEx)
        {
            return NotFound(new APIResponse("error", knfEx.Message));
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new
            APIResponse("error", "An error occurred while rejecting the course", ex.Message));
        }
    }

    // [HttpGet("courses/refunds/pending")]
    // public async Task<IActionResult> GetPendingRefundRequestsAsync()
    // {
    //     try
    //     {
    //         var refunds = await _adminService.GetPendingRefundRequestsAsync();
    //         return Ok(new APIResponse("success", "Pending refund requests retrieved successfully", refunds));
    //     }
    //     catch (Exception ex)
    //     {
    //         return StatusCode(StatusCodes.Status500InternalServerError, new
    //         APIResponse("error", "An error occurred while retrieving refund requests", ex.Message));
    //     }
    // }
}