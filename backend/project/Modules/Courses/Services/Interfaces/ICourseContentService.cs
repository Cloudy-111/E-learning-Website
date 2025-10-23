public interface ICourseContentService
{
    Task AddCourseContentAsync(string courseId, CourseContentCreateDTO contentDto);
    Task UpdateCourseContentAsync(string contentId, CourseContentUpdateDTO contentDto);
    Task<CourseContentInformationDTO> GetCourseContentInformationDTOAsync(string courseId);
}