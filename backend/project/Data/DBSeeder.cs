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
        if (!context.User.Any())
        {
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

        string[] subjects = new[]
            {
                "Mathematics", "Physics", "Chemistry", "Biology",
                "Computer Science", "History", "Geography", "Economics",
                "Psychology", "Sociology", "Philosophy", "Art", "Music",
                "Physical Education", "Environmental Science", "Statistics",
                "Programming", "Artificial Intelligence", "Data Science", "Cybersecurity"
            };
        if (!context.Categories.Any())
        {


            var categories = subjects.Select(subject => new Category
            {
                Id = Guid.NewGuid().ToString(),
                Name = subject,
                Description = faker.Lorem.Sentence()
            }).ToList();

            context.Categories.AddRange(categories);
            context.SaveChanges();
        }

        // Seed Courses
        if (!context.Courses.Any())
        {
            var categories = context.Categories.ToList();
            var teachers = context.Teachers.ToList();

            var courseFaker = new Faker<Course>()
                .RuleFor(c => c.Id, f => Guid.NewGuid().ToString())
                .RuleFor(c => c.Title, f => f.Lorem.Sentence(5))
                .RuleFor(c => c.Description, f => f.Lorem.Paragraph())
                .RuleFor(c => c.Price, f => f.Random.Decimal(20, 200))
                .RuleFor(c => c.DiscountPrice, f => f.Random.Bool(0.5f) ? f.Random.Decimal(10, 90) : (decimal?)null)
                .RuleFor(c => c.CategoryId, f => f.PickRandom(categories).Id)
                .RuleFor(c => c.TeacherId, f => f.PickRandom(teachers).TeacherId)
                .RuleFor(c => c.CreatedAt, f => f.Date.Past(1))
                .RuleFor(c => c.UpdatedAt, f => DateTime.UtcNow)
                .RuleFor(c => c.ThumbnailUrl, f => f.Image.PicsumUrl());

            var courses = courseFaker.Generate(30);
            context.Courses.AddRange(courses);

            context.SaveChanges();
        }

        // Seed CourseContents
        if (!context.CourseContents.Any())
        {
            var courses = context.Courses.ToList();
            var courseContents = new List<CourseContent>();

            foreach(Course course in courses)
            {
                var courseContent = new CourseContent
                {
                    Id = Guid.NewGuid().ToString(),
                    CourseId = course.Id,
                    Title = "Course Content for " + course.Title,
                    Description = faker.Lorem.Paragraph(),
                    Introduce = faker.Lorem.Paragraph()
                };
                courseContents.Add(courseContent);
            }

            context.CourseContents.AddRange(courseContents);

            context.SaveChanges();
        }

        // // Seed Lessons
        if(!context.Lessons.Any())
        {
            var courseContents = context.CourseContents.ToList();

            var lessonFaker = new Faker<Lesson>()
                .RuleFor(l => l.Id, f => Guid.NewGuid().ToString())
                .RuleFor(l => l.CourseContentId, f => f.PickRandom(courseContents).Id)
                .RuleFor(l => l.Title, f => f.Lorem.Sentence(4))
                .RuleFor(l => l.VideoUrl, f => f.Image.PicsumUrl())
                .RuleFor(l => l.Duration, f => f.Random.Int(5, 120))
                .RuleFor(l => l.TextContent, f => f.Lorem.Paragraphs(2));

            var lessons = lessonFaker.Generate(100);
            context.Lessons.AddRange(lessons);

            context.SaveChanges();
        }

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