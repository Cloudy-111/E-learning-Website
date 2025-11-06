using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
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
            FullName = dto.FullName,
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

        var refreshToken = GenerateRefreshToken();
        user.RefreshTokenHash = HashToken(refreshToken);
        user.RefreshTokenTimeExpire = DateTime.UtcNow.AddDays(7);
        await _userManager.UpdateAsync(user);
        // Kiểm tra xem user có là teacher chưa (thường mới đăng ký thì chưa)
        var teacher = await _context.Teachers.FirstOrDefaultAsync(t => t.UserId == user.Id);
       
        var token = GenerateJwtToken(user, student.StudentId, teacher?.TeacherId);
        return new AuthResponseDto
        {
            Token = token,
            UserId = user.Id,
            FullName = user.FullName,
            StudentId = student?.StudentId,
            TeacherId = teacher?.TeacherId,
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

        // Lấy TeacherId nếu có
        var teacher = await _context.Teachers.FirstOrDefaultAsync(t => t.UserId == user.Id);

        var refreshToken = GenerateRefreshToken();
        user.RefreshTokenHash = HashToken(refreshToken);
        user.RefreshTokenTimeExpire = DateTime.UtcNow.AddDays(7);
        await _userManager.UpdateAsync(user);

        var token = GenerateJwtToken(user, student.StudentId, teacher?.TeacherId);
        return new AuthResponseDto
        {
            Token = token,
            UserId = user.Id,
            FullName = user.FullName,
            RefreshToken = refreshToken,
            StudentId = student?.StudentId,
            TeacherId = teacher?.TeacherId
        };
    }

    // Đăng ký làm teacher
    public async Task<Teacher> RegisterTeacherAsync(string userId, TeacherRegisterDto dto)
    {
        // Kiểm tra user đã là teacher chưa
        var existingTeacher = await _context.Teachers.FirstOrDefaultAsync(t => t.UserId == userId);
        if (existingTeacher != null)
            throw new Exception("User is already a teacher");

        var teacher = new Teacher
        {
            UserId = userId,
            EmployeeCode = dto.EmployeeCode ?? Guid.NewGuid().ToString().Substring(0, 6).ToUpper(),
            instruction = dto.Instruction ?? ""
        };

        _context.Teachers.Add(teacher);
        await _context.SaveChangesAsync();

        return teacher;
    }

    // ========================= Refresh Token =========================
    public async Task<AuthResponseDto> RefreshTokenAsync(string refreshToken)
        {
            var hashedToken = HashToken(refreshToken);
            var user = await _userManager.Users.FirstOrDefaultAsync(u =>
                u.RefreshTokenHash == hashedToken &&
                u.RefreshTokenTimeExpire != null &&
                u.RefreshTokenTimeExpire > DateTime.UtcNow);

            if (user == null)
                throw new Exception("Invalid or expired refresh token");

            var student = await _context.Students.FirstOrDefaultAsync(s => s.UserId == user.Id);
            var teacher = await _context.Teachers.FirstOrDefaultAsync(t => t.UserId == user.Id);

            // Tạo access token mới
            var newToken = GenerateJwtToken(user, student?.StudentId ?? "", teacher?.TeacherId);

            // Tạo refresh token mới
            var newRefreshToken = GenerateRefreshToken();
            user.RefreshTokenHash = HashToken(newRefreshToken);
            user.RefreshTokenTimeExpire = DateTime.UtcNow.AddDays(7);
            await _userManager.UpdateAsync(user);

            return new AuthResponseDto
            {
                Token = newToken,
                UserId = user.Id,
                FullName = user.FullName,
                RefreshToken = newRefreshToken,
                StudentId = student?.StudentId,
                TeacherId = teacher?.TeacherId
            };
        }


    // ========================= Helper =========================
    private string GenerateJwtToken(User user, string studentId, string? teacherId)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Name, user.FullName),
            new Claim("StudentId", studentId)
        };

        if (!string.IsNullOrEmpty(teacherId))
        claims.Add(new Claim("TeacherId", teacherId));

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

    private string GenerateRefreshToken()
    {
        var randomBytes = new byte[32];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomBytes);
        return Convert.ToBase64String(randomBytes);
    }

    private string HashToken(string token)
    {
        return Convert.ToBase64String(SHA256.HashData(Encoding.UTF8.GetBytes(token)));
    }


}
