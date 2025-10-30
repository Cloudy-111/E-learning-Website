using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace project.Migrations
{
    /// <inheritdoc />
    public partial class FilterNewestforReview : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_CourseReviews_CourseId_StudentId",
                table: "CourseReviews");

            migrationBuilder.CreateIndex(
                name: "IX_CourseReviews_CourseId_StudentId",
                table: "CourseReviews",
                columns: new[] { "CourseId", "StudentId" },
                unique: true,
                filter: "[IsNewest] = 1");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_CourseReviews_CourseId_StudentId",
                table: "CourseReviews");

            migrationBuilder.CreateIndex(
                name: "IX_CourseReviews_CourseId_StudentId",
                table: "CourseReviews",
                columns: new[] { "CourseId", "StudentId" },
                unique: true);
        }
    }
}
