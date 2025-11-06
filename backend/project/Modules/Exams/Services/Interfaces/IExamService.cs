public interface IExamService
{
    Task<IEnumerable<InformationExamDTO>> GetAllExamsAsync();
    Task<IEnumerable<InformationExamDTO>> GetExamsInCourseAsync(string courseId);
    Task<IEnumerable<InformationExamDTO>> GetExamsInLessonAsync(string lessonId);
    Task<InformationExamDTO?> GetExamByIdAsync(string id);
    Task AddExamAsync(CreateExamDTO exam);
    Task UpdateExamAsync(string examId, UpdateExamDTO examUpdate);
    // Task DeleteExamAsync(int id);
    Task UpdateOrderQuestionInExamAsync(string examId, List<QuestionExamOrderDTO> questionOrders);
    Task UploadExamExcelAsync(UploadExamExcelRequest request);
}