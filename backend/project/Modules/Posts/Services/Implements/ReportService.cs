using System;
using project.Modules.Posts.DTOs;
using project.Modules.Posts.Repositories.Interfaces;
using project.Modules.Posts.Services.Interfaces;

namespace project.Modules.Posts.Services.Implements;

public class ReportService: IReportService
{
     private readonly IReportRepository _repository;

    public ReportService(IReportRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<ReportDto>> GetAllReportsAsync()
    {
        var reports = await _repository.GetAllAsync();

        return reports.Select(r => new ReportDto
        {
            Id = r.Id,
            ReporterId = r.ReporterId!,
            ReporterName = r.Student?.User?.FullName ?? "Ẩn danh",
            TargetType = r.TargetType,
            TargetTypeId = r.TargetTypeId,
            Reason = r.Reason,
            Description = r.Description,
            Status = r.Status,
            CreatedAt = r.CreatedAt
        });
    }

    public async Task<ReportDto?> GetReportByIdAsync(string id)
    {
        var r = await _repository.GetByIdAsync(id);
        if (r == null) return null;

        return new ReportDto
        {
            Id = r.Id,
            ReporterId = r.ReporterId!,
            ReporterName = r.Student?.User?.FullName ?? "Ẩn danh",
            TargetType = r.TargetType,
            TargetTypeId = r.TargetTypeId,
            Reason = r.Reason,
            Description = r.Description,
            Status = r.Status,
            CreatedAt = r.CreatedAt
        };
    }

}
