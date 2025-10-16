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

    public async Task<IEnumerable<Exam>> GetAllExamsAsync()
    {
        return await _examRepository.GetAllExamsAsync();
    }

    public async Task<Exam?> GetExamByIdAsync(string id)
    {
        var exam = await _examRepository.GetExamByIdAsync(id) ?? throw new KeyNotFoundException($"Exam with id {id} not found.");
        return exam;
    }

    public async Task AddExamAsync(Exam exam)
    {
        await _examRepository.AddExamAsync(exam);
    }

    public async Task UpdateExamAsync(Exam exam)
    {
        await _examRepository.UpdateExamAsync(exam);
    }

    // public async Task DeleteExamAsync(int id)
    // {

    // }

    public async Task<bool> UpdateOrderQuestionInExamAsync(UpdateQuestionOrderDTO dto)
    {
        var examId = dto.ExamId;
        var questionExams = dto.QuestionExamOrderDTOs;

        var exam = await _examRepository.GetExamByIdAsync(examId) ?? throw new KeyNotFoundException($"Exam with id {examId} not found.");
        var questions = await _questionExamService.GetQuestionExamOrderAsync(examId);
        var questionIdsFromDb = questions.Select(q => q.Id).ToHashSet();
        var questionIdsFromDto = questionExams.Select(q => q.Id).ToHashSet();

        if (!questionIdsFromDb.SetEquals(questionIdsFromDto))
            throw new Exception("Question list does not match the exam.");

        await _examRepository.UpdateOrderQuestionInExamAsync(examId, questionExams);
        return true;
    }
}