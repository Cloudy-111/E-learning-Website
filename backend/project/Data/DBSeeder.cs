using Bogus;
using System;
using Microsoft.EntityFrameworkCore;
using project.Models;

public static class DBSeeder
{
    public static void Seed(DBContext context)
    {
        context.Database.Migrate();

        var faker = new Bogus.Faker();

        // Seed Users, Students, Teachers, Admins
        // if (!context.User.Any())
        // {
        //     var userFaker = new Faker<User>()
        //         .RuleFor(u => u.Id, f => Guid.NewGuid().ToString())
        //         .RuleFor(u => u.FullName, f => f.Name.FullName())
        //         .RuleFor(u => u.Email, (f, u) => f.Internet.Email(u.FullName))
        //         .RuleFor(u => u.UserName, (f, u) => u.Email)
        //         .RuleFor(u => u.PhoneNumber, f => f.Phone.PhoneNumber("09########"))
        //         .RuleFor(u => u.DateOfBirth, f => f.Date.Past(30, DateTime.Now.AddYears(-18)))
        //         .RuleFor(u => u.Gender, f => f.PickRandom(new[] { "Male", "Female" }))
        //         .RuleFor(u => u.Address, f => f.Address.FullAddress())
        //         .RuleFor(u => u.AvatarUrl, f => f.Image.PicsumUrl())
        //         .RuleFor(u => u.SocialLinks, f => f.Internet.Url())
        //         .RuleFor(u => u.Status, f => f.PickRandom(new[] { "Active", "Inactive" }))
        //         .RuleFor(u => u.CreatedAt, f => f.Date.Past(1))
        //         .RuleFor(u => u.UpdatedAt, f => DateTime.UtcNow);

        //     var users = userFaker.Generate(50);

        //     context.Users.AddRange(users);
        //     context.SaveChanges();

        //     var studentUsers = users.Take(30).ToList();
        //     var teacherUsers = users.Skip(30).Take(15).ToList();
        //     var adminUsers = users.Skip(45).Take(5).ToList();

        //     var students = studentUsers.Select(u => new Student
        //     {
        //         StudentId = Guid.NewGuid().ToString(),
        //         UserId = u.Id,
        //         User = u,
        //         Bio = faker.Lorem.Sentence()
        //     }).ToList();

        //     var teachers = teacherUsers.Select(u => new Teacher
        //     {
        //         TeacherId = Guid.NewGuid().ToString(),
        //         UserId = u.Id,
        //         User = u,
        //         EmployeeCode = faker.Random.AlphaNumeric(6),
        //         instruction = faker.Lorem.Sentence()
        //     }).ToList();

        //     var admins = adminUsers.Select(u => new Admin
        //     {
        //         AdminId = Guid.NewGuid().ToString(),
        //         UserId = u.Id,
        //         User = u
        //     }).ToList();

        //     context.Students.AddRange(students);
        //     context.Teachers.AddRange(teachers);
        //     context.Admins.AddRange(admins);
        //     context.SaveChanges();
        // }

        // string[] subjects = new[]
        //     {
        //         "Mathematics", "Physics", "Chemistry", "Biology",
        //         "Computer Science", "History", "Geography", "Economics",
        //         "Psychology", "Sociology", "Philosophy", "Art", "Music",
        //         "Physical Education", "Environmental Science", "Statistics",
        //         "Programming", "Artificial Intelligence", "Data Science", "Cybersecurity"
        //     };
        // if (!context.Categories.Any())
        // {


        //     var categories = subjects.Select(subject => new Category
        //     {
        //         Id = Guid.NewGuid().ToString(),
        //         Name = subject,
        //         Description = faker.Lorem.Sentence()
        //     }).ToList();

        //     context.Categories.AddRange(categories);
        //     context.SaveChanges();
        // }

        // if (!context.Exams.Any())
        // {
        //     var admins = context.Admins.ToList();
        //     var categories = context.Categories.ToList();

        //     var examFaker = new Faker<Exam>()
        //         .RuleFor(e => e.Id, f => Guid.NewGuid().ToString())
        //         .RuleFor(e => e.AdminId, f => f.PickRandom(admins).AdminId)
        //         .RuleFor(e => e.Title, f => f.Lorem.Sentence(5))
        //         .RuleFor(e => e.Description, f => f.Lorem.Paragraph())
        //         .RuleFor(e => e.DurationMinutes, f => f.Random.Int(30, 120))
        //         .RuleFor(e => e.TotalCompleted, 0)
        //         .RuleFor(e => e.CategoryId, f => f.PickRandom(categories).Id)
        //         .RuleFor(e => e.IsOpened, f => f.Random.Bool());

        //     var exams = examFaker.Generate(20);
        //     context.Exams.AddRange(exams);

        //     context.SaveChanges();
        // }

        return;
    }
}