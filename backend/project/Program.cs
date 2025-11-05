using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using project.Models;
using Microsoft.AspNetCore.Mvc;
using project.Modules.Posts.Repositories.Interfaces;
using project.Modules.Posts.Services.Interfaces;
using project.Modules.Posts.Services.Implements;
using project.Modules.Posts.Repositories;
using project.Modules.Posts.Repositories.Implements;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("Elearning_DB") ?? throw new InvalidOperationException("Connection string 'Elearning_DB' not found");

// Add Connection to MSSQL
builder.Services.AddDbContext<DBContext>(options => options.UseSqlServer(connectionString));
builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<DBContext>()
    .AddDefaultTokenProviders();

// Add services to the container.
builder.Services.AddScoped<IExamService, ExamService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IQuestionExamService, QuestionExamService>();
builder.Services.AddScoped<ICourseService, CourseService>();
builder.Services.AddScoped<IChoiceService, ChoiceService>();
builder.Services.AddScoped<ISubmissionExamService, SubmissionExamService>();
builder.Services.AddScoped<ISubmissionAnswerService, SubmissionAnswerService>();
builder.Services.AddScoped<ILessonService, LessonService>();
builder.Services.AddScoped<ICourseContentService, CourseContentService>();
builder.Services.AddScoped<IRequestUpdateService, RequestUpdateService>();
builder.Services.AddScoped<IPostService, PostService>();
builder.Services.AddScoped<IDiscussionService, DiscussionService>();
builder.Services.AddScoped<IForumQuestionService, ForumQuestionService>();
builder.Services.AddScoped<ILikesService, LikesService>();
builder.Services.AddScoped<IReportService, ReportService>();
builder.Services.AddScoped<ICourseReviewService, CourseReviewService>();
builder.Services.AddScoped<IEnrollmentCourseService, EnrollmentCourseService>();
builder.Services.AddScoped<IAdminService, AdminService>();
// builder.Services.AddScoped<IStudentService, StudentService>();

// Add repository to the container.
builder.Services.AddScoped<IExamRepository, ExamRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IQuestionExamRepository, QuestionExamRepository>();
builder.Services.AddScoped<ICourseRepository, CourseRepository>();
builder.Services.AddScoped<IChoiceRepository, ChoiceRepository>();
builder.Services.AddScoped<ISubmissionExamRepository, SubmissionExamRepository>();
builder.Services.AddScoped<ISubmissionAnswerRepository, SubmissionAnswerRepository>();
builder.Services.AddScoped<IStudentRepository, StudentRepository>();
builder.Services.AddScoped<ITeacherRepository, TeacherRepository>();
builder.Services.AddScoped<ICourseContentRepository, CourseContentRepository>();
builder.Services.AddScoped<ILessonRepository, LessonRepository>();
builder.Services.AddScoped<IRequestUpdateRepository, RequestUpdateRepository>();
builder.Services.AddScoped<IPostRepository, PostRepository>();
builder.Services.AddScoped<IDiscussionRepository, DiscussionRepository>();
builder.Services.AddScoped<IForumQuestionRepository, ForumQuestionRepository>();
builder.Services.AddScoped<ILikesRepository, LikesRepository>();
builder.Services.AddScoped<IReportRepository, ReportRepository>();
builder.Services.AddScoped<ICourseReviewRepository, CourseReviewRepository>();
builder.Services.AddScoped<IEnrollmentCourseRepository, EnrollmentCourseRepository>();
builder.Services.AddScoped<ILessonProgressRepository, LessonProgressRepository>();
builder.Services.AddScoped<IRequestRefundCourseRepository, RequestRefundCourseRepository>();
builder.Services.AddScoped<IAdminRepository, AdminRepository>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.SuppressModelStateInvalidFilter = true;
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<DBContext>();
    DBSeeder.Seed(context);
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("AllowReactApp");

app.MapControllers();

app.MapGet("/", () => "Hello, .NET API is running!");

app.Run();
