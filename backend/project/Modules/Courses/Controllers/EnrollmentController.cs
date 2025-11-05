using Microsoft.AspNetCore.Mvc;

[Route("api/courses/{courseId}/enrollments")]
[ApiController]
public class EnrollmentController : ControllerBase
{
    private readonly IEnrollmentCourseService _enrollmentCourseService;
    public EnrollmentController(IEnrollmentCourseService enrollmentCourseService)
    {
        _enrollmentCourseService = enrollmentCourseService;
    }

    // Teacher/Admin only
    [HttpGet]
    public async Task<IActionResult> GetEnrollmentInCourse(string courseId)
    {
        try
        {
            var enrollments = await _enrollmentCourseService.GetEnrollmentInCourseAsync(courseId);
            return Ok(new APIResponse("Success", "Enrollments retrieve successfully", enrollments));
        }
        catch (KeyNotFoundException knfE)
        {
            return NotFound(new APIResponse("Error", knfE.Message));
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new
            APIResponse("error", "An error occurred while retrieve ennrollments", ex.Message));
        }
    }

    // Student only
    [HttpPost]
    public async Task<IActionResult> CreateEnrollmentAsync(string courseId, [FromBody] EnrollmentCreateDTO enrollment)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new APIResponse("error", "Invalid input data", ModelState));
        }
        try
        {
            await _enrollmentCourseService.CreateEnrollmentAsync(courseId, enrollment);
            return Ok(new APIResponse("Success", "Enrollment create successfully"));
        }
        catch (KeyNotFoundException knfE)
        {
            return NotFound(new APIResponse("Error", knfE.Message));
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new
            APIResponse("error", "An error occurred while creating the enrollment", ex.Message));
        }
    }

    // Student/Admin/Teacher only
    [HttpGet("{enrollmentId}")]
    public async Task<IActionResult> GetEnrollmentByIdAsync(string courseId, string enrollmentId)
    {
        try
        {
            var enrollment = await _enrollmentCourseService.GetEnrollmentByIdAsync(courseId, enrollmentId);
            return Ok(new APIResponse("Success", "Retrieve Enrollment Successfully", enrollment));
        }
        catch (KeyNotFoundException knfE)
        {
            return NotFound(new APIResponse("Error", knfE.Message));
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new
            APIResponse("error", "An error occurred while retrieving the enrollment", ex.Message));
        }
    }

    // Student only
    [HttpPatch("{enrollmentId}/progress")]
    public async Task<IActionResult> UpdateProgressEnrollmentAsync(string courseId, string enrollmentId, [FromBody] EnrollmentProgressUpdateDTO enrollmentUpdateDTO)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new APIResponse("error", "Invalid input data", ModelState));
        }
        try
        {
            await _enrollmentCourseService.UpdateProgressEnrollmentAsync(courseId, enrollmentId, enrollmentUpdateDTO);
            return Ok(new APIResponse("Success", "Update Progress Enrollment Successfully"));
        }
        catch (KeyNotFoundException knfE)
        {
            return NotFound(new APIResponse("Error", knfE.Message));
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new
            APIResponse("error", "An error occurred while updating progress the enrollment", ex.Message));
        }
    }

    // Student only
    [HttpPost("{enrollmentId}/request-cancel")]
    public async Task<IActionResult> RequestCancelEnrollmentAsync(string courseId, string enrollmentId, [FromBody] RequestCancelEnrollmentDTO dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new APIResponse("error", "Invalid input data", ModelState));
        }
        try
        {
            await _enrollmentCourseService.RequestCancelEnrollmentAsync(courseId, enrollmentId, dto);
            return Ok(new APIResponse("Success", "Request Refund Course create Successfully"));
        }
        catch (KeyNotFoundException knfE)
        {
            return NotFound(new APIResponse("Error", knfE.Message));
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new
            APIResponse("error", "An error occurred while create Request Refund Course", ex.Message));
        }
    }
}