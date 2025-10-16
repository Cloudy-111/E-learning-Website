using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace project.Migrations
{
    /// <inheritdoc />
    public partial class RemoveAdminFromExam : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exams_Admins_AdminId",
                table: "Exams");

            migrationBuilder.DropIndex(
                name: "IX_Exams_AdminId",
                table: "Exams");

            migrationBuilder.DropColumn(
                name: "AdminId",
                table: "Exams");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AdminId",
                table: "Exams",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Exams_AdminId",
                table: "Exams",
                column: "AdminId");

            migrationBuilder.AddForeignKey(
                name: "FK_Exams_Admins_AdminId",
                table: "Exams",
                column: "AdminId",
                principalTable: "Admins",
                principalColumn: "AdminId");
        }
    }
}
