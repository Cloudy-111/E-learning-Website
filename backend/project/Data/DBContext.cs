using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using project.Models;

public class DBContext : IdentityDbContext<User>
{
    public DBContext(DbContextOptions<DBContext> options) : base(options)
    {
    }

    public DbSet<User> User { get; set; } = null!;
    public DbSet<Student> Students { get; set; } = null!;
    public DbSet<Teacher> Teachers { get; set; } = null!;
    public DbSet<Admin> Admins { get; set; } = null!;
    public DbSet<Category> Categories { get; set; } = null!;
    public DbSet<Course> Courses { get; set; } = null!;
    public DbSet<CourseContent> CourseContents { get; set; } = null!;
    public DbSet<Lesson> Lessons { get; set; } = null!;
    public DbSet<Enrollment_course> Enrollments { get; set; } = null!;
    public DbSet<Material> Materials { get; set; } = null!;
    public DbSet<Quiz> Quizzes { get; set; } = null!;
    public DbSet<Question> Questions { get; set; } = null!;
    public DbSet<Submission> Submissions { get; set; } = null!;
    public DbSet<CourseReview> CourseReviews { get; set; } = null!;
    public DbSet<Order> Orders { get; set; } = null!;
    public DbSet<OrderDetail> OrderDetails { get; set; } = null!;
    public DbSet<Payment> Payments { get; set; } = null!;
    public DbSet<Certificate> Certificates { get; set; } = null!;
    public DbSet<Exam> Exams { get; set; } = null!;
    public DbSet<QuestionExam> QuestionExams { get; set; } = null!;
    public DbSet<Choice> Choices { get; set; } = null!;
    public DbSet<SubmissionExam> SubmissionExams { get; set; } = null!;
    public DbSet<SubmissionAnswer> SubmissionAnswers { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // User ↔ Teacher (1-1)
        modelBuilder.Entity<User>()
            .HasOne(u => u.Teacher)
            .WithOne(t => t.User)
            .HasForeignKey<Teacher>(t => t.UserId);

        // User ↔ Student (1-1)
        modelBuilder.Entity<User>()
            .HasOne(u => u.Student)
            .WithOne(s => s.User)
            .HasForeignKey<Student>(s => s.UserId);

        // User ↔ Admin (1-1)
        modelBuilder.Entity<User>()
            .HasOne(u => u.Admin)
            .WithOne(a => a.User)
            .HasForeignKey<Admin>(a => a.UserId);

        // Teacher ↔ Course (1-n)
        modelBuilder.Entity<Course>()
            .HasOne(c => c.Teacher)
            .WithMany(t => t.Courses)
            .HasForeignKey(c => c.TeacherId);

        // Category ↔ Course (1-n)
        modelBuilder.Entity<Course>()
            .HasOne(c => c.Category)
            .WithMany(cat => cat.Courses)
            .HasForeignKey(c => c.CategoryId);

        // Category ↔ Exam (1-n)
        modelBuilder.Entity<Exam>()
            .HasOne(e => e.Category)
            .WithMany(cat => cat.Exams)
            .HasForeignKey(e => e.CategoryId);

        // Course ↔ CourseContent (1-1)
        modelBuilder.Entity<Course>()
            .HasOne(c => c.Content)
            .WithOne(cc => cc.Course)
            .HasForeignKey<CourseContent>(cc => cc.CourseId)
            .OnDelete(DeleteBehavior.Cascade);

        // CourseContent ↔ Lesson (1-n)
        modelBuilder.Entity<Lesson>()
            .HasOne(l => l.CourseContent)
            .WithMany(cc => cc.Lessons)
            .HasForeignKey(l => l.CourseContentId);

        // Student ↔ Enrollment ↔ Course
        modelBuilder.Entity<Enrollment_course>()
            .HasOne(e => e.Student)
            .WithMany(s => s.Enrollments)
            .HasForeignKey(e => e.StudentId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Enrollment_course>()
            .HasOne(e => e.Course)
            .WithMany(c => c.Enrollments)
            .HasForeignKey(e => e.CourseId)
            .OnDelete(DeleteBehavior.Cascade);

        // Unique constraint
        modelBuilder.Entity<Enrollment_course>()
            .HasIndex(e => new { e.StudentId, e.CourseId })
            .IsUnique();

        // Lesson ↔ Material (1-n)
        modelBuilder.Entity<Material>()
            .HasOne(m => m.Lesson)
            .WithMany(l => l.Materials)
            .HasForeignKey(m => m.LessonId);

        // Quiz ↔ Course (1-n)
        modelBuilder.Entity<Quiz>()
            .HasOne(q => q.Course)
            .WithMany(c => c.Quizzes)
            .HasForeignKey(q => q.CourseId)
            .OnDelete(DeleteBehavior.Cascade);

        // Lesson ↔ Quiz (1-n)
        modelBuilder.Entity<Quiz>()
            .HasOne(q => q.Lesson)
            .WithMany(l => l.Quizzes)
            .HasForeignKey(q => q.LessonId)
            .OnDelete(DeleteBehavior.Restrict);

        // Quiz ↔ Question (1-n)
        modelBuilder.Entity<Question>()
            .HasOne(ques => ques.Quiz)
            .WithMany(q => q.Questions)
            .HasForeignKey(ques => ques.QuizId);

        // Quiz ↔ Submission (1-n)
        modelBuilder.Entity<Submission>()
           .HasOne(s => s.Quiz)
           .WithMany(q => q.Submissions)
           .HasForeignKey(s => s.QuizId)
           .OnDelete(DeleteBehavior.Cascade);

        // Student ↔ Submission (1-n)
        modelBuilder.Entity<Submission>()
           .HasOne(s => s.Student)
           .WithMany(st => st.Submissions)
           .HasForeignKey(s => s.StudentId)
           .OnDelete(DeleteBehavior.Restrict);

        // Course ↔ CourseReview (1-n)
        modelBuilder.Entity<CourseReview>()
           .HasOne(r => r.Course)
           .WithMany(c => c.Reviews)
           .HasForeignKey(r => r.CourseId)
           .OnDelete(DeleteBehavior.Cascade);

        // Student ↔ CourseReview (1-n)
        modelBuilder.Entity<CourseReview>()
           .HasOne(r => r.Student)
           .WithMany(s => s.Reviews)
           .HasForeignKey(r => r.StudentId)
           .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<CourseReview>()
           .HasIndex(r => new { r.CourseId, r.StudentId })
           .IsUnique();

        // Student ↔ Orders (1-n)
        modelBuilder.Entity<Order>()
            .HasOne(o => o.Student)
            .WithMany(s => s.Orders)
            .HasForeignKey(o => o.StudentId)
            .OnDelete(DeleteBehavior.Restrict);

        // Order ↔ OrderDetails (1-n)
        modelBuilder.Entity<OrderDetail>()
           .HasOne(od => od.Order)
           .WithMany(o => o.OrderDetails)
           .HasForeignKey(od => od.OrderId)
           .OnDelete(DeleteBehavior.Cascade);

        // Course ↔ OrderDetails (1-n)
        modelBuilder.Entity<OrderDetail>()
           .HasOne(od => od.Course)
           .WithMany(c => c.OrderDetails)
           .HasForeignKey(od => od.CourseId)
           .OnDelete(DeleteBehavior.Restrict);

        // Order ↔ Payments (1-n)
        modelBuilder.Entity<Payment>()
           .HasOne(p => p.Order)
           .WithMany(o => o.Payments)
           .HasForeignKey(p => p.OrderId)
           .OnDelete(DeleteBehavior.Cascade);

        // Certificate
        modelBuilder.Entity<Certificate>()
            .HasIndex(c => new { c.CourseId, c.StudentId })
            .IsUnique();

        modelBuilder.Entity<Certificate>()
            .HasOne(c => c.Course)
            .WithMany(c => c.Certificates)
            .HasForeignKey(c => c.CourseId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Certificate>()
            .HasOne(c => c.Student)
            .WithMany(s => s.Certificates)
            .HasForeignKey(c => c.StudentId)
            .OnDelete(DeleteBehavior.Restrict);

        // Student - SubmissionExam (n - 1)
        modelBuilder.Entity<SubmissionExam>()
            .HasOne(se => se.Student)
            .WithMany(s => s.SubmissionExams)
            .HasForeignKey(se => se.StudentId)
            .OnDelete(DeleteBehavior.Restrict);

        // Exam - QuestionExam (1-n)
        modelBuilder.Entity<Exam>()
            .HasMany(e => e.Questions)
            .WithOne(q => q.Exam)
            .HasForeignKey(q => q.ExamId)
            .OnDelete(DeleteBehavior.Restrict);

        // QuestionExam - Choice (1-n)
        modelBuilder.Entity<QuestionExam>()
            .HasMany(q => q.Choices)
            .WithOne(c => c.QuestionExam)
            .HasForeignKey(c => c.QuestionExamId)
            .OnDelete(DeleteBehavior.Cascade);

        // Exam - SubmissionExam (1-n)
        modelBuilder.Entity<Exam>()
            .HasMany(e => e.Submissions)
            .WithOne(s => s.Exam)
            .HasForeignKey(s => s.ExamId)
            .OnDelete(DeleteBehavior.Restrict);

        // SubmissionExam - SubmissionAnswer (1 - n)
        modelBuilder.Entity<SubmissionExam>()
            .HasMany(s => s.SubmissionAnswers)
            .WithOne(a => a.SubmissionExam)
            .HasForeignKey(a => a.SubmissionExamId)
            .OnDelete(DeleteBehavior.Restrict);

        // SubmissionAnswer - SubmissionExam (n - 1)
        modelBuilder.Entity<SubmissionAnswer>()
            .HasOne(a => a.SubmissionExam)
            .WithMany(s => s.SubmissionAnswers)
            .HasForeignKey(a => a.SubmissionExamId)
            .OnDelete(DeleteBehavior.Restrict);

        // SubmissionAnswer - QuestionExam (n - 1)
        modelBuilder.Entity<SubmissionAnswer>()
            .HasOne(a => a.QuestionExam)
            .WithMany(qe => qe.SubmissionAnswers)
            .HasForeignKey(a => a.QuestionExamId)
            .OnDelete(DeleteBehavior.Restrict);

        // SubmissionAnswer - Choice (0 - 1)
        modelBuilder.Entity<SubmissionAnswer>()
            .HasOne(a => a.SelectedChoice)
            .WithMany()
            .HasForeignKey(a => a.SelectedChoiceId)
            .OnDelete(DeleteBehavior.Restrict);

        // Admin - Exam (1 - n)
        modelBuilder.Entity<Admin>()
            .HasMany(a => a.Exams)
            .WithOne(e => e.Admin)
            .HasForeignKey(e => e.AdminId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
