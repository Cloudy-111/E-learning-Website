public interface ICourseContentService
{
    Task AddCourseContentAsync(string courseId, CourseContentCreateDTO contentDto);
    Task<CourseContentInformationDTO> GetCourseContentInformationDTOAsync(string courseId);
}