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

            foreach (Course course in courses)
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
        if (!context.Lessons.Any())
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

        // Seed Exams
        if (!context.Exams.Any())
        {
            var coursesContents = context.CourseContents.ToList();
            var lessons = context.Lessons.ToList();

            var examFaker = new Faker<Exam>()
                .RuleFor(e => e.Id, f => Guid.NewGuid().ToString())
                .RuleFor(e => e.Title, f => f.Lorem.Sentence(5))
                .RuleFor(e => e.Description, f => f.Lorem.Paragraph())
                .RuleFor(e => e.DurationMinutes, f => f.Random.Int(30, 120))
                .RuleFor(e => e.TotalCompleted, 0)
                .RuleFor(e => e.IsOpened, f => f.Random.Bool());

            var exams = new List<Exam>();

            foreach (var courseContent in coursesContents)
            {
                var exam = examFaker.Generate();
                exam.CourseContentId = courseContent.Id;
                exam.LessonId = null;
                exams.Add(exam);
            }

            foreach (var lesson in lessons.Take(20))
            {
                var exam = examFaker.Generate();
                exam.LessonId = lesson.Id;
                exam.CourseContentId = null;
                exams.Add(exam);
            }
            context.Exams.AddRange(exams);

            context.SaveChanges();
        }

        // Seed Questions
        if (!context.QuestionExams.Any())
        {
            var exams = context.Exams.ToList();

            var questionExamFaker = new Faker<QuestionExam>()
                .RuleFor(q => q.Id, f => Guid.NewGuid().ToString())
                .RuleFor(q => q.ExamId, f => f.PickRandom(exams).Id)
                .RuleFor(q => q.Content, f => f.Lorem.Sentence(10))
                .RuleFor(q => q.ImageUrl, f => f.Random.Bool(0.3f) ? f.Image.PicsumUrl() : null)
                .RuleFor(q => q.Type, f => f.PickRandom(new[] { "MultipleChoice", "TrueFalse", "MultiSelectChoice" }))
                .RuleFor(q => q.Exaplanation, f => f.Lorem.Sentence(5))
                .RuleFor(q => q.Score, f => f.Random.Double(1, 2))
                .RuleFor(q => q.IsRequired, f => f.Random.Bool(0.8f))
                .RuleFor(q => q.IsNewest, true);

            var questions = questionExamFaker.Generate(300);
            context.QuestionExams.AddRange(questions);
            context.SaveChanges();
        }

        // Seed Choices
        if (!context.Choices.Any())
        {
            var questions = context.QuestionExams.ToList();

            var choices = new List<Choice>();

            foreach (var question in questions)
            {
                if (question.Type == "MultipleChoice")
                {
                    var correctIndex = faker.Random.Int(0, 3);
                    for (int i = 0; i < 4; i++)
                    {
                        var choice = new Choice
                        {
                            Id = Guid.NewGuid().ToString(),
                            QuestionExamId = question.Id,
                            Content = faker.Lorem.Word(),
                            IsCorrect = (i == correctIndex)
                        };
                        choices.Add(choice);
                    }
                }
                else if (question.Type == "TrueFalse")
                {
                    var trueChoice = new Choice
                    {
                        Id = Guid.NewGuid().ToString(),
                        QuestionExamId = question.Id,
                        Content = "True",
                        IsCorrect = faker.Random.Bool()
                    };
                    var falseChoice = new Choice
                    {
                        Id = Guid.NewGuid().ToString(),
                        QuestionExamId = question.Id,
                        Content = "False",
                        IsCorrect = !trueChoice.IsCorrect
                    };
                    choices.Add(trueChoice);
                    choices.Add(falseChoice);
                }
                else if (question.Type == "MultiSelectChoice")
                {
                    var correctCount = faker.Random.Int(1, 4);
                    var correctIndices = Enumerable.Range(0, 5)
                                            .OrderBy(x => faker.Random.Int())
                                            .Take(correctCount)
                                            .ToHashSet();
                    for (int i = 0; i < 5; i++)
                    {
                        var choice = new Choice
                        {
                            Id = Guid.NewGuid().ToString(),
                            QuestionExamId = question.Id,
                            Content = faker.Lorem.Word(),
                            IsCorrect = correctIndices.Contains(i)
                        };
                        choices.Add(choice);
                    }
                }
            }

            context.Choices.AddRange(choices);
            context.SaveChanges();
        }

        return;
    }
}