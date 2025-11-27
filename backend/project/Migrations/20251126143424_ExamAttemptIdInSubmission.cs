using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace project.Migrations
{
    /// <inheritdoc />
    public partial class ExamAttemptIdInSubmission : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ExamAttemptId",
                table: "SubmissionExams",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_SubmissionExams_ExamAttemptId",
                table: "SubmissionExams",
                column: "ExamAttemptId");

            migrationBuilder.AddForeignKey(
                name: "FK_SubmissionExams_ExamAttemps_ExamAttemptId",
                table: "SubmissionExams",
                column: "ExamAttemptId",
                principalTable: "ExamAttemps",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubmissionExams_ExamAttemps_ExamAttemptId",
                table: "SubmissionExams");

            migrationBuilder.DropIndex(
                name: "IX_SubmissionExams_ExamAttemptId",
                table: "SubmissionExams");

            migrationBuilder.DropColumn(
                name: "ExamAttemptId",
                table: "SubmissionExams");
        }
    }
}
