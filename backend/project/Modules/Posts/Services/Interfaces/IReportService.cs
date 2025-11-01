using System;
using project.Modules.Posts.DTOs;

namespace project.Modules.Posts.Services.Interfaces;

public interface IReportService
{
    Task<IEnumerable<ReportDto>> GetAllReportsAsync();
    Task<ReportDto?> GetReportByIdAsync(string id);

}
