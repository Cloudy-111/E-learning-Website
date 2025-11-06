using System;

namespace project.Modules.UserManagement.DTOs;

public class AuthResponseDto
{
    public string Token { get; set; } = null!;
    public string UserId { get; set; } = null!;
    public string FullName { get; set; } = null!;
    public string? RefreshToken { get; set; }

}
