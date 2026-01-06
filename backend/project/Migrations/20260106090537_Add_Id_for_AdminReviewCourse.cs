using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace project.Migrations
{
    /// <inheritdoc />
    public partial class Add_Id_for_AdminReviewCourse : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_AdminReviewCourses",
                table: "AdminReviewCourses");

            migrationBuilder.AddColumn<string>(
                name: "Id",
                table: "AdminReviewCourses",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AdminReviewCourses",
                table: "AdminReviewCourses",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_AdminReviewCourses_CourseId",
                table: "AdminReviewCourses",
                column: "CourseId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_AdminReviewCourses",
                table: "AdminReviewCourses");

            migrationBuilder.DropIndex(
                name: "IX_AdminReviewCourses_CourseId",
                table: "AdminReviewCourses");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "AdminReviewCourses");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AdminReviewCourses",
                table: "AdminReviewCourses",
                column: "CourseId");
        }
    }
}
