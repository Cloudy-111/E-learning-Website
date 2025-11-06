using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using project.Models;
using project.Modules.UserManagement.DTOs;

namespace project.Modules.UserManagement.Services;

public class AuthService
{
    private readonly UserManager<User> _userManager;
    private readonly IConfiguration _configuration;

    private readonly DBContext _context;

    public AuthService(UserManager<User> userManager, IConfiguration configuration, DBContext context)
    {
        _userManager = userManager;
        _configuration = configuration;
        _context = context;
    }

    // Register
    public async Task<AuthResponseDto> RegisterAsync(RegisterDto dto)
    {
        var user = new User
        {
            UserName = dto.Email,
            Email = dto.Email,
            FullName = dto.FullName
        };

        var result = await _userManager.CreateAsync(user, dto.Password);
        if (!result.Succeeded)
            throw new Exception(string.Join(", ", result.Errors.Select(e => e.Description)));

        var student = new Student
        {
            UserId = user.Id,
            Bio = "", // có thể để trống hoặc default
            StudentId = Guid.NewGuid().ToString()


        };

        _context.Students.Add(student);
        await _context.SaveChangesAsync();

        var token = GenerateJwtToken(user, student.StudentId);
        return new AuthResponseDto
        {
            Token = token,
            UserId = user.Id,
            FullName = user.FullName
        };
    }

    // Login
    public async Task<AuthResponseDto> LoginAsync(LoginDto dto)
    {
        var user = await _userManager.FindByEmailAsync(dto.Email);
        if (user == null)
            throw new Exception("Email hoặc mật khẩu không đúng");

        var valid = await _userManager.CheckPasswordAsync(user, dto.Password);
        if (!valid)
            throw new Exception("Email hoặc mật khẩu không đúng");

        // Lấy StudentId tương ứng với UserId
        var student = await _context.Students.FirstOrDefaultAsync(s => s.UserId == user.Id);
        if (student == null)
            throw new Exception("Student not found");

        var token = GenerateJwtToken(user, student.StudentId);
        return new AuthResponseDto
        {
            Token = token,
            UserId = user.Id,
            FullName = user.FullName,
        };
    }

    // Tạo JWT token
    private string GenerateJwtToken(User user, string studentId)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Name, user.FullName),
            new Claim("StudentId", studentId)

        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            _configuration["Jwt:Issuer"],
            _configuration["Jwt:Audience"],
            claims,
            expires: DateTime.UtcNow.AddHours(6),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
