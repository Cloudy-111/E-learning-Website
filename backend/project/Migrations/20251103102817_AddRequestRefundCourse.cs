using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace project.Migrations
{
    /// <inheritdoc />
    public partial class AddRequestRefundCourse : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RefundRequestCourses",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    EnrollmentId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    StudentId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RefundAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ProgressSnapshot = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Reason = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ProcessedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ProcessedBy = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefundRequestCourses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RefundRequestCourses_Admins_ProcessedBy",
                        column: x => x.ProcessedBy,
                        principalTable: "Admins",
                        principalColumn: "AdminId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RefundRequestCourses_Enrollments_EnrollmentId",
                        column: x => x.EnrollmentId,
                        principalTable: "Enrollments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RefundRequestCourses_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "StudentId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RefundRequestCourses_EnrollmentId",
                table: "RefundRequestCourses",
                column: "EnrollmentId");

            migrationBuilder.CreateIndex(
                name: "IX_RefundRequestCourses_ProcessedBy",
                table: "RefundRequestCourses",
                column: "ProcessedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RefundRequestCourses_StudentId",
                table: "RefundRequestCourses",
                column: "StudentId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RefundRequestCourses");
        }
    }
}
