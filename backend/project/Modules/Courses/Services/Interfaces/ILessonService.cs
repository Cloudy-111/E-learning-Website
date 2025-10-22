public interface ILessonService
{
    Task<LessonInformationDTO> GetLessonByIdAsync(string courseContentId, string id);
    Task<IEnumerable<LessonCardDTO>> GetLessonsByCourseContentIdAsync(string courseContentId);
    Task AddLessonAsync(string courseContentId, LessonCreateDTO lessonDto);
}