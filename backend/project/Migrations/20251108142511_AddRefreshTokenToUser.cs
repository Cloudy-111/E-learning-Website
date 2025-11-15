// using Microsoft.EntityFrameworkCore.Migrations;

// #nullable disable

// namespace project.Migrations
// {
//     /// <inheritdoc />
//     public partial class AddRefreshTokenToUser : Migration
//     {
//         /// <inheritdoc />
//         protected override void Up(MigrationBuilder migrationBuilder)
//         {
//             migrationBuilder.AddColumn<string>(
//                 name: "RefreshTokenHash",
//                 table: "AspNetUsers",
//                 type: "nvarchar(max)",
//                 nullable: true);

//             migrationBuilder.AddColumn<DateTime>(
//                 name: "RefreshTokenTimeExpire",
//                 table: "AspNetUsers",
//                 type: "datetime2",
//                 nullable: true);
//         }

//         /// <inheritdoc />
//         protected override void Down(MigrationBuilder migrationBuilder)
//         {

//         }
//     }
// }





using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace project.Migrations
{
    /// <inheritdoc />
    public partial class AddRefreshTokenToUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Thêm RefreshTokenHash nếu chưa có
            migrationBuilder.Sql(@"
IF COL_LENGTH('dbo.AspNetUsers', 'RefreshTokenHash') IS NULL
BEGIN
    ALTER TABLE [dbo].[AspNetUsers] ADD [RefreshTokenHash] nvarchar(max) NULL;
END
");

            // Thêm RefreshTokenTimeExpire nếu chưa có
            migrationBuilder.Sql(@"
IF COL_LENGTH('dbo.AspNetUsers', 'RefreshTokenTimeExpire') IS NULL
BEGIN
    ALTER TABLE [dbo].[AspNetUsers] ADD [RefreshTokenTimeExpire] datetime2 NULL;
END
");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Xoá cột nếu rollback migration

            migrationBuilder.Sql(@"
IF COL_LENGTH('dbo.AspNetUsers', 'RefreshTokenHash') IS NOT NULL
BEGIN
    ALTER TABLE [dbo].[AspNetUsers] DROP COLUMN [RefreshTokenHash];
END
");

            migrationBuilder.Sql(@"
IF COL_LENGTH('dbo.AspNetUsers', 'RefreshTokenTimeExpire') IS NOT NULL
BEGIN
    ALTER TABLE [dbo].[AspNetUsers] DROP COLUMN [RefreshTokenTimeExpire];
END
");
        }
    }
}
