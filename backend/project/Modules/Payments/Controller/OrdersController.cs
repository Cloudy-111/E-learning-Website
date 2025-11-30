using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using project.Modules.Payment.DTOs;
using project.Modules.Payment.Service.Interfaces;

namespace project.Modules.Payment.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }


         /// <summary>
    /// Tạo Order mới cho student
    /// </summary>
    /// <param name="dto">OrderCreateDto chứa danh sách course</param>
    /// <returns>OrderResponseDto</returns>
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreateOrder([FromBody] OrderCreateDto dto)
    {
        // Lấy StudentId từ JWT claim
        var studentId = User.FindFirst("StudentId")?.Value;
        if (string.IsNullOrEmpty(studentId))
            return Unauthorized(new { message = "StudentId not found in token." });

        try
        {
            var order = await _orderService.CreateOrderAsync(dto, studentId);
            return Ok(order); // trả về OrderResponseDto
        }
        catch (Exception ex)
        {
            // Trả lỗi nếu course không tồn tại hoặc bất kỳ lỗi nào khác
            return BadRequest(new { message = ex.Message });
        }
    }


    }
}
