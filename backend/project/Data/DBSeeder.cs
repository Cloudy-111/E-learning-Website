using Bogus;
using System;
using Microsoft.EntityFrameworkCore;
using project.Models;

public static class DBSeeder
{
    public static void Seed(DBContext context)
    {
        context.Database.Migrate();

        if (context.User.Any()) return;

        var faker = new Bogus.Faker();

        var userFaker = new Faker<User>()
            .RuleFor(u => u.Id, f => Guid.NewGuid().ToString())
            .RuleFor(u => u.FullName, f => f.Name.FullName())
            .RuleFor(u => u.Email, (f, u) => f.Internet.Email(u.FullName))
            .RuleFor(u => u.UserName, (f, u) => u.Email)
            .RuleFor(u => u.PhoneNumber, f => f.Phone.PhoneNumber("09########"))
            .RuleFor(u => u.DateOfBirth, f => f.Date.Past(30, DateTime.Now.AddYears(-18)))
            .RuleFor(u => u.Gender, f => f.PickRandom(new[] { "Male", "Female" }))
            .RuleFor(u => u.Address, f => f.Address.FullAddress())
            .RuleFor(u => u.AvatarUrl, f => f.Image.PicsumUrl())
            .RuleFor(u => u.SocialLinks, f => f.Internet.Url())
            .RuleFor(u => u.Status, f => f.PickRandom(new[] { "Active", "Inactive" }))
            .RuleFor(u => u.CreatedAt, f => f.Date.Past(1))
            .RuleFor(u => u.UpdatedAt, f => DateTime.UtcNow);

        var users = userFaker.Generate(50);

        context.Users.AddRange(users);
        context.SaveChanges();

        var studentUsers = users.Take(30).ToList();
        var teacherUsers = users.Skip(30).Take(15).ToList();
        var adminUsers = users.Skip(45).Take(5).ToList();

        var students = studentUsers.Select(u => new Student
        {
            StudentId = Guid.NewGuid().ToString(),
            UserId = u.Id,
            User = u,
            Bio = faker.Lorem.Sentence()
        }).ToList();

        var teachers = teacherUsers.Select(u => new Teacher
        {
            TeacherId = Guid.NewGuid().ToString(),
            UserId = u.Id,
            User = u,
            EmployeeCode = faker.Random.AlphaNumeric(6),
            instruction = faker.Lorem.Sentence()
        }).ToList();

        var admins = adminUsers.Select(u => new Admin
        {
            AdminId = Guid.NewGuid().ToString(),
            UserId = u.Id,
            User = u
        }).ToList();

        context.Students.AddRange(students);
        context.Teachers.AddRange(teachers);
        context.Admins.AddRange(admins);
        context.SaveChanges();
    }
}