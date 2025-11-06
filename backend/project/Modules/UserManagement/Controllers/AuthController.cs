using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using project.Models;
using project.Modules.UserManagement.DTOs;
using project.Modules.UserManagement.Services;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthResponseDto>> Register([FromBody] RegisterDto dto)
    {
        var result = await _authService.RegisterAsync(dto);
        return Ok(result);
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> Login([FromBody] LoginDto dto)
    {
        var result = await _authService.LoginAsync(dto);
        return Ok(result);
    }

    [Authorize]
    [HttpGet("test")]
    public ActionResult<string> Test()
    {
        return "AuthController is working!";
    }

    [Authorize]
    [HttpGet("claims")]
    public IActionResult GetClaims()
    {
        // Lấy tất cả claims của user hiện tại
        var claims = User.Claims.Select(c => new 
        { 
            c.Type, 
            c.Value 
        }).ToList();

        return Ok(claims);
    }
}