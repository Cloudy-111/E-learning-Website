using System;
using project.Models;
using project.Modules.UserManagement.DTOs;

namespace project.Modules.UserManagement.Services.Interfaces;

public interface IAuthService
{
    Task<AuthResponseDto> RegisterAsync(RegisterDto dto);
    Task<AuthResponseDto> LoginAsync(LoginDto dto);
    Task<Teacher> RegisterTeacherAsync(string userId, TeacherRegisterDto dto);
    Task<AuthResponseDto> RefreshTokenAsync(string refreshToken);


  
}
