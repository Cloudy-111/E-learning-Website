using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace project.Migrations
{
    /// <inheritdoc />
    public partial class RemoveTeacherAndCategoryFromExam : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exams_Categories_CategoryId",
                table: "Exams");

            migrationBuilder.DropForeignKey(
                name: "FK_Exams_Teachers_TeacherId",
                table: "Exams");

            migrationBuilder.DropIndex(
                name: "IX_Exams_CategoryId",
                table: "Exams");

            migrationBuilder.DropIndex(
                name: "IX_Exams_TeacherId",
                table: "Exams");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Exams");

            migrationBuilder.DropColumn(
                name: "TeacherId",
                table: "Exams");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CategoryId",
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
                name: "IX_Exams_CategoryId",
                table: "Exams",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Exams_TeacherId",
                table: "Exams",
                column: "TeacherId");

            migrationBuilder.AddForeignKey(
                name: "FK_Exams_Categories_CategoryId",
                table: "Exams",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Exams_Teachers_TeacherId",
                table: "Exams",
                column: "TeacherId",
                principalTable: "Teachers",
                principalColumn: "TeacherId");
        }
    }
}
