using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using project.Modules.Payments.Service.Interfaces;

namespace project.Modules.Payments.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
         private readonly IPaymentService _paymentService;

    public PaymentController(IPaymentService paymentService)
    {
        _paymentService = paymentService;
    }
    
    [HttpGet("{paymentId}/qr")]
    [Authorize]
    public async Task<IActionResult> GetPaymentQr(string paymentId)
    {
        try
        {
            var studentId = User.FindFirst("StudentId")?.Value ?? throw new Exception("StudentId not found in token");
            var qrDto = await _paymentService.GeneratePaymentQrAsync(paymentId, studentId);
            return Ok(qrDto);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
    }
}
