public interface ICourseContentService
{
    Task AddCourseContentAsync(string userId, string courseId, CourseContentCreateDTO contentDto);
    Task UpdateCourseContentAsync(string userId, string contentId, CourseContentUpdateDTO contentDto);
    Task<CourseContentInformationDTO> GetCourseContentInformationDTOAsync(string courseId);
}