using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace project.Migrations
{
    /// <inheritdoc />
    public partial class delete : Migration
    {
        /// <inheritdoc />
        // protected override void Up(MigrationBuilder migrationBuilder)
        // {
        //     migrationBuilder.AddColumn<DateTime>(
        //         name: "DeletedAt",
        //         table: "Posts",
        //         type: "datetime2",
        //         nullable: true);

        //     migrationBuilder.AddColumn<bool>(
        //         name: "IsDeleted",
        //         table: "Posts",
        //         type: "bit",
        //         nullable: false,
        //         defaultValue: false);

        //     migrationBuilder.AddColumn<DateTime>(
        //         name: "DeletedAt",
        //         table: "ForumQuestions",
        //         type: "datetime2",
        //         nullable: true);

        //     migrationBuilder.AddColumn<bool>(
        //         name: "IsDeleted",
        //         table: "ForumQuestions",
        //         type: "bit",
        //         nullable: false,
        //         defaultValue: false);
        // }
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Posts.DeletedAt
            migrationBuilder.Sql(@"
        IF COL_LENGTH('dbo.Posts', 'DeletedAt') IS NULL
        BEGIN
            ALTER TABLE [dbo].[Posts] ADD [DeletedAt] datetime2 NULL;
        END
        ");

            // Posts.IsDeleted
            migrationBuilder.Sql(@"
        IF COL_LENGTH('dbo.Posts', 'IsDeleted') IS NULL
        BEGIN
            ALTER TABLE [dbo].[Posts] ADD [IsDeleted] bit NOT NULL CONSTRAINT DF_Posts_IsDeleted DEFAULT(0);
        END
        ");

            // ForumQuestions.DeletedAt
            migrationBuilder.Sql(@"
        IF COL_LENGTH('dbo.ForumQuestions', 'DeletedAt') IS NULL
        BEGIN
            ALTER TABLE [dbo].[ForumQuestions] ADD [DeletedAt] datetime2 NULL;
        END
        ");

            // ForumQuestions.IsDeleted
            migrationBuilder.Sql(@"
        IF COL_LENGTH('dbo.ForumQuestions', 'IsDeleted') IS NULL
        BEGIN
            ALTER TABLE [dbo.ForumQuestions] ADD [IsDeleted] bit NOT NULL CONSTRAINT DF_ForumQuestions_IsDeleted DEFAULT(0);
        END
        ");
        }


        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeletedAt",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "DeletedAt",
                table: "ForumQuestions");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "ForumQuestions");
        }
    }
}
