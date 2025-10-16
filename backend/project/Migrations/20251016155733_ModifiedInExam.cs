using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace project.Migrations
{
    /// <inheritdoc />
    public partial class ModifiedInExam : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseContents_Courses_CourseId",
                table: "CourseContents");

            migrationBuilder.DropForeignKey(
                name: "FK_Exams_Admins_AdminId",
                table: "Exams");

            migrationBuilder.AlterColumn<string>(
                name: "AdminId",
                table: "Exams",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "CourseContentId",
                table: "Exams",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LessonId",
                table: "Exams",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TeacherId",
                table: "Exams",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Exams_CourseContentId",
                table: "Exams",
                column: "CourseContentId");

            migrationBuilder.CreateIndex(
                name: "IX_Exams_LessonId",
                table: "Exams",
                column: "LessonId");

            migrationBuilder.CreateIndex(
                name: "IX_Exams_TeacherId",
                table: "Exams",
                column: "TeacherId");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseContents_Courses_CourseId",
                table: "CourseContents",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Exams_Admins_AdminId",
                table: "Exams",
                column: "AdminId",
                principalTable: "Admins",
                principalColumn: "AdminId");

            migrationBuilder.AddForeignKey(
                name: "FK_Exams_CourseContents_CourseContentId",
                table: "Exams",
                column: "CourseContentId",
                principalTable: "CourseContents",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Exams_Lessons_LessonId",
                table: "Exams",
                column: "LessonId",
                principalTable: "Lessons",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Exams_Teachers_TeacherId",
                table: "Exams",
                column: "TeacherId",
                principalTable: "Teachers",
                principalColumn: "TeacherId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseContents_Courses_CourseId",
                table: "CourseContents");

            migrationBuilder.DropForeignKey(
                name: "FK_Exams_Admins_AdminId",
                table: "Exams");

            migrationBuilder.DropForeignKey(
                name: "FK_Exams_CourseContents_CourseContentId",
                table: "Exams");

            migrationBuilder.DropForeignKey(
                name: "FK_Exams_Lessons_LessonId",
                table: "Exams");

            migrationBuilder.DropForeignKey(
                name: "FK_Exams_Teachers_TeacherId",
                table: "Exams");

            migrationBuilder.DropIndex(
                name: "IX_Exams_CourseContentId",
                table: "Exams");

            migrationBuilder.DropIndex(
                name: "IX_Exams_LessonId",
                table: "Exams");

            migrationBuilder.DropIndex(
                name: "IX_Exams_TeacherId",
                table: "Exams");

            migrationBuilder.DropColumn(
                name: "CourseContentId",
                table: "Exams");

            migrationBuilder.DropColumn(
                name: "LessonId",
                table: "Exams");

            migrationBuilder.DropColumn(
                name: "TeacherId",
                table: "Exams");

            migrationBuilder.AlterColumn<string>(
                name: "AdminId",
                table: "Exams",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_CourseContents_Courses_CourseId",
                table: "CourseContents",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Exams_Admins_AdminId",
                table: "Exams",
                column: "AdminId",
                principalTable: "Admins",
                principalColumn: "AdminId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
