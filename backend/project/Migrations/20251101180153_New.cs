using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace project.Migrations
{
    /// <inheritdoc />
    public partial class New : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Discussion_Discussion_ParentDiscussionId",
                table: "Discussion");

            migrationBuilder.DropForeignKey(
                name: "FK_Discussion_Students_StudentId",
                table: "Discussion");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Discussion",
                table: "Discussion");

            migrationBuilder.RenameTable(
                name: "Discussion",
                newName: "Discussions");

            migrationBuilder.RenameIndex(
                name: "IX_Discussion_TargetType_TargetTypeId",
                table: "Discussions",
                newName: "IX_Discussions_TargetType_TargetTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_Discussion_StudentId",
                table: "Discussions",
                newName: "IX_Discussions_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_Discussion_ParentDiscussionId",
                table: "Discussions",
                newName: "IX_Discussions_ParentDiscussionId");

            migrationBuilder.AddColumn<int>(
                name: "LikeCount",
                table: "ForumQuestions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Discussions",
                table: "Discussions",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Discussions_Discussions_ParentDiscussionId",
                table: "Discussions",
                column: "ParentDiscussionId",
                principalTable: "Discussions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Discussions_Students_StudentId",
                table: "Discussions",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "StudentId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Discussions_Discussions_ParentDiscussionId",
                table: "Discussions");

            migrationBuilder.DropForeignKey(
                name: "FK_Discussions_Students_StudentId",
                table: "Discussions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Discussions",
                table: "Discussions");

            migrationBuilder.DropColumn(
                name: "LikeCount",
                table: "ForumQuestions");

            migrationBuilder.RenameTable(
                name: "Discussions",
                newName: "Discussion");

            migrationBuilder.RenameIndex(
                name: "IX_Discussions_TargetType_TargetTypeId",
                table: "Discussion",
                newName: "IX_Discussion_TargetType_TargetTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_Discussions_StudentId",
                table: "Discussion",
                newName: "IX_Discussion_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_Discussions_ParentDiscussionId",
                table: "Discussion",
                newName: "IX_Discussion_ParentDiscussionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Discussion",
                table: "Discussion",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Discussion_Discussion_ParentDiscussionId",
                table: "Discussion",
                column: "ParentDiscussionId",
                principalTable: "Discussion",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Discussion_Students_StudentId",
                table: "Discussion",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "StudentId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
