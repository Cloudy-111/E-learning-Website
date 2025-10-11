using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace project.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSubmissionAnswerSubmissionExams : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubmissionAnswers_QuestionExams_QuestionExamId1",
                table: "SubmissionAnswers");

            migrationBuilder.DropIndex(
                name: "IX_SubmissionAnswers_QuestionExamId1",
                table: "SubmissionAnswers");

            migrationBuilder.DropColumn(
                name: "QuestionExamId1",
                table: "SubmissionAnswers");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "QuestionExamId1",
                table: "SubmissionAnswers",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_SubmissionAnswers_QuestionExamId1",
                table: "SubmissionAnswers",
                column: "QuestionExamId1");

            migrationBuilder.AddForeignKey(
                name: "FK_SubmissionAnswers_QuestionExams_QuestionExamId1",
                table: "SubmissionAnswers",
                column: "QuestionExamId1",
                principalTable: "QuestionExams",
                principalColumn: "Id");
        }
    }
}
