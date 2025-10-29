using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using project.Models;

public class ExamService : IExamService
{
    private readonly IExamRepository _examRepository;
    private readonly IQuestionExamService _questionExamService;

    public ExamService(
        IExamRepository examRepository,
        IQuestionExamService questionExamService)
    {
        _examRepository = examRepository;
        _questionExamService = questionExamService;
    }

    public async Task<IEnumerable<InformationExamDTO>> GetAllExamsAsync()
    {
        var exams = await _examRepository.GetAllExamsAsync();
        return exams.Select(exam => new InformationExamDTO
        {
            Id = exam.Id,
            Title = exam.Title,
            Description = exam.Description,
            DurationMinutes = exam.DurationMinutes,
            TotalCompleted = exam.TotalCompleted,
            IsOpened = exam.IsOpened,
            CourseContentId = exam.CourseContentId,
            LessonId = exam.LessonId
        });
    }

    public async Task<InformationExamDTO?> GetExamByIdAsync(string id)
    {
        var exam = await _examRepository.GetExamByIdAsync(id) ?? throw new KeyNotFoundException($"Exam with id {id} not found.");
        return new InformationExamDTO
        {
            Id = exam.Id,
            Title = exam.Title,
            Description = exam.Description,
            DurationMinutes = exam.DurationMinutes,
            TotalCompleted = exam.TotalCompleted,
            IsOpened = exam.IsOpened,
            CourseContentId = exam.CourseContentId,
            LessonId = exam.LessonId
        };
    }

    public async Task AddExamAsync(CreateExamDTO exam)
    {
        if (exam.DurationMinutes <= 0)
        {
            throw new ArgumentException("DurationMinutes must be greater than zero.");
        }
        if (string.IsNullOrWhiteSpace(exam.Title))
        {
            throw new ArgumentException("Title cannot be null or empty.");
        }
        if (exam.CourseContentId == null && exam.LessonId == null)
        {
            throw new ArgumentException("Either CourseContentId or LessonId must be provided.");
        }
        if (exam.CourseContentId != null && exam.LessonId != null)
        {
            throw new ArgumentException("Only one of CourseContentId or LessonId should be provided.");
        }
        var newExam = new Exam
        {
            Title = exam.Title,
            Description = exam.Description,
            DurationMinutes = exam.DurationMinutes,
            TotalCompleted = 0,
            IsOpened = false,
            CourseContentId = exam.CourseContentId,
            LessonId = exam.LessonId
        };
        await _examRepository.AddExamAsync(newExam);
    }

    public async Task UpdateExamAsync(string examId, UpdateExamDTO examUpdate)
    {
        var exam = await _examRepository.GetExamByIdAsync(examId) ?? throw new KeyNotFoundException($"Exam with id {examId} not found.");
        if (exam.IsOpened == true && examUpdate.IsOpened == false)
        {
            throw new InvalidOperationException("Cannot update to an opened exam.");
        }
        exam.Title = examUpdate.Title ?? exam.Title;
        exam.Description = examUpdate.Description ?? exam.Description;
        exam.DurationMinutes = examUpdate.DurationMinutes >= 0 ? examUpdate.DurationMinutes : exam.DurationMinutes;
        exam.IsOpened = examUpdate.IsOpened;
        await _examRepository.UpdateExamAsync(exam);
    }

    // public async Task DeleteExamAsync(int id)
    // {

    // }

    public async Task<bool> UpdateOrderQuestionInExamAsync(string examId, UpdateQuestionOrderDTO dto)
    {
        var questionExams = dto.QuestionExamOrderDTOs;

        var exam = await _examRepository.GetExamByIdAsync(examId) ?? throw new KeyNotFoundException($"Exam with id {examId} not found.");
        var questions = await _questionExamService.GetQuestionExamOrderAsync(examId);
        var questionIdsFromDb = questions.Select(q => q.Id).ToHashSet();
        var questionIdsFromDto = questionExams.Select(q => q.Id).ToHashSet();

        if (!questionIdsFromDb.SetEquals(questionIdsFromDto))
            throw new Exception("Question list does not match the exam.");

        var updatedEntities = questionExams.Select(q => new QuestionExam
        {
            Id = q.Id,
            ExamId = examId,
            Order = q.Order
        }).ToList();

        await _examRepository.UpdateOrderQuestionInExamAsync(examId, updatedEntities);
        return true;
    }
}