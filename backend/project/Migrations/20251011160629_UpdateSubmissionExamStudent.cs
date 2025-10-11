using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace project.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSubmissionExamStudent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubmissionExams_AspNetUsers_StudentId",
                table: "SubmissionExams");

            migrationBuilder.AddForeignKey(
                name: "FK_SubmissionExams_Students_StudentId",
                table: "SubmissionExams",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "StudentId",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubmissionExams_Students_StudentId",
                table: "SubmissionExams");

            migrationBuilder.AddForeignKey(
                name: "FK_SubmissionExams_AspNetUsers_StudentId",
                table: "SubmissionExams",
                column: "StudentId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
