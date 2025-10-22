public interface ILessonService
{
    Task<LessonInformationDTO> GetLessonByIdAsync(string id);
    Task<IEnumerable<LessonCardDTO>> GetLessonsByCourseContentIdAsync(string courseContentId);
    Task AddLessonAsync(LessonCreateDTO lessonDto);
}