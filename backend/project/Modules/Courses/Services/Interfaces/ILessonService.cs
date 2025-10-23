public interface ILessonService
{
    Task<LessonInformationDTO> GetLessonByIdAsync(string courseContentId, string id);
    Task<IEnumerable<LessonCardDTO>> GetLessonsByCourseContentIdAsync(string courseContentId);
    Task AddLessonAsync(string courseContentId, LessonCreateDTO lessonDto);
    Task UpdateLessonAsync(string courseContentId, string id, LessonUpdateDTO lessonDto);
    Task UpdateOrderLessonsAsync(string courseContentId, List<LessonOrderDTO> lessonOrders);
}